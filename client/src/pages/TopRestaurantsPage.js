import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const config = require('../config.json');

export default function TopRestaurantsPage() {
  // Get the city_id from the URL parameters
  const { city_id } = useParams();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the top restaurants in the city when the component mounts or city_id changes
  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/top_restaurants_city/${city_id}`)
      .then(res => res.json())
      .then(resJson => setRestaurants(resJson))
      .then(() => setLoading(false));
  }, [city_id]);


  // Show a loading spinner while the data is being fetched
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  const format = { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' };

  // Define a list of cities
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
            <h2 style={{ margin: '0', fontSize: '35px' }}>Top restaurants in {restaurants[0].city}:</h2>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {/* Map over the cities and create a NavLink for each one */}
              {cities.map((city, index) => (
                <NavLink key={index} to={`/toprestaurants/${city.id}`} style={{ fontSize: '16px' }}>{city.name}</NavLink>
              ))}
            </div>
          </div>
          <Button variant="contained" style={{ backgroundColor: 'salmon' }}>
            <NavLink to="/analyzer" style={{ fontSize: '20px', color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>City Restaurant Analyzer</NavLink>
          </Button>
        </div>
        <div style={format}>
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
                <NavLink
                  to={`/restaurants/${restaurant.id}`}
                  style={{ textDecoration: 'none', color: '#000', transition: 'transform 0.3s' }}
                  onMouseEnter={(e) => { e.target.style.textDecoration = 'underline'; e.target.style.transform = 'scale(1.1)'; }}
                  onMouseLeave={(e) => { e.target.style.textDecoration = 'none'; e.target.style.transform = 'scale(1)'; }}
                >
                  <h4 style={{ textAlign: 'center' }}>{restaurant.name}</h4>
                </NavLink>
                {/* <p style={{ margin: '0' }}>{restaurant.city}</p> */}
                <p style={{ margin: '0' }}>{restaurant.address}</p>
                <p style={{ margin: '0' }}>Rating: {restaurant.rating} / 5</p>
              </div>
              <img src={restaurant.images} alt={restaurant.restaurant_name} style={{ marginLeft: '10px', height: '100px', width: '100px', borderRadius: '10px' }} />
            </div>
          )}
        </div>
      </div>
      <h2 style={{ fontWeight: 'normal', fontSize: '1em', color: 'gray' }}>Developed by Eshaan Chichula, Shruthi Kunjur, Marc Vaz </h2>
    </>
  );
}