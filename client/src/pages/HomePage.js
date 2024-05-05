import { useEffect, useState } from 'react';
import { Box, Button, Container, Typography, Paper, Divider, Card, CardMedia, Grid} from '@mui/material';
import { NavLink, Link } from 'react-router-dom';


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
      <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
      <Link to="/search" style={{ textDecoration: 'none' }}>
        <Card>
          <CardMedia
            component="img"
            height="200"
            image="https://media.architecturaldigest.com/photos/572a34ffe50e09d42bdfb5e0/master/pass/japanese-restaurants-la-01.jpg"
            alt="Find Restaurants"
          />
          <Typography variant="h4" align="center" gutterBottom>
            Find Restaurants
          </Typography>
        </Card>
      </Link>
      </Grid>
      <Grid item xs={12} md={6}>
      <Link to="/searchhotels" style={{ textDecoration: 'none' }}>
        <Card>
          <CardMedia
            component="img"
            height="200"
            image="https://i.pinimg.com/originals/20/07/d6/2007d6dd4ca8f4b527d19c7baaefab7e.jpg"
            alt="Find Hotels"
          />
          <Typography variant="h4" align="center" gutterBottom>
            Find Hotels
          </Typography>
        </Card>
      </Link>
      </Grid>
    </Grid>

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