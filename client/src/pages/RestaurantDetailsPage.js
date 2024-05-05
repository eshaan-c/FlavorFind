import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, CircularProgress  } from '@mui/material';

const config = require('../config.json');

export default function RestaurantDetailsPage() {
  const { restaurant_id } = useParams();
  const [restaurantData, setRestaurantData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/get_rest_info/${restaurant_id}`)
      .then(res => res.json())
      .then(resJson => setRestaurantData(resJson))
      .then(() => setLoading(false));

  }, [restaurant_id]);


  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }
  
return (
  <Card style={{ maxWidth: 800, margin: '20px auto', backgroundColor: '#fff', boxShadow: '0 4px 6px 0 hsla(0, 0%, 0%, 0.2)' }}>
    <CardContent style={{ display: 'flex', flexDirection: 'row', padding: '20px 40px' }}>
      <div style={{ flex: 1, paddingRight: '20px' }}>
        <Typography variant="h4" color="text.primary" style={{ fontWeight: 'bold', fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", Helvetica, Arial, sans-serif', marginBottom: '10px' }}>
          {restaurantData.name}
        </Typography>
        <Typography variant="h6" style={{ color: '#333', fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", Helvetica, Arial, sans-serif', marginBottom: '10px' }}>
          <strong>Phone:</strong> {restaurantData.phone}
        </Typography>
        <Typography variant="h6" style={{ color: '#333', fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", Helvetica, Arial, sans-serif', marginBottom: '10px' }}>
          <strong>Website:</strong> <a href={restaurantData.website} style={{ color: '#007aff' }}>{restaurantData.website}</a>
        </Typography>
        <Typography variant="h6" style={{ color: '#333', fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", Helvetica, Arial, sans-serif', marginBottom: '10px' }}>
          <strong>Address:</strong> {restaurantData.address}
        </Typography>
        <Typography variant="h6" style={{ color: '#333', fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", Helvetica, Arial, sans-serif', marginBottom: '10px' }}>
          <strong>Category:</strong> {restaurantData.category}
        </Typography>
      </div>
      <img src={restaurantData.images} alt={restaurantData.name} style={{ width: '50%', height: 'auto', borderRadius: '10px' }} />
    </CardContent>
  </Card>
);
}
