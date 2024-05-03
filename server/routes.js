const mysql = require('mysql')
const config = require('./config.json')

// Creates MySQL connection using database credential provided in config.json
// Do not edit. If the connection fails, make sure to check that config.json is filled out correctly
const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db
});
connection.connect((err) => err && console.log(err));

/******************
 * WARM UP ROUTES *
 ******************/

// Route 1: GET /author/:type
const author = async function(req, res) {
  // TODO (TASK 1): replace the values of name and pennkey with your own
  const name = 'Eshaan Chichula';
  const pennkey = 'eshaan';

  // checks the value of type in the request parameters
  // note that parameters are required and are specified in server.js in the endpoint by a colon (e.g. /author/:type)
  if (req.params.type === 'name') {
    // res.send returns data back to the requester via an HTTP response
    res.send("Created By " + name);
    // res.json({ name: name });
  } else if (req.params.type === 'pennkey') {
    res.send("Created By " + pennkey);
    // res.json({ pennkey: pennkey});
  } else {
    res.status(400).json({});
  }
}

// Route 2: GET /random
const random = async function(req, res) {
  // you can use a ternary operator to check the value of request query values
  // which can be particularly useful for setting the default value of queries
  // note if users do not provide a value for the query it will be undefined, which is falsey
  const explicit = req.query.explicit === 'true' ? 1 : 0;

  // Here is a complete example of how to query the database in JavaScript.
  // Only a small change (unrelated to querying) is required for TASK 3 in this route.
  connection.query(`
    SELECT *
    FROM Songs
    WHERE explicit <= ${explicit}
    ORDER BY RAND()
    LIMIT 1
  `, (err, data) => {
    if (err || data.length === 0) {
      // If there is an error for some reason, or if the query is empty (this should not be possible)
      // print the error message and return an empty object instead
      console.log(err);
      // Be cognizant of the fact we return an empty object {}. For future routes, depending on the
      // return type you may need to return an empty array [] instead.
      res.json({});
    } else {
      // Here, we return results of the query as an object, keeping only relevant data
      // being song_id and title which you will add. In this case, there is only one song
      // so we just directly access the first element of the query results array (data)
      // TODO (TASK 3): also return the song title in the response
      res.json({
        song_id: data[0].song_id,
        title: data[0].title
      });
    }
  });
}

/********************************
 * BASIC SONG/ALBUM INFO ROUTES *
 ********************************/

// Route 3: GET /song/:song_id
const song = async function(req, res) {
  // TODO (TASK 4): implement a route that given a song_id, returns all information about the song
  // Hint: unlike route 2, you can directly SELECT * and just return data[0]
  // Most of the code is already written for you, you just need to fill in the query
  const id = req.params.song_id;

  connection.query(
  'SELECT * FROM Songs WHERE song_id = ?', [id],
  (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data[0]);
    }
    }
  );
}

// Route 4: GET /album/:album_id
const album = async function(req, res) {
  const id = req.params.album_id;

  connection.query(
  'SELECT * FROM Albums WHERE album_id = ?', [id],
  (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data[0]);
    }
    }
  );
}

// Route 5: GET /albums
const albums = async function(req, res) {
  // TODO (TASK 6): implement a route that returns all albums ordered by release date (descending)
  // Note that in this case you will need to return multiple albums, so you will need to return an array of objects
  connection.query(`
  SELECT * 
  FROM Albums 
  ORDER BY release_date DESC`,
  (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
    }
  );
}

// Route 6: GET /album_songs/:album_id
const album_songs = async function(req, res) {
  // TODO (TASK 7): implement a route that given an album_id, returns all songs on that album ordered by track number (ascending)
  const id = req.params.album_id;

  connection.query(`
  SELECT s.song_id, s.title, s.number, s.duration, s.plays FROM Songs s
  JOIN Albums a
  ON a.album_id = s.album_id
  WHERE a.album_id = ?
  ORDER BY s.number ASC`, [id],
  (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
    }
  );
}

/************************
 * ADVANCED INFO ROUTES *
 ************************/

// Route 7: GET /top_songs
const top_songs = async function(req, res) {
  const page = parseInt(req.query.page, 10);
  const pageSize = parseInt(req.query.page_size, 10) || 10;
  const offset = (page - 1) * pageSize;

  if (!page) {
    // TODO (TASK 9)): query the database and return all songs ordered by number of plays (descending)
    // Hint: you will need to use a JOIN to get the album title as well
    connection.query(`
    SELECT s.song_id, s.title, s.album_id, a.title AS album, s.plays FROM Songs s
    INNER JOIN Albums a
    ON s.album_id = a.album_id
    ORDER BY s.plays DESC`,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    });
  } else {
    // TODO (TASK 10): reimplement TASK 9 with pagination
    // Hint: use LIMIT and OFFSET (see https://www.w3schools.com/php/php_mysql_select_limit.asp)

    connection.query(`
        SELECT s.song_id, s.title, s.album_id, a.title AS album, s.plays FROM Songs s
        INNER JOIN Albums a
        ON s.album_id = a.album_id
        ORDER BY s.plays DESC
        LIMIT ?
        OFFSET ?`,
        [pageSize, offset],
        (err, data) => {
          if (err || data.length === 0) {
            console.log(err);
            res.json({});
          } else {
            res.json(data);
          }
      });
    
  }
}

// Route 8: GET /top_albums
const top_albums = async function(req, res) {
  // TODO (TASK 11): return the top albums ordered by aggregate number of plays of all songs on the album (descending), with optional pagination (as in route 7)
  // Hint: you will need to use a JOIN and aggregation to get the total plays of songs in an album
  const page = parseInt(req.query.page, 10);
  const pageSize = parseInt(req.query.page_size, 10) || 10;
  const offset = (page - 1) * pageSize;

  if (!page) {
    connection.query(`
    SELECT a.album_id, a.title, SUM(s.plays) AS plays FROM Albums a
    JOIN Songs s
    ON a.album_id = s.album_id
    GROUP BY a.album_id
    ORDER BY plays DESC`,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    });
  } else {
    connection.query(`
    SELECT a.album_id, a.title, SUM(s.plays) AS plays FROM Albums a
    JOIN Songs s
    ON a.album_id = s.album_id
    GROUP BY a.album_id
    ORDER BY plays DESC
    LIMIT ?
    OFFSET ?`,
    [pageSize, offset],
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    });
  }
}

// Route 9: GET /search_albums
const search_songs = async function(req, res) {
  // TODO (TASK 12): return all songs that match the given search query with parameters defaulted to those specified in API spec ordered by title (ascending)
  // Some default parameters have been provided for you, but you will need to fill in the rest
  const title = req.query.title ?? '';
  const durationLow = parseInt(req.query.duration_low, 10) || 60;
  const durationHigh = parseInt(req.query.duration_high, 10) || 660;
  const plays_low = parseInt(req.query.plays_low, 10) || 0;
  const plays_high = parseInt(req.query.plays_high, 10) || 1100000000;
  const danceability_low = parseFloat(req.query.danceability_low) || 0;
  const danceability_high = parseFloat(req.query.danceability_high) || 1;
  const energy_low = parseFloat(req.query.energy_low) || 0;
  const energy_high = parseFloat(req.query.energy_high) || 1;
  const valence_low = parseFloat(req.query.valence_low) || 0;
  const valence_high = parseFloat(req.query.valence_high) || 1;
  const explicit = req.query.explicit === 'true' ? 1 : 0;

  connection.query(`
    SELECT s.song_id, s.album_id, s.title, s.number, s.duration, s.plays, s.danceability, s.energy, s.valence, s.tempo, s.key_mode, s.explicit
    FROM Songs s
    WHERE s.title LIKE ?
    AND s.duration BETWEEN ? AND ?
    AND s.plays BETWEEN ? AND ?
    AND s.danceability BETWEEN ? AND ?
    AND s.energy BETWEEN ? AND ?
    AND s.valence BETWEEN ? AND ?
    AND (s.explicit <= ? OR s.explicit = ?)
    ORDER BY s.title ASC`,
    [`%${title}%`, durationLow, durationHigh, plays_low, plays_high, danceability_low, danceability_high, energy_low, energy_high, valence_low, valence_high, explicit, explicit],
    (err, data) => {
      if (err) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
  });
}

module.exports = {
  author,
  random,
  song,
  album,
  albums,
  album_songs,
  top_songs,
  top_albums,
  search_songs,
}
