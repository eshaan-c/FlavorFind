import { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import { NavLink } from 'react-router-dom';

const config = require('../config.json');

export default function AlbumsPage() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/top_restaurants`)
      .then(res => res.json())
      .then(resJson => setAlbums(resJson));
  }, []);

  // These formatting options leverage flexboxes, an incredibly powerful tool for formatting dynamic layouts.
  // You can learn more on MDN web docs linked below (or many other online resources)
  // https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox
  const format1 = {};
  const format2 = { display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' };
  const format3 = { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' };
  const format4 = { display: 'grid', justifyContent: 'space-evenly' };

  return (
    <>
      <h2>Top restaurants below</h2>
      <Container style={format3}>
        {albums.map((restaurant) =>
          <Box
            key={restaurant.id}
            p={3}
            m={2}
            style={{ background: '#c5cae9', borderRadius: '16px', border: '2px solid #000' }}
          >
            <h4>{restaurant.restaurant_name}</h4>
            <p>{restaurant.address}</p>
            <p>Rating: {restaurant.rating} / 5</p>
          </Box>
        )}
      </Container>
    </>
  );
}