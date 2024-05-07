const express = require('express');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');

const app = express();
app.use(cors({
  origin: '*',
}));


app.get('/num_restaurants/:zip', routes.num_restaurants);
app.get('/find_filtered_restaurants/:city/:category/:rating', routes.find_filtered_restaurants);
app.get('/top_restaurants', routes.top_restaurants);
app.get('/top_hotels', routes.top_hotels);
app.get('/get_rest_info/:restaurant_id', routes.get_rest_info);
app.get('/get_hotel_info/:hotel_id', routes.get_hotel_info);
app.get('/random', routes.random);
app.get('/top_restaurants_city/:city_id', routes.top_restaurants_city);
app.get('/find_filtered_hotels/:city/:rating', routes.find_filtered_hotels);
app.get('/top_cuisines/:zip', routes.top_cuisines);

app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
});

module.exports = app;
