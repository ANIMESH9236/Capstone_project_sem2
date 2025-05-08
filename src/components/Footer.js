import React from 'react';
import { Box, Container, Typography, Grid, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: 'auto',
        backgroundColor: '#000000',
        color: '#ffffff',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: '#ffffff', fontSize: '1.1rem' }}>
              PollMaster
            </Typography>
            <Typography variant="body2" sx={{ color: '#ffffff', opacity: 0.8, fontSize: '0.9rem' }}>
              Create and participate in polls to gather opinions.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: '#ffffff', fontSize: '1.1rem' }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Link href="/" sx={{ color: '#ffffff', opacity: 0.8, fontSize: '0.9rem', textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                Home
              </Link>
              <Link href="/score" sx={{ color: '#ffffff', opacity: 0.8, fontSize: '0.9rem', textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                Results
              </Link>
              <Link href="/login" sx={{ color: '#ffffff', opacity: 0.8, fontSize: '0.9rem', textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                Login
              </Link>
              <Link href="/register" sx={{ color: '#ffffff', opacity: 0.8, fontSize: '0.9rem', textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                Register
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: '#ffffff', fontSize: '1.1rem' }}>
              Connect With Us
            </Typography>
            <Box>
              <IconButton sx={{ color: '#ffffff', opacity: 0.8, '&:hover': { opacity: 1 } }} aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ color: '#ffffff', opacity: 0.8, '&:hover': { opacity: 1 } }} aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton sx={{ color: '#ffffff', opacity: 0.8, '&:hover': { opacity: 1 } }} aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton sx={{ color: '#ffffff', opacity: 0.8, '&:hover': { opacity: 1 } }} aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box mt={2} borderTop={1} borderColor="rgba(255, 255, 255, 0.1)" pt={2}>
          <Typography variant="body2" sx={{ color: '#ffffff', opacity: 0.8, fontSize: '0.9rem' }} align="center">
            {'© '}
            {new Date().getFullYear()}
            {' PollMaster. All rights reserved.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 