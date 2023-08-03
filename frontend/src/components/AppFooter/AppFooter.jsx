import React, { useMemo } from 'react';
import { Container, Grid, Typography, Link, Box, Divider } from '@mui/material';
import { Facebook, Twitter, Google, Instagram, LinkedIn, GitHub } from '@mui/icons-material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const Footer = () => {
  // Get the current location using the useLocation hook
  const location = useLocation();

  // Use useMemo to memoize the isSignInOrSignUpPage value
  const isSignInOrSignUpPage = useMemo(() => {
    return location.pathname === '/signin' || location.pathname === '/signup';
  }, [location.pathname]);

  // If it's the signin or signup page, don't render the footer
  if (isSignInOrSignUpPage) {
    return null;
  }

  return (
    <footer className="text-black" style={{backgroundColor:'#e0f7fa', borderTop: '2px solid grey' }}>
      {/* Grid container */}
      <Container>
        <Grid container justifyContent="center">
          {/* Section: Links */}
          <Grid item md={2}>
            <Typography variant="h6">
              <Link to="/about" color="inherit" component={RouterLink}>
                About us
              </Link>
            </Typography>
          </Grid>
          {/* Section: Links */}
        </Grid>

        <Divider my={5} />

        {/* Section: Text */}
        <Grid container justifyContent="center">
          <Grid item lg={8}>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat
              voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta,
              aliquam sequi voluptate quas.
            </Typography>
          </Grid>

          {/* Add the social icons here */}
          <Grid item xs={12}>
            <section className="text-center mb-5">
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
          </Grid>
        </Grid>
        {/* Section: Text */}
        <Box
          p={3}
          textAlign="center"
          style={{ backgroundColor: '#80deea', maxWidth: '100%' , width:'2000px'}} // Add maxWidth property
        >
          © 2020 Copyright:
          <Link href="https://www.aumsat.com//" color="inherit">
            Aumsat.com
          </Link>
        </Box>
      {/* Copyright */}
      </Container>
      

    
      
    </footer>
  );
};

export default Footer;
