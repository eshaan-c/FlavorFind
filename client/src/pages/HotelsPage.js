import { useEffect, useState } from 'react';
import { Box, Container, CircularProgress  } from '@mui/material';
import { NavLink } from 'react-router-dom';

const config = require('../config.json');

export default function HotelsPage() {
  const [hotels, setHotels] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const cachedData = localStorage.getItem('top_hotels');

  if (cachedData) {
    setHotels(JSON.parse(cachedData));
    setLoading(false);
  } else {
    fetch(`http://${config.server_host}:${config.server_port}/top_hotels`)
      .then(res => res.json())
      .then(resJson => {
        setHotels(resJson);
        localStorage.setItem('top_hotels', JSON.stringify(resJson));
        setLoading(false);
      });
  }
}, []);


  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }


  const format1 = {};
  const format2 = { display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' };
  const format3 = { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' };
  const format4 = { display: 'grid', justifyContent: 'space-evenly' };

  return (
  <>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
      <h2 style={{ width: '80%', margin: '0 auto', marginTop: '30px', marginBottom: '15px', fontSize: '35px', textAlign: 'center' }}>Top hotels in popular cities:</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {hotels.map((hotel) =>
          <div
            key={hotel.hotel_id}
            style={{
              width: '45%',
              padding: '10px',
              margin: '10px 2.5%',
              border: '1px solid #000',
              borderRadius: '5px',
              background: '#c3d4e2'
            }}
          >
          <NavLink to={`/hotels/${hotel.hotel_id}`}>
            <h4>{hotel.city_name} - {hotel.hotel_name}</h4>
          </NavLink>
          <p>{hotel.address.split(/(?=[A-Z])/).join(' ')}</p>
          <p>Rating: {hotel.rating} / 5</p>
        </div>
      )}
    </div>
    </div>
    <h2 style={{ fontWeight: 'normal', fontSize: '1em', color: 'gray' }}>Developed by Eshaan Chichula, Shruthi Kunjur, Marc Vaz </h2>
  </>
);
}