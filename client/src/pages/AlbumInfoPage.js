import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import SongCard from '../components/SongCard';
import { formatDuration, formatReleaseDate } from '../helpers/formatter';
const config = require('../config.json');

export default function AlbumInfoPage() {
  const { restaurant_id } = useParams();
  const [restaurantData, setRestaurantData] = useState([]);

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/get_rest_info/${restaurant_id}`)
      .then(res => res.json())
      .then(resJson => setRestaurantData(resJson));

  }, [restaurant_id]);

  return (
  <div>
    <h2>Restaurant Information for ID: {restaurant_id}</h2>
    <p>Name: {restaurantData.name}</p>
    <p>Phone: {restaurantData.phone}</p>
    <p>Website: {restaurantData.website}</p>
    <p>Address: {restaurantData.address}</p>
    <p>Category: {restaurantData.category}</p>
  </div>
);
}