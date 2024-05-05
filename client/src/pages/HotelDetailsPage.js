import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { Container, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { formatDuration, formatReleaseDate } from '../helpers/formatter';
const config = require('../config.json');

export default function HotelDetailsPage() {
  const { hotel_id } = useParams();
  const [hotelData, setHotelData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/get_hotel_info/${hotel_id}`)
      .then(res => res.json())
      .then(resJson => {
        setHotelData(resJson);
        setLoading(false);
      });

  }, [hotel_id]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Card style={{ maxWidth: 800, margin: '20px auto', backgroundColor: '#c3d4e2' }}>
      <CardContent>
        <Typography variant="h4" color="text.primary" style={{ fontWeight: 'bold', fontFamily: 'Georgia, serif' }}>
          {hotelData.name}
        </Typography>
        <Typography variant="h6" style={{ fontFamily: 'Georgia, serif' }}>
          Website: <a href={hotelData.website} style={{ color: '#3614bb' }}>{hotelData.website}</a>
        </Typography>
        <Typography variant="h6" style={{ fontFamily: 'Georgia, serif' }}>
          Rating: {hotelData.rating}
        </Typography>
        <Typography variant="h6" style={{ fontFamily: 'Georgia, serif' }}>
          Address: {hotelData.address.split(/(?=[A-Z])/).join(' ')}
        </Typography>
        {hotelData.attractions && (
          <Typography variant="h6" style={{ fontFamily: 'Georgia, serif' }}>
            Attractions: <div dangerouslySetInnerHTML={{ __html: hotelData.attractions }} />
          </Typography>
        )}
        {hotelData.description && (
          <Typography variant="h6" style={{ fontFamily: 'Georgia, serif' }}>
            Description: <div dangerouslySetInnerHTML={{ __html: hotelData.description }} />
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}