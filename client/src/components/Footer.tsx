import React from 'react'
import {
  List,
  Typography,
  Container,
  Grid,
  Divider,
} from '@mui/material'
import Logo from '../logo.png'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'
import '../App.css'

const Footer = () => {
  return (
    <Container className="footer-container">
      <Grid container spacing={1}>
        <Grid
          container
          item
          spacing={1}
          xs={12}
          sm={6}
          md={4}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          <Grid item>
            <List sx={{ display: 'flex', flexDirection: 'column'}}>
              <Typography sx={{ fontWeight: 'bold', paddingLeft: '15px' }}>
                Discover
              </Typography>
              <NavBar />
            </List>
          </Grid>
        </Grid>

        <Grid
          container
          item
          spacing={1}
          xs={12}
          sm={6}
          md={4}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          <Grid item>
            <Typography sx={{ fontWeight: 'bold', paddingLeft: '15px' }}>
              Imaginary Library
            </Typography>
          </Grid>
          <Grid item>   
          </Grid>
        </Grid>
      </Grid>

      <Divider />
      <Grid container spacing={2} sx={{ paddingTop: '2rem' }}>
        <Grid xs={3} sm={2} md={2}>
          <Link to={`/`}>
            <img src={Logo} width="100" alt="logo" />
          </Link>
        </Grid>
        <Grid xs={9} sm={10} md={10}>
          <Typography sx={{ textAlign: 'justify' }}>
            Imaginary Library is a dynamic online platform designed to
            facilitate the enjoyment of reading and borrowing books. As a
            dedicated space for book enthusiasts, it offers a diverse range of
            literary works, providing a gateway to a world of knowledge and
            imagination. Users can explore, borrow, and immerse themselves in an
            extensive collection of books, making it an invaluable resource for
            avid readers and curious minds alike.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Footer
