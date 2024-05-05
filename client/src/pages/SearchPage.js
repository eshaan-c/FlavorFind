import { useEffect, useState } from 'react';
import { Button, Container, Grid, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const config = require('../config.json');

export default function SearchPage() {
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);

  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);

  const search = () => {
    fetch(`http://${config.server_host}:${config.server_port}/find_filtered_restaurants/${city}/${category}/${rating}`)
      .then(res => res.json())
      .then(resJson => {
        const restaurantsWithId = resJson.map((restaurant, index) => ({ id: index, ...restaurant }));
        setData(restaurantsWithId);
      });
  }

  const columns = [
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'rating', headerName: 'Rating' },
    { field: 'category', headerName: 'Category' },
    { field: 'address', headerName: 'Address' },
  ]

return (
    <Container>
        <h2>Search Restaurants</h2>
        <Grid container spacing={6}>
            <Grid item xs={4}>
                <TextField label='City' value={city} onChange={(e) => setCity(e.target.value)} style={{ width: "100%" }}/>
            </Grid>
            <Grid item xs={4}>
                <TextField label='Category' value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: "100%" }}/>
            </Grid>
            <Grid item xs={4}>
                <TextField label='Minimum Rating' value={rating} onChange={(e) => setRating(e.target.value)} style={{ width: "100%" }}/>
            </Grid>
        </Grid>
        <Button onClick={() => search() } style={{ left: '50%', transform: 'translateX(-50%)' }}>
            Search
        </Button>
        <h2>Results</h2>
        <DataGrid
            rows={data}
            columns={columns.map((column) => {
              if (column.field === 'name' || column.field === 'address') {
                return { ...column, flex: 1 };
              }
              return { ...column, width: 160 };
            })}
            pageSize={pageSize}
            rowsPerPageOptions={[5, 10, 25]}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            autoHeight
        />
    </Container>
);
}