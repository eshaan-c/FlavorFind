const express = require('express');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');

const app = express();
app.use(cors({
  origin: '*',
}));

// We use express to define our various API endpoints and
// provide their handlers that we implemented in routes.js
// app.get('/random', routes.random);
// app.get('/song/:song_id', routes.song);
// app.get('/album/:album_id', routes.album);
// app.get('/albums', routes.albums);
// app.get('/album_songs/:album_id', routes.album_songs);
// app.get('/top_songs', routes.top_songs);
// app.get('/top_albums', routes.top_albums);
// app.get('/search_songs', routes.search_songs);
app.get('/find_restaurants/:cityName', routes.find_restaurants);
app.get('/cuisine_rating/:cuisine', routes.average_cuisine_rating);
app.get('/closest_hotels/:city', routes.closest_hotels);
app.get('/num_restaurants/:city', routes.num_restaurants);
app.get('/find_filtered_restaurants/:city/:category/:rating', routes.find_filtered_restaurants);
app.get('/top_restaurants', routes.top_restaurants);

app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
});

module.exports = app;
