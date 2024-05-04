import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import SongCard from '../components/SongCard';
import { formatDuration, formatReleaseDate } from '../helpers/formatter';
const config = require('../config.json');

export default function AlbumInfoPage() {
  const { restaurant_id } = useParams();

  // const [songData, setSongData] = useState([{}]); // default should actually just be [], but empty object element added to avoid error in template code
  const [albumData, setAlbumData] = useState([]);

  const [selectedSongId, setSelectedSongId] = useState(null);

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/find_restaurant_info/${restaurant_id}`)
      .then(res => res.json())
      .then(resJson => setAlbumData(resJson));

  }, [restaurant_id]);

  return (
    <div>Restaurant Information for ID: {restaurant_id}</div>
);
}