import { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { Card, CardContent, Typography, CircularProgress, Button, Grid } from '@mui/material';

const config = require('../config.json');

export default function HotelDetailsPage() {
  // Extract the hotel_id from the URL parameters
const { hotel_id } = useParams();

// Initialize state variables
const [hotelData, setHotelData] = useState(null); // State to store hotel data
const [loading, setLoading] = useState(true); // State to handle loading status
const [showAttractions, setShowAttractions] = useState(false); // State to toggle attractions visibility
const [showDescription, setShowDescription] = useState(false); // State to toggle description visibility
const [restaurantsNearHotel, setRestaurantsNearHotel] = useState([]); // State to store nearby restaurants

// Function to toggle the visibility of attractions
const toggleAttractions = () => {
  setShowAttractions(!showAttractions);
};

// Function to toggle the visibility of description
const toggleDescription = () => {
  setShowDescription(!showDescription);
};

// Use useEffect to fetch data when the component mounts or hotel_id changes
useEffect(() => {
  // Fetch hotel information from the server
  fetch(`http://${config.server_host}:${config.server_port}/get_hotel_info/${hotel_id}`)
    .then(res => res.json())
    .then(resJson => {
      setHotelData(resJson); // Update hotelData state with the fetched data
      setLoading(false); // Update loading state to false after data is fetched
    });

  // Fetch information about restaurants near the hotel from the server
  fetch(`http://${config.server_host}:${config.server_port}/rests_near_hotel/${hotel_id}`)
    .then(res => res.json())
    .then(resJson => {
      setRestaurantsNearHotel(resJson); // Update restaurantsNearHotel state with the fetched data
    });

}, [hotel_id]); // Run useEffect when hotel_id changes


// If the data is still loading, display a loading indicator
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
            { /* Display hotel information */}
            <Typography variant="h4" color="text.primary" style={{ fontWeight: 'bold', fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", Helvetica, Arial, sans-serif', marginBottom: '10px' }}>
              {hotelData.name}
            </Typography>
            <Typography variant="h6" style={{ color: '#333', fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", Helvetica, Arial, sans-serif', marginBottom: '10px' }}>
              <strong>Website:</strong> <a href={hotelData.website} style={{ color: '#007aff', wordWrap: 'break-word' }}>{hotelData.website}</a>
            </Typography>
            <Typography variant="h6" style={{ color: '#333', fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", Helvetica, Arial, sans-serif', marginBottom: '10px' }}>
              <strong>Rating:</strong> {hotelData.rating}
            </Typography>
            <Typography variant="h6" style={{ color: '#333', fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", Helvetica, Arial, sans-serif', marginBottom: '10px' }}>
              <strong>Address:</strong> <a style={{wordWrap: 'break-word' }}>{hotelData.address.split(/(?=[A-Z])/).join(' ')}</a>
            </Typography>
            { /* Display nearby restaurants using second fetch */}
            <Typography variant="h6" style={{ color: '#333', fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", Helvetica, Arial, sans-serif', marginBottom: '10px' }}>
              <strong>Restaurants nearby:</strong> {restaurantsNearHotel.map((restaurant, index) => (
                <span key={restaurant.id}>
                  <NavLink to={`/restaurants/${restaurant.id}`}>
                    {restaurant.name}
                  </NavLink>
                  {index < restaurantsNearHotel.length - 1 ? ', ' : ''}
                </span>
              ))}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            { /* Display nearby attractions if visible, allow toggle functionality */}
            {hotelData.attractions && (
              <Typography variant="body1" style={{ color: '#333', fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", Helvetica, Arial, sans-serif', marginBottom: '10px' }}>
                <strong>Attractions:</strong> 
                <div dangerouslySetInnerHTML={{ __html: showAttractions ? hotelData.attractions : `${hotelData.attractions.substring(0, 100)}...` }} />
                <Button onClick={toggleAttractions}>{showAttractions ? 'Show less' : 'Show more'}</Button>
              </Typography>
            )}
            { /* present the description with the same formatting as attractions */}

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