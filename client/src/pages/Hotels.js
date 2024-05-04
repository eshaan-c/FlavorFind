import { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import { NavLink } from 'react-router-dom';

const config = require('../config.json');

export default function Hotels() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/hotels`)
      .then(res => res.json())
      .then(resJson => setHotels(resJson));
  }, []);

  // These formatting options leverage flexboxes, an incredibly powerful tool for formatting dynamic layouts.
  // You can learn more on MDN web docs linked below (or many other online resources)
  // https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox
  const format1 = {};
  const format2 = { display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' };
  const format3 = { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' };
  const format4 = { display: 'grid', justifyContent: 'space-evenly' };

  return (
    // TODO (TASK 22): Try out the different provided formatting options by replacing “format1”  in the Container's style property with the other provided options.
    // TODO (TASK 22): Choose the one that displays all the albums in a fluid grid.
    <Container style={format3}>
      {hotels.map((hotel) =>
        <Box
          key={hotel.hotel_id}
          p={3}
          m={2}
          style={{ background: '#c5cae9', borderRadius: '16px', border: '2px solid #000' }}
        >
          <img
            key={hotel.hotel_id}
            src={hotel.thumbnail_url}
            alt={`${hotel.title} hotel art`}
          />
          <h4><NavLink to={`/hotels/${hotel.hotel_id}`}>{hotel.title}</NavLink></h4>
        </Box>
      )}
    </Container>
  );
}