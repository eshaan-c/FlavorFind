import { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import { NavLink } from 'react-router-dom';

const config = require('../config.json');

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/top_restaurants`)
      .then(res => res.json())
      .then(resJson => setRestaurants(resJson));
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
      <h2 style={{ width: '80%', margin: '0 auto', marginTop: '40px' }}>Top restaurants in popular cities:</h2>
      {restaurants.map((restaurant) =>
        <div
          key={restaurant.id}
          style={{
            width: '80%',
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #000',
            borderRadius: '5px',
            background: '#e2c3c3'
          }}
        >
          <NavLink to={`/restaurants/${restaurant.restaurant_id}`}>
            <h4>{restaurant.city_name} - {restaurant.restaurant_name}</h4>
          </NavLink>
          <p>{restaurant.address}</p>
          <p>Rating: {restaurant.rating} / 5</p>
        </div>
      )}
    </div>
    <h2 style={{ fontWeight: 'normal', fontSize: '1em', color: 'gray' }}>Developed by Eshaan Chichula, Shruthi Kunjur, Marc Vaz </h2>
  </>
);
}