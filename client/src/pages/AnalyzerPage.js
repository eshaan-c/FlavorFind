import { useState } from 'react';
import { Button, Container, Grid, TextField, Typography, Paper, CircularProgress } from '@mui/material';

const config = require('../config.json');

export default function AnalyzerPage() {
  // State variables
  const [data, setData] = useState([]);
  const [zip, setZip] = useState('');
  const [topCuisines, setTopCuisines] = useState([]);
  const [loadingRestaurants, setLoadingRestaurants] = useState(false);
  const [loadingCuisines, setLoadingCuisines] = useState(false);


  const search = () => {
    setLoadingRestaurants(true);
    // Fetching number of restaurants
    fetch(`http://${config.server_host}:${config.server_port}/num_restaurants/${zip}`)
      .then(res => res.json())
      .then(resJson => {
        setData(resJson);
        setLoadingRestaurants(false);
      });

    setLoadingCuisines(true);
    // Fetching top cuisines
    fetch(`http://${config.server_host}:${config.server_port}/top_cuisines/${zip}`)
      .then(res => res.json())
      .then(resJson => {
        setTopCuisines(resJson);
        setLoadingCuisines(false);
      });
  }

  return (
  <Container>
    <Paper style={{ padding: '20px', marginTop: '20px', backgroundColor: '#f5f5f5' }}>
      {/* Title */}
      <Typography variant="h4" style={{ marginBottom: '20px', color: '#000000' }}>Restaurant Analyzer</Typography>
      <form onSubmit={(e) => { e.preventDefault(); search(); }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={6}>
            {/* Zip input field */}
            <TextField
              label="Zip"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* Search button */}
            <Button variant="contained" color="primary" type="submit" fullWidth>Search</Button>
          </Grid>
        </Grid>
      </form>
      <Typography variant="h3" style={{ marginTop: '30px', color: '#000000' }}>
        {/* Number of Restaurants */}
        Number of Restaurants: {loadingRestaurants ? <CircularProgress size={24} /> : data.num_restaurants}
      </Typography>
      <Typography variant="h6" style={{ marginTop: '20px', color: '#000000' }}>
        {/* Top Cuisines */}
        Top Cuisines: {loadingCuisines ? <CircularProgress size={24} /> : ''}
      </Typography>
      <ul>
        {topCuisines.map((cuisine, index) => (
          <li key={index} style={{ fontSize: '18px', color: '#000000' }}>{cuisine.category}: {cuisine.average_rating}</li>
        ))}
      </ul>
    </Paper>
    {/* Developer credits */}
    <Typography variant="body1" align="left" color="text.secondary" style={{ marginBottom: '20px', marginTop: '20px' }}>
      Developed by Eshaan Chichula, Shruthi Kunjur, Marc Vaz
    </Typography>
  </Container>
);
}