import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, CircularProgress, Button, Grid } from '@mui/material';
import { Container, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { formatDuration, formatReleaseDate } from '../helpers/formatter';
const config = require('../config.json');

export default function HotelDetailsPage() {
  const { hotel_id } = useParams();
  const [hotelData, setHotelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAttractions, setShowAttractions] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const toggleAttractions = () => {
    setShowAttractions(!showAttractions);
  };

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

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
    <Card style={{ maxWidth: 800, margin: '20px auto', backgroundColor: '#fff', boxShadow: '0 4px 6px 0 hsla(0, 0%, 0%, 0.2)' }}>
      <CardContent style={{ display: 'flex', flexDirection: 'row', padding: '20px 40px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" color="text.primary" style={{ fontWeight: 'bold', fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", Helvetica, Arial, sans-serif', marginBottom: '10px' }}>
              {hotelData.name}
            </Typography>
            <Typography variant="h6" style={{ color: '#333', fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", Helvetica, Arial, sans-serif', marginBottom: '10px' }}>
              <strong>Website:</strong> <a href={hotelData.website} style={{ color: '#007aff' }}>{hotelData.website}</a>
            </Typography>
            <Typography variant="h6" style={{ color: '#333', fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", Helvetica, Arial, sans-serif', marginBottom: '10px' }}>
              <strong>Rating:</strong> {hotelData.rating}
            </Typography>
            <Typography variant="h6" style={{ color: '#333', fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", Helvetica, Arial, sans-serif', marginBottom: '10px' }}>
              <strong>Address:</strong> {hotelData.address.split(/(?=[A-Z])/).join(' ')}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            {hotelData.attractions && (
              <Typography variant="body1" style={{ color: '#333', fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", Helvetica, Arial, sans-serif', marginBottom: '10px' }}>
                <strong>Attractions:</strong> 
                <div dangerouslySetInnerHTML={{ __html: showAttractions ? hotelData.attractions : `${hotelData.attractions.substring(0, 100)}...` }} />
                <Button onClick={toggleAttractions}>{showAttractions ? 'Show less' : 'Show more'}</Button>
              </Typography>
            )}
            {hotelData.description && (
              <Typography variant="body1" style={{ color: '#333', fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", Helvetica, Arial, sans-serif', marginBottom: '10px' }}>
                <strong>Description:</strong> 
                <div dangerouslySetInnerHTML={{ __html: showDescription ? hotelData.description : `${hotelData.description.substring(0, 100)}...` }} />
                <Button onClick={toggleDescription}>{showDescription ? 'Show less' : 'Show more'}</Button>
              </Typography>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}