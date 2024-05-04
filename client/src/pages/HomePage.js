import { useEffect, useState } from 'react';
import { Box, Button, Container, Typography, Paper, Divider, Link } from '@mui/material';
import { NavLink } from 'react-router-dom';

import LazyTable from '../components/LazyTable';
import SongCard from '../components/SongCard';
const config = require('../config.json');

export default function HomePage() {
  // We use the setState hook to persist information across renders (such as the result of our API calls)
  const [songOfTheDay, setSongOfTheDay] = useState({});
  // TODO (TASK 13): add a state variable to store the app author (default to '')
  const [appAuthor, setAppAuthor] = useState('');
  const [selectedSongId, setSelectedSongId] = useState(null);

  // The useEffect hook by default runs the provided callback after every render
  // The second (optional) argument, [], is the dependency array which signals
  // to the hook to only run the provided callback if the value of the dependency array
  // changes from the previous render. In this case, an empty array means the callback
  // will only run on the very first render.
  useEffect(() => {
    // Fetch request to get the song of the day. Fetch runs asynchronously.
    // The .then() method is called when the fetch request is complete
    // and proceeds to convert the result to a JSON which is finally placed in state.
    fetch(`http://${config.server_host}:${config.server_port}/random`)
      .then(res => res.json())
      .then(resJson => setSongOfTheDay(resJson));

    // TODO (TASK 14): add a fetch call to get the app author (name not pennkey) and store the name field in the state variable
    fetch(`http://${config.server_host}:${config.server_port}/author/name`)
      .then(res => res.text())
      .then(resText => setAppAuthor(resText));
  }, []);

  // Here, we define the columns of the "Top Songs" table. The songColumns variable is an array (in order)
  // of objects with each object representing a column. Each object has a "field" property representing
  // what data field to display from the raw data, "headerName" property representing the column label,
  // and an optional renderCell property which given a row returns a custom JSX element to display in the cell.
  const songColumns = [
    {
      field: 'title',
      headerName: 'Song Title',
      renderCell: (row) => <Link onClick={() => setSelectedSongId(row.song_id)}>{row.title}</Link> // A Link component is used just for formatting purposes
    },
    {
      field: 'album',
      headerName: 'Album Title',
      renderCell: (row) => <NavLink to={`/albums/${row.album_id}`}>{row.album}</NavLink> // A NavLink component is used to create a link to the album page
    },
    {
      field: 'plays',
      headerName: 'Plays'
    },
  ];

  // TODO (TASK 15): define the columns for the top albums (schema is Album Title, Plays), where Album Title is a link to the album page
  // Hint: this should be very similar to songColumns defined above, but has 2 columns instead of 3
  // Hint: recall the schema for an album is different from that of a song (see the API docs for /top_albums). How does that impact the "field" parameter and the "renderCell" function for the album title column?
  const albumColumns = [
    {
      field: 'album',
      headerName: 'Album Title',
      renderCell: (row) => <NavLink to={`/albums/${row.album_id}`}>{row.title}</NavLink>
    },
    {
      field: 'plays',
      headerName: 'Plays'
    },
  ]

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
          FlavorFind uses advanced algorithms to recommend the best restaurants and hotels for you. Whether you're planning a trip or just looking for a new place to eat, FlavorFind can help you find the perfect place.
        </Typography>
      </Paper>
      <Paper elevation={3} sx={{ my: 4, p: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Restaurant of the Day
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Check back every day for a new restaurant recommendation!
        </Typography>
      </Paper>
    </Container>
  );
};