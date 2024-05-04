import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import { Container, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import SongCard from '../components/SongCard';
import { formatDuration, formatReleaseDate } from '../helpers/formatter';
const config = require('../config.json');

export default function RestaurantDetailsPage() {
  const { restaurant_id } = useParams();
  const [restaurantData, setRestaurantData] = useState([]);

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/get_rest_info/${restaurant_id}`)
      .then(res => res.json())
      .then(resJson => setRestaurantData(resJson));

  }, [restaurant_id]);

  return (
  <Card style={{ maxWidth: 800, margin: '20px auto', backgroundColor: '#f5a7a7' }}>
    <CardContent>
      <Typography variant="h5" color="text.secondary" component="div">
        Restaurant Information for ID: {restaurant_id}
      </Typography>
      <Typography variant="h4" color="text.primary" style={{ fontWeight: 'bold' }}>
        {restaurantData.name}
      </Typography>
      <Typography variant="h6">
        Phone: {restaurantData.phone}
      </Typography>
      <Typography variant="h6">
        Website: <a href={restaurantData.website} style={{ color: '#FFFFFF' }}>{restaurantData.website}</a>
      </Typography>
      <Typography variant="h6">
        Address: {restaurantData.address}
      </Typography>
      <Typography variant="h6">
        Category: {restaurantData.category}
      </Typography>
    </CardContent>
  </Card>
);
}
