const mysql = require('mysql')
const config = require('./config.json')

const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db
});
connection.connect((err) => err && console.log(err));

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
    FROM Restaurants2 r
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
  FROM Restaurants2
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
    const zip = req.params.zip;
    connection.query(`
    WITH CityFromZip AS (
      SELECT city, zips
      FROM Cities
      WHERE FIND_IN_SET(?, REPLACE(zips, ' ', ',')) > 0
      )
      SELECT c.city, COUNT(*) AS num_restaurants
      FROM Restaurants r
      JOIN CityFromZip c ON r.city = c.city
      WHERE FIND_IN_SET(REGEXP_SUBSTR(r.address, '[0-9]{5}'), REPLACE(c.zips, ' ', ',')) > 0
      GROUP BY c.city;`, [zip],
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
      SELECT MIN(id) AS id, name, rating, category, address
      FROM Restaurants2
      WHERE rating >= ? AND category LIKE ? AND city LIKE ?
      GROUP BY name, rating, category, address
      ORDER BY rating DESC`, [rating, '%' + category + '%',  city],
      (err, data) => {
      if (err) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    });
}

//Query 6: Find hotels in a city that are above a specified rating threshold

const find_filtered_hotels = async function(req, res) {
  const city = req.params.city;
  const rating = parseFloat(req.params.rating);

  connection.query(`
    SELECT MIN(id) AS id, name, rating, address
    FROM Hotels
    WHERE rating >= ? AND city_name LIKE ?
    GROUP BY name, rating, address
    ORDER BY rating DESC`, [rating, city],
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
    rating,
    images
    FROM (
        SELECT
            c.id AS city_id,
            r.id AS restaurant_id,
            c.city AS city_name,
            r.address AS address,
            r.name AS restaurant_name,
            r.rating,
            r.images,
            ROW_NUMBER() OVER (PARTITION BY c.city ORDER BY r.rating DESC) AS row_num
        FROM
            Restaurants2 r
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
  LIMIT 20;
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
      'SELECT * FROM Restaurants2 WHERE id = ?',
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
    FROM Restaurants2 r
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

  //Route: GET /toprestaurants/:city_id

  const top_restaurants_city = async function(req, res) {
      const city_id = req.params.city_id;
      connection.query(`
      SELECT c.city, r.name, r.address, r.rating, MIN(r.id) AS id, r.images, c.id AS city_id
      FROM Restaurants2 r JOIN Cities c ON r.city = c.city
      WHERE FIND_IN_SET(REGEXP_SUBSTR(r.address, '[0-9]{5}'), REPLACE(c.zips, ' ', ',')) > 0 AND c.id = ?
      GROUP BY c.city, r.name, r.address, r.rating, r.images
      ORDER BY r.rating DESC
      LIMIT 10;`, [city_id],
      (err, data) => {
        if (err) {
          console.log(err);
          res.json({});
        } else {
          res.json(data);
        }
      });
  }

  //Route: GET /topcuisines/:zip

  const top_cuisines = async function(req, res) {
    const zip = req.params.zip;
    connection.query(`
    WITH CityFromZip AS (
      SELECT city, zips
      FROM Cities
      WHERE FIND_IN_SET(?, REPLACE(zips, ' ', ',')) > 0
      ),
      TopCategories AS (
          SELECT category,
                AVG(rating) AS average_rating
          FROM Restaurants r
          JOIN CityFromZip c ON r.city = c.city
          WHERE FIND_IN_SET(REGEXP_SUBSTR(r.address, '[0-9]{5}'), REPLACE(c.zips, ' ', ',')) > 0
          GROUP BY category
          ORDER BY average_rating DESC
          LIMIT 5
      )
      SELECT * FROM TopCategories;`, [zip],
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
  find_restaurants,
  average_cuisine_rating,
  closest_hotels,
  num_restaurants,
  find_filtered_restaurants,
  top_restaurants,
  get_rest_info,
  get_hotel_info,
  top_hotels,
  random,
  top_restaurants_city,
  find_filtered_hotels,
  top_cuisines
}