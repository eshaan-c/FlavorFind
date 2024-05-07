import { useState } from 'react';
import { Button, Container, Grid, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const config = require('../config.json');

export default function SearchHotelsPage() {
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const [city, setCity] = useState('');
  const [rating, setRating] = useState(0);

  const search = () => {
    const searchCity = city || ' ';
    const searchRating = rating || 0;
    fetch(`http://${config.server_host}:${config.server_port}/find_filtered_hotels/${searchCity}/${searchRating}`)
      .then(res => res.json())
      .then(resJson => {
        const hotelsWithId = resJson.map((hotel, index) => ({ id: index, ...hotel }));
        setData(hotelsWithId);
      });
  }

  const togglePage = () => {
    if (window.location.pathname === '/searchhotels') {
      navigate('/search');
    } else {
      navigate('/searchhotels');
    }
  }

  const columns = [
    { 
      field: 'name', 
      headerName: 'Name', 
      width: 300,
      renderCell: (params) => (
          <Link to={`/hotels/${params.row.id}`}>
              {params.value}
          </Link>
      )
  },
    { field: 'rating', headerName: 'Rating' },
    { 
      field: 'address', 
      headerName: 'Address',
      renderCell: (params) => (
        <p style={{ margin: '0' }}>{params.value.split(/(?=[A-Z])/).join(' ')}</p>
      )
    },
  ]

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Search Hotels</h2>
        <Button 
          onClick={togglePage} 
          style={{ 
            backgroundColor: 'salmon', 
            color: 'white', 
            fontWeight: 'bold', 
            padding: '10px 20px'
          }}
        >
          Go to Search Restaurants
        </Button>
      </div>
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <TextField label='City' value={city} onChange={(e) => setCity(e.target.value)} style={{ width: "100%" }}/>
        </Grid>
        <Grid item xs={6}>
          <TextField label='Minimum Rating' value={rating} onChange={(e) => setRating(e.target.value)} style={{ width: "100%" }}/>
        </Grid>
      </Grid>
      <Button 
        variant="contained" 
        color="inherit" 
        onClick={() => search()} 
        style={{ left: '50%', transform: 'translateX(-50%)', marginTop: '5mm'  }}
      >
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