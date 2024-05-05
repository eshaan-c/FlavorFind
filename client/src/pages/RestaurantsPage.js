import { useEffect, useState } from 'react';
import { Box, Container, CircularProgress  } from '@mui/material';
import { NavLink } from 'react-router-dom';

const config = require('../config.json');

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/top_restaurants`)
      .then(res => res.json())
      .then(resJson => setRestaurants(resJson))
      .then(() => setLoading(false));
  }, []);


  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  // These formatting options leverage flexboxes, an incredibly powerful tool for formatting dynamic layouts.
  // You can learn more on MDN web docs linked below (or many other online resources)
  // https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox
  const format1 = {};
  const format2 = { display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' };
  const format3 = { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' };
  const format4 = { display: 'grid', justifyContent: 'space-evenly' };

  const cities = [
    { name: 'Los Angeles', id: 1},
    { name: 'Chicago', id: 2 },
    { name: 'Miami', id: 3 },
    { name: 'Dallas', id: 4 },
    { name: 'Philadelphia', id: 5},
    { name: 'Houston', id: 6 },
    { name: 'Atlanta', id: 7},
    { name: 'Washington', id: 8},
    { name: 'Boston', id: 9 },
    { name: 'Phoenix', id: 10}
  ];

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ width: '80%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', marginBottom: '15px' }}>
          <div>
            <h2 style={{ margin: '0', fontSize: '35px' }}>Top restaurants in popular cities:</h2>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {cities.map((city, index) => (
                <NavLink key={index} to={`/toprestaurants/${city.id}`} style={{ fontSize: '16px' }}>{city.name}</NavLink>
              ))}
            </div>
          </div>
          <NavLink to="/analyzer" style={{ fontSize: '24px' }}>City Restaurant Analyzer</NavLink>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {restaurants.map((restaurant) =>
            <div
              key={restaurant.id}
              style={{
                width: '45%',
                padding: '10px',
                margin: '10px 2.5%',
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
      </div>
      <h2 style={{ fontWeight: 'normal', fontSize: '1em', color: 'gray' }}>Developed by Eshaan Chichula, Shruthi Kunjur, Marc Vaz </h2>
    </>
  );
}