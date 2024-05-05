import { useEffect, useState } from 'react';
import { Button, Container, Grid, TextField, Typography, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

const config = require('../config.json');

export default function AnalyzerPage() {
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);

  const [zip, setZip] = useState('');

  const search = () => {
    fetch(`http://${config.server_host}:${config.server_port}/num_restaurants/${zip}`)
      .then(res => res.json())
      .then(resJson => setData(resJson));
  }

return (
  <Container>
    <Paper style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h4" style={{ marginBottom: '20px' }}>Restaurant Analyzer</Typography>
      <form onSubmit={(e) => { e.preventDefault(); search(); }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              label="Zip"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary" type="submit" fullWidth>Search</Button>
          </Grid>
        </Grid>
      </form>
      <Typography variant="h6" style={{ marginTop: '20px' }}>Number of Restaurants: {data.num_restaurants}</Typography>
    </Paper>
  </Container>
);
}