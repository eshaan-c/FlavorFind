import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import { Container, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import SongCard from '../components/SongCard';
import { formatDuration, formatReleaseDate } from '../helpers/formatter';
const config = require('../config.json');

export default function HotelDetailsPage() {
  const { hotel_id } = useParams();
  const [hotelData, setHotelData] = useState([]);

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/get_hotel_info/${hotel_id}`)
      .then(res => res.json())
      .then(resJson => setHotelData(resJson));

  }, [hotel_id]);

  return (
  <Card style={{ maxWidth: 800, margin: '20px auto', backgroundColor: '#f5a7a7' }}>
    <CardContent>
      <Typography variant="h5" color="text.secondary" component="div">
        Hotel Information for ID: {hotel_id}
      </Typography>
      <Typography variant="h4" color="text.primary" style={{ fontWeight: 'bold' }}>
        {hotelData.name}
      </Typography>
      <Typography variant="h6">
        Phone: {hotelData.phone}
      </Typography>
      <Typography variant="h6">
        Website: <a href={hotelData.website} style={{ color: '#FFFFFF' }}>{hotelData.website}</a>
      </Typography>
      <Typography variant="h6">
        Address: {hotelData.address}
      </Typography>
      <Typography variant="h6">
        Category: {hotelData.category}
      </Typography>
    </CardContent>
  </Card>
);
}