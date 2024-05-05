import { useEffect, useState } from 'react';
import { Button, Container, Grid, TextField, Typography, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

const config = require('../config.json');

export default function AnalyzerPage() {
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);

  const [zip, setZip] = useState('');
  const [topCuisines, setTopCuisines] = useState([]);

  const search = () => {
    fetch(`http://${config.server_host}:${config.server_port}/num_restaurants/${zip}`)
      .then(res => res.json())
      .then(resJson => setData(resJson));
  
    fetch(`http://${config.server_host}:${config.server_port}/top_cuisines/${zip}`)
      .then(res => res.json())
      .then(resJson => setTopCuisines(resJson));
  }

  return (
  <Container>
    <Paper style={{ padding: '20px', marginTop: '20px', backgroundColor: '#f5f5f5' }}>
      <Typography variant="h4" style={{ marginBottom: '20px', color: '#000000' }}>Restaurant Analyzer</Typography>
      <form onSubmit={(e) => { e.preventDefault(); search(); }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              label="Zip"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary" type="submit" fullWidth>Search</Button>
          </Grid>
        </Grid>
      </form>
      <Typography variant="h3" style={{ marginTop: '30px', color: '#000000' }}>Number of Restaurants: {data.num_restaurants}</Typography>
      <Typography variant="h6" style={{ marginTop: '20px', color: '#000000' }}>Top Cuisines:</Typography>
      <ul>
        {topCuisines.map((cuisine, index) => (
          <li key={index} style={{ fontSize: '18px', color: '#000000' }}>{cuisine.category}: {cuisine.average_rating}</li>
        ))}
      </ul>
    </Paper>
  </Container>
);
}