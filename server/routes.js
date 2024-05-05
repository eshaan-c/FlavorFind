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

// // Route 2: GET /random
// const random = async function(req, res) {
//   // you can use a ternary operator to check the value of request query values
//   // which can be particularly useful for setting the default value of queries
//   // note if users do not provide a value for the query it will be undefined, which is falsey
//   const explicit = req.query.explicit === 'true' ? 1 : 0;

//   // Here is a complete example of how to query the database in JavaScript.
//   // Only a small change (unrelated to querying) is required for TASK 3 in this route.
//   connection.query(`
//     SELECT *
//     FROM Songs
//     WHERE explicit <= ${explicit}
//     ORDER BY RAND()
//     LIMIT 1
//   `, (err, data) => {
//     if (err || data.length === 0) {
//       // If there is an error for some reason, or if the query is empty (this should not be possible)
//       // print the error message and return an empty object instead
//       console.log(err);
//       // Be cognizant of the fact we return an empty object {}. For future routes, depending on the
//       // return type you may need to return an empty array [] instead.
//       res.json({});
//     } else {
//       // Here, we return results of the query as an object, keeping only relevant data
//       // being song_id and title which you will add. In this case, there is only one song
//       // so we just directly access the first element of the query results array (data)
//       // TODO (TASK 3): also return the song title in the response
//       res.json({
//         song_id: data[0].song_id,
//         title: data[0].title
//       });
//     }
//   });
// }

// /********************************
//  * BASIC SONG/ALBUM INFO ROUTES *
//  ********************************/

// // Route 3: GET /song/:song_id
// const song = async function(req, res) {
//   // TODO (TASK 4): implement a route that given a song_id, returns all information about the song
//   // Hint: unlike route 2, you can directly SELECT * and just return data[0]
//   // Most of the code is already written for you, you just need to fill in the query
//   const id = req.params.song_id;

//   connection.query(
//   'SELECT * FROM Songs WHERE song_id = ?', [id],
//   (err, data) => {
//     if (err || data.length === 0) {
//       console.log(err);
//       res.json({});
//     } else {
//       res.json(data[0]);
//     }
//     }
//   );
// }

// // Route 4: GET /album/:album_id
// const album = async function(req, res) {
//   const id = req.params.album_id;

//   connection.query(
//   'SELECT * FROM Albums WHERE album_id = ?', [id],
//   (err, data) => {
//     if (err || data.length === 0) {
//       console.log(err);
//       res.json({});
//     } else {
//       res.json(data[0]);
//     }
//     }
//   );
// }

// // Route 5: GET /albums
// const albums = async function(req, res) {
//   // TODO (TASK 6): implement a route that returns all albums ordered by release date (descending)
//   // Note that in this case you will need to return multiple albums, so you will need to return an array of objects
//   connection.query(`
//   SELECT * 
//   FROM Albums 
//   ORDER BY release_date DESC`,
//   (err, data) => {
//     if (err || data.length === 0) {
//       console.log(err);
//       res.json({});
//     } else {
//       res.json(data);
//     }
//     }
//   );
// }

// // Route 6: GET /album_songs/:album_id
// const album_songs = async function(req, res) {
//   // TODO (TASK 7): implement a route that given an album_id, returns all songs on that album ordered by track number (ascending)
//   const id = req.params.album_id;

//   connection.query(`
//   SELECT s.song_id, s.title, s.number, s.duration, s.plays FROM Songs s
//   JOIN Albums a
//   ON a.album_id = s.album_id
//   WHERE a.album_id = ?
//   ORDER BY s.number ASC`, [id],
//   (err, data) => {
//     if (err || data.length === 0) {
//       console.log(err);
//       res.json({});
//     } else {
//       res.json(data);
//     }
//     }
//   );
// }

// /************************
//  * ADVANCED INFO ROUTES *
//  ************************/

// // Route 7: GET /top_songs
// const top_songs = async function(req, res) {
//   const page = parseInt(req.query.page, 10);
//   const pageSize = parseInt(req.query.page_size, 10) || 10;
//   const offset = (page - 1) * pageSize;

//   if (!page) {
//     // TODO (TASK 9)): query the database and return all songs ordered by number of plays (descending)
//     // Hint: you will need to use a JOIN to get the album title as well
//     connection.query(`
//     SELECT s.song_id, s.title, s.album_id, a.title AS album, s.plays FROM Songs s
//     INNER JOIN Albums a
//     ON s.album_id = a.album_id
//     ORDER BY s.plays DESC`,
//     (err, data) => {
//       if (err || data.length === 0) {
//         console.log(err);
//         res.json({});
//       } else {
//         res.json(data);
//       }
//     });
//   } else {
//     // TODO (TASK 10): reimplement TASK 9 with pagination
//     // Hint: use LIMIT and OFFSET (see https://www.w3schools.com/php/php_mysql_select_limit.asp)

//     connection.query(`
//         SELECT s.song_id, s.title, s.album_id, a.title AS album, s.plays FROM Songs s
//         INNER JOIN Albums a
//         ON s.album_id = a.album_id
//         ORDER BY s.plays DESC
//         LIMIT ?
//         OFFSET ?`,
//         [pageSize, offset],
//         (err, data) => {
//           if (err || data.length === 0) {
//             console.log(err);
//             res.json({});
//           } else {
//             res.json(data);
//           }
//       });
    
//   }
// }

// // Route 8: GET /top_albums
// const top_albums = async function(req, res) {
//   // TODO (TASK 11): return the top albums ordered by aggregate number of plays of all songs on the album (descending), with optional pagination (as in route 7)
//   // Hint: you will need to use a JOIN and aggregation to get the total plays of songs in an album
//   const page = parseInt(req.query.page, 10);
//   const pageSize = parseInt(req.query.page_size, 10) || 10;
//   const offset = (page - 1) * pageSize;

//   if (!page) {
//     connection.query(`
//     SELECT a.album_id, a.title, SUM(s.plays) AS plays FROM Albums a
//     JOIN Songs s
//     ON a.album_id = s.album_id
//     GROUP BY a.album_id
//     ORDER BY plays DESC`,
//     (err, data) => {
//       if (err || data.length === 0) {
//         console.log(err);
//         res.json({});
//       } else {
//         res.json(data);
//       }
//     });
//   } else {
//     connection.query(`
//     SELECT a.album_id, a.title, SUM(s.plays) AS plays FROM Albums a
//     JOIN Songs s
//     ON a.album_id = s.album_id
//     GROUP BY a.album_id
//     ORDER BY plays DESC
//     LIMIT ?
//     OFFSET ?`,
//     [pageSize, offset],
//     (err, data) => {
//       if (err || data.length === 0) {
//         console.log(err);
//         res.json({});
//       } else {
//         res.json(data);
//       }
//     });
//   }
// }

// // Route 9: GET /search_albums
// const search_songs = async function(req, res) {
//   // TODO (TASK 12): return all songs that match the given search query with parameters defaulted to those specified in API spec ordered by title (ascending)
//   // Some default parameters have been provided for you, but you will need to fill in the rest
//   const title = req.query.title ?? '';
//   const durationLow = parseInt(req.query.duration_low, 10) || 60;
//   const durationHigh = parseInt(req.query.duration_high, 10) || 660;
//   const plays_low = parseInt(req.query.plays_low, 10) || 0;
//   const plays_high = parseInt(req.query.plays_high, 10) || 1100000000;
//   const danceability_low = parseFloat(req.query.danceability_low) || 0;
//   const danceability_high = parseFloat(req.query.danceability_high) || 1;
//   const energy_low = parseFloat(req.query.energy_low) || 0;
//   const energy_high = parseFloat(req.query.energy_high) || 1;
//   const valence_low = parseFloat(req.query.valence_low) || 0;
//   const valence_high = parseFloat(req.query.valence_high) || 1;
//   const explicit = req.query.explicit === 'true' ? 1 : 0;

//   connection.query(`
//     SELECT s.song_id, s.album_id, s.title, s.number, s.duration, s.plays, s.danceability, s.energy, s.valence, s.tempo, s.key_mode, s.explicit
//     FROM Songs s
//     WHERE s.title LIKE ?
//     AND s.duration BETWEEN ? AND ?
//     AND s.plays BETWEEN ? AND ?
//     AND s.danceability BETWEEN ? AND ?
//     AND s.energy BETWEEN ? AND ?
//     AND s.valence BETWEEN ? AND ?
//     AND (s.explicit <= ? OR s.explicit = ?)
//     ORDER BY s.title ASC`,
//     [`%${title}%`, durationLow, durationHigh, plays_low, plays_high, danceability_low, danceability_high, energy_low, energy_high, valence_low, valence_high, explicit, explicit],
//     (err, data) => {
//       if (err) {
//         console.log(err);
//         res.json({});
//       } else {
//         res.json(data);
//       }
//   });
// }

const find_restaurants = async function(req, res) {
  // given a city name, return nearby restaurants based on a distance function

  const cityName = req.params.city;

  connection.query(`
    SELECT DISTINCT r.name, r.rating, r.city, r.address, (
      3959 * ACOS(
          COS(RADIANS(c.lat)) * COS(RADIANS(r.lat)) *
          COS(RADIANS(r.lng) - RADIANS(c.lng)) +
          SIN(RADIANS(c.lat)) * SIN(RADIANS(r.lat))
      )
    ) AS distance
    FROM Restaurants r
    JOIN Cities c ON r.city = c.city
    WHERE c.city LIKE '%${cityName}%'
    ORDER BY distance ASC;`,
    (err, data) => {
      if (err) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
  });
}

const average_cuisine_rating = async function(req, res) {
  // given a type of cuisine, return the average rating of restaurants serving that cuisine

  const cuisineType = req.params.cuisine;

  connection.query(`
  SELECT AVG(rating) AS avg_rating
  FROM Restaurants
  WHERE category = ?`,
    [cuisineType],
    (err, data) => {
      if (err) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
  });
}


const closest_hotels = async function(req, res) {
  const cityName = req.params.city;

  connection.query(`
    SELECT DISTINCT h.name, h.rating, h.city, h.description, (
      3959 * ACOS(
          COS(RADIANS(c.lat)) * COS(RADIANS(h.lat)) *
          COS(RADIANS(h.lng) - RADIANS(c.lng)) +
          SIN(RADIANS(c.lat)) * SIN(RADIANS(h.lat))
      )
    ) AS distance
    FROM Hotels h
    JOIN Cities c ON c.city LIKE '%${cityName}%' AND h.city LIKE '%${cityName}%'
    WHERE ABS(h.lat - c.lat) <= 0.1 AND ABS(h.lng - c.lng) <= 0.1
    ORDER BY distance ASC;
  `,
  (err, data) => {
    if (err) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  });
}

//Query 4: Find number of restaurants in a city

const num_restaurants = async function(req, res) {
    const city = req.params.city;
    connection.query(`
      SELECT c.id, c.city, c.zips, COUNT(r.id) AS num_restaurants
      FROM Cities c
      LEFT JOIN Restaurants r ON c.city = r.city
      WHERE c.city = ?
      AND FIND_IN_SET(REGEXP_SUBSTR(r.address, '[0-9]{5}'), REPLACE(c.zips, ' ', ',')) > 0
      GROUP BY c.id
      ORDER BY num_restaurants DESC`, [city],
      (err, data) => {
        if (err) {
          console.log(err);
          res.json({});
        } else {
          res.json(data[0]);
        }
    });
}

//Query 5: Find restaurants in a city that are above a specified rating threshold and in a specific category

const find_filtered_restaurants = async function(req, res) {
    const city = req.params.city;
    const category = req.params.category;
    const rating = parseFloat(req.params.rating);

    connection.query(`
      SELECT DISTINCT name, rating, category, address
      FROM Restaurants
      WHERE rating >= ? AND category LIKE ? AND city = ?
      ORDER BY rating DESC`, [rating, '%' + category + '%', city],
      (err, data) => {
        if (err) {
          console.log(err);
          res.json({});
        } else {
          res.json(data);
        }
    });
}

//Query 7: Find the top restaurant in each city

const top_restaurants = async function(req, res) {
    connection.query(`
    SELECT
    city_id,
    restaurant_id,
    city_name,
    address,
    restaurant_name,
    rating
    FROM (
        SELECT
            c.id AS city_id,
            r.id AS restaurant_id,
            c.city AS city_name,
            r.address AS address,
            r.name AS restaurant_name,
            r.rating,
            ROW_NUMBER() OVER (PARTITION BY c.city ORDER BY r.rating DESC) AS row_num
        FROM
            Restaurants r
        JOIN
            Cities c ON r.city = c.city
        WHERE
            FIND_IN_SET(REGEXP_SUBSTR(r.address, '[0-9]{5}'), REPLACE(c.zips, ' ', ',')) > 0
    ) ranked_restaurants
    WHERE
        row_num = 1
    ORDER BY city_id
    LIMIT 10`,
      (err, data) => {
        if (err) {
          console.log(err);
          res.json({});
        } else {
          res.json(data);
        }
    });
  }

   //Query 8: Find the top hotels in each city
 const top_hotels = async function(req, res) {
  connection.query(`
  SELECT city_id, hotel_id, city_name, address, hotel_name, rating
  FROM (
      SELECT c.id AS city_id, c.city AS city_name, h.id AS hotel_id, h.address AS address, h.name AS hotel_name, h.rating,
          ROW_NUMBER() OVER (PARTITION BY c.city ORDER BY h.rating DESC) AS row_num
      FROM Hotels h JOIN Cities c ON h.city_name = c.city
      WHERE FIND_IN_SET(REGEXP_SUBSTR(h.address, '[0-9]{5}'), REPLACE(c.zips, ' ', ',')) > 0
  ) ranked_hotels
  WHERE row_num = 1
  ORDER BY city_id
  LIMIT 10;
  `,
    (err, data) => {
      if (err) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
  });
}

  // Route: GET /restaurant/:id
  const get_rest_info = async function(req, res) {
    const restaurant_id = req.params.restaurant_id;
    connection.query(
      'SELECT * FROM Restaurants WHERE id = ?',
      [restaurant_id],
      (err, data) => {
        if (err || data.length === 0) {
          console.log(err);
          res.json({});
        } else {
          res.json(data[0]);
        }
      }
    );
  };

  // Route: GET /restaurant/:id
  const get_hotel_info = async function(req, res) {
    const hotel_id = req.params.hotel_id;
    connection.query(
      'SELECT * FROM Hotels WHERE id = ?',
      [hotel_id],
      (err, data) => {
        if (err || data.length === 0) {
          console.log(err);
          res.json({});
        } else {
          res.json(data[0]);
        }
      }
    );
  };

  // Route: GET /random
  const random = async function(req, res) {
    connection.query(`
    SELECT r.name AS name, r.rating AS rating, r.address AS address, r.id AS id
    FROM Restaurants r
    WHERE r.rating > 4.75
    ORDER BY RAND()
    LIMIT 1;
    `, (err, data) => {
        if (err) {
          console.log(err);
          res.json({});
        } else {
          res.json(data[0]);
        }
    });
  }


module.exports = {
  // author,
  // random,
  // song,
  // album,
  // albums,
  // album_songs,
  // top_songs,
  // top_albums,
  // search_songs,
  find_restaurants,
  average_cuisine_rating,
  closest_hotels,
  num_restaurants,
  find_filtered_restaurants,
  top_restaurants,
  get_rest_info,
  get_hotel_info,
  top_hotels,
  random
}