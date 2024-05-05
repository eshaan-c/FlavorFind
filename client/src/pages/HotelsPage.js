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
      <div style={{ width: '80%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', marginBottom: '15px' }}>
        <div>
          <h2 style={{ margin: '0', fontSize: '35px' }}>Top hotels in popular cities:</h2>
          
        </div>
      </div>
      <div style={format3}>
        {hotels.map((hotel) =>
          <div
  key={hotel.id}
  style={{
    width: '20%',
    padding: '5px',
    margin: '5px 2.5%',
    border: '1px solid #000',
    borderRadius: '5px',
    background: '#c3d4e2',
    display: 'flex',
    justifyContent: 'space-between', // Align items horizontally
    alignItems: 'center' // Center vertically
  }}
>
  <div style={{ fontFamily: 'Georgia, serif' }}>
  <NavLink 
  to={`/hotels/${hotel.hotel_id}`} 
  style={{ textDecoration: 'none', color: '#000', transition: 'transform 0.3s' }}
  onMouseEnter={(e) => { e.target.style.textDecoration = 'underline'; e.target.style.transform = 'scale(1.1)'; }}
  onMouseLeave={(e) => { e.target.style.textDecoration = 'none'; e.target.style.transform = 'scale(1)'; }}
>
  <h4 style={{ textAlign: 'center' }}>{hotel.hotel_name}</h4>
</NavLink>


    <NavLink to={`/toprestaurants/${hotel.city_id}`} style={{ textDecoration: 'underline', color: '#1403fb' }}>
  <p style={{ margin: '0' }}>{hotel.city_name}</p>
</NavLink>
    <p style={{ margin: '0' }}>{hotel.address.split(/(?=[A-Z])/).join(' ')}</p>
    <p style={{ margin: '0' }}>Rating: {hotel.rating} / 5</p>
  </div>
</div>
        )}
      </div>
    </div>
    <h2 style={{ fontWeight: 'normal', fontSize: '1em', color: 'gray' }}>Developed by Eshaan Chichula, Shruthi Kunjur, Marc Vaz </h2>
  </>
  );
}