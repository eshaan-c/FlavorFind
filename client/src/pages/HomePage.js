import { useEffect, useState } from 'react';
import { Box, Button, Container, Typography, Paper, Divider, Link } from '@mui/material';
import { NavLink } from 'react-router-dom';


const config = require('../config.json');

export default function HomePage() {
  // We use the setState hook to persist information across renders (such as the result of our API calls)
  const [rand, setRand] = useState({});


  useEffect(() => {

    fetch(`http://${config.server_host}:${config.server_port}/random`)
      .then(res => res.json())
      .then(resJson => setRand(resJson));

  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ bgcolor: '#f3c9c1', height: '40vh', py: 8 }}>
        <Typography variant="h2" align="center" gutterBottom>
          Welcome to FlavorFind!
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          Find the best restaurants and hotels based on your desired location and cuisine.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        </Box>
      </Box>
      <Paper elevation={3} sx={{ my: 4, p: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Why FlavorFind?
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          FlavorFind uses advanced algorithms to recommend the best restaurants and hotels for you. Whether you're planning a trip or just looking for somewhere new to eat, FlavorFind can help you find the perfect place.
        </Typography>
      </Paper>
      <Paper elevation={3} sx={{ my: 4, p: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Random Restaurant Recommendation
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Refresh the page for a new restaurant to go to!
      </Typography>
      <NavLink to={`/restaurants/${rand.id}`}>
        <Typography variant="h4" align="center" gutterBottom>
          {rand.name}
        </Typography>
      </NavLink>
      <Typography variant="h5" align="center" gutterBottom>
        Rating: {rand.rating} / 5
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        {rand.address}
      </Typography>
    </Paper>
    </Container>
  );
};