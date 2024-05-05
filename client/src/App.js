import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@mui/material'
import { indigo, amber } from '@mui/material/colors'
import { createTheme } from "@mui/material/styles";

import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import RestaurantsPage from './pages/RestaurantsPage';
import SearchPage from './pages/SearchPage';
import RestaurantDetailsPage from './pages/RestaurantDetailsPage'
import HotelDetailsPage from "./pages/HotelDetailsPage";
import HotelsPage from "./pages/HotelsPage";
import AnalyzerPage from "./pages/AnalyzerPage";
import TopRestaurantsPage from "./pages/TopRestaurantsPage";

// createTheme enables you to customize the look and feel of your app past the default
// in this case, we only change the color scheme
export const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: amber,
  },
});

// App is the root component of our application and as children contain all our pages
// We use React Router's BrowserRouter and Routes components to define the pages for
// our application, with each Route component representing a page and the common
// NavBar component allowing us to navigate between pages (with hyperlinks)
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/restaurants" element={<RestaurantsPage />} />
          <Route path="/restaurants/:restaurant_id" element={<RestaurantDetailsPage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/hotels/:hotel_id" element={<HotelDetailsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/analyzer" element={<AnalyzerPage />} />
          <Route path="/toprestaurants/:city_id" element={<TopRestaurantsPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}