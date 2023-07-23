import React from 'react';
import { Container, Grid, Typography, Link, Box, Divider } from '@mui/material';
import { Facebook, Twitter, Google, Instagram, LinkedIn, GitHub } from '@mui/icons-material';
import { Link as RouterLink, useLocation } from 'react-router-dom'; // Import useLocation hook

const Footer = () => {
  // Get the current location
  const location = useLocation();

  // Check if the current location is signin or signup page
  const isSignInOrSignUpPage = location.pathname === '/signin' || location.pathname === '/signup';

  // If it's the signin or signup page, don't render the footer
  if (isSignInOrSignUpPage) {
    return null;
  }

  return (
    <footer  className="text-black" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', borderTop:'2px solid grey' }}>
    {/* Grid container */}
    <Container>
      {/* Section: Links */}
      <Grid container justifyContent="center">
        {/* Grid column */}
        <Grid item md={2}>
          <Typography variant="h6">
            <Link to="/about" color="inherit" component={RouterLink}>
              About us
            </Link>
          </Typography>
        </Grid>
        {/* Grid column */}
        {/* Repeat the following grid columns for other links */}
      </Grid>
      {/* Section: Links */}

      <Divider my={5} />

      {/* Section: Text */}
      <Grid container justifyContent="center" >
        <Grid item lg={8}>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat
            voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta,
            aliquam sequi voluptate quas.
          </Typography>
        </Grid>
      </Grid>
      {/* Section: Text */}

      {/* Section: Social */}
      <section className="text-center mb-5"  >
        <Link href="#" color="inherit" className="me-4">
          <Facebook />
        </Link>
        <Link href="#" color="inherit" className="me-4">
          <Twitter />
        </Link>
        <Link href="#" color="inherit" className="me-4">
          <Google />
        </Link>
        <Link href="#" color="inherit" className="me-4">
          <Instagram />
        </Link>
        <Link href="#" color="inherit" className="me-4">
          <LinkedIn />
        </Link>
        <Link href="#" color="inherit" className="me-4">
          <GitHub />
        </Link>
      </section>
      {/* Section: Social */}
    </Container>
    {/* Grid container */}

    {/* Copyright */}
    <Box
      p={3}
      textAlign="center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
    >
      © 2020 Copyright:
      <Link href="https://www.aumsat.com//" color="inherit">
        Aumsat.com
      </Link>
    </Box>
    {/* Copyright */}
  </footer> 
  );
};

export default Footer;


