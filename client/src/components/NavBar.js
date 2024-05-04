import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom';

// The hyperlinks in the NavBar contain a lot of repeated formatting code so a
// helper component NavText local to the file is defined to prevent repeated code.
function NavText({ href, text, isMain }) {
  return (
    <Typography
      variant={isMain ? 'h4' : 'h7'}
      noWrap
      style={{
        marginRight: '30px',
        fontFamily: isMain ? 'Gill Sans' : 'system-ui',
        fontWeight: 700,
        letterSpacing: '.2rem',
      }}
    >
      <NavLink
        to={href}
        style={{
          color: 'white',
          textDecoration: 'none',
        }}
      >
        {text}
      </NavLink>
    </Typography>
  )
}

// Here, we define the NavBar. Note that we heavily leverage MUI components
// to make the component look nice. Feel free to try changing the formatting
// props to how it changes the look of the component.
export default function NavBar() {
  return (
    <AppBar position='static' style={{ backgroundColor: '#c74127' }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <NavText href='/' text='FlavorFind' isMain />
          <NavText href='/albums' text='Search' />
          <NavText href='/songs' text='Restaurants' />
          <NavText href='/songs' text='Hotels' />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
