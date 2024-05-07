import { useEffect, useState } from 'react';
import { CircularProgress, Button  } from '@mui/material';
import { NavLink } from 'react-router-dom';

const config = require('../config.json');

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedRestaurants = localStorage.getItem('restaurants');
    if (storedRestaurants) {
      setRestaurants(JSON.parse(storedRestaurants));
      setLoading(false);
    } else {
      fetch(`http://${config.server_host}:${config.server_port}/top_restaurants`)
        .then(res => res.json())
        .then(resJson => {
          setRestaurants(resJson);
          localStorage.setItem('restaurants', JSON.stringify(resJson)); // Store restaurants data in localStorage
        })
        .then(() => setLoading(false));
    }
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  const format3 = { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' };

  //Cities list for popular ones
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
      {/* Top restaurants section */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ width: '80%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', marginBottom: '15px' }}>
          <div>
            {/* Heading */}
            <h2 style={{ margin: '0', fontSize: '35px' }}>Top restaurants in popular cities:</h2>
            {/* Cities list */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {cities.map((city, index) => (
                <NavLink key={index} to={`/toprestaurants/${city.id}`} style={{ fontSize: '16px' }}>{city.name}</NavLink>
              ))}
            </div>
          </div>
          {/* Button */}
          <Button variant="contained" style={{ backgroundColor: 'salmon' }}>
            {/* Link to City Restaurant Analyzer */}
            <NavLink to="/analyzer" style={{ fontSize: '20px', color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>City Restaurant Analyzer</NavLink>
          </Button>
        </div>
        {/* Restaurant cards */}
        <div style={format3}>
          {restaurants.map((restaurant) =>
            <div
              key={restaurant.id}
              style={{
                width: '45%',
                padding: '10px',
                margin: '10px 2.5%',
                border: '1px solid #000',
                borderRadius: '5px',
                background: '#e2c3c3',
                display: 'flex',
                justifyContent: 'space-between', // Align items horizontally
                alignItems: 'center' // Center vertically
              }}
            >
              <div style={{ fontFamily: 'Georgia, serif' }}>
                {/* Link to individual restaurant */}
                <NavLink
                  to={`/restaurants/${restaurant.restaurant_id}`}
                  style={{ textDecoration: 'none', color: '#000', transition: 'transform 0.3s' }}
                  onMouseEnter={(e) => { e.target.style.textDecoration = 'underline'; e.target.style.transform = 'scale(1.1)'; }}
                  onMouseLeave={(e) => { e.target.style.textDecoration = 'none'; e.target.style.transform = 'scale(1)'; }}
                >
                  <h4 style={{ textAlign: 'center' }}>{restaurant.restaurant_name}</h4>
                </NavLink>
                <p style={{ margin: '0' }}>{restaurant.city_name}</p>
                <p style={{ margin: '0' }}>{restaurant.address}</p>
                <p style={{ margin: '0' }}>Rating: {restaurant.rating} / 5</p>
              </div>
              <img src={restaurant.images} alt={restaurant.restaurant_name} style={{ marginLeft: '10px', height: '100px', width: '100px', borderRadius: '10px' }} />
            </div>
          )}
        </div>
      </div>
      {/* Footer */}
      <h2 style={{ fontWeight: 'normal', fontSize: '1em', color: 'gray' }}>Developed by Eshaan Chichula, Shruthi Kunjur, Marc Vaz </h2>
    </>
  );
}