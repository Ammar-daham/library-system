import React from 'react'

import {
  List,
  Typography,
  Button,
  Toolbar,
  ListItemButton,
  ListItem,
  ListItemText,
  Container,
  Grid,
  Divider,
  Box,
} from '@mui/material'
import Logo from '../logo.png'

import { Link } from 'react-router-dom'
import '../App.css'

const Footer = () => {
  return (
    <Container className="footer-container">
      <Grid container spacing={1}>
        <Grid container item spacing={1}>
          <Grid item xs={12} md={3}>
            <Typography sx={{ padding: '0', fontWeight: 'bold' }}>
              Imaginary Library
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography sx={{ padding: '0', fontWeight: 'bold' }}>
              Discover
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}></Grid>
        </Grid>

        <Grid container item spacing={1}>
          <Grid item xs={12} md={3}>
            <ListItemButton sx={{ padding: '0' }}>
              <Link className="footer-link" to={`/login`}>
                <ListItemText>CAREER</ListItemText>
              </Link>
            </ListItemButton>
          </Grid>
          <Grid item xs={12} md={3}>
            <ListItemButton sx={{ padding: '0' }}>
              <Link className="footer-link" to={`/login`}>
                <ListItemText>BOOKS</ListItemText>
              </Link>
            </ListItemButton>
          </Grid>

          <Grid item xs={12} md={3}></Grid>
        </Grid>

        <Grid container item spacing={3}>
          <Grid item xs={12} md={3}>
            <ListItemButton sx={{ padding: '0' }}>
              <Link className="footer-link" to={`/login`}>
                <ListItemText>BLOGS</ListItemText>
              </Link>
            </ListItemButton>
          </Grid>
          <Grid item xs={12} md={3}>
            <ListItemButton sx={{ padding: '0' }}>
              <Link className="footer-link" to={`/login`}>
                <ListItemText>AUTHORS</ListItemText>
              </Link>
            </ListItemButton>
          </Grid>
          <Grid item xs={12} md={3}></Grid>
          <Grid item xs={12} md={3}></Grid>
        </Grid>

        <Grid container item spacing={3}>
        <Grid item xs={12} md={3}>
                <ListItemButton sx={{padding: '0'}}>
                    <Link className="footer-link" to={`/login`}>
                        <ListItemText>TERM OF SERVICE</ListItemText>
                    </Link>
                </ListItemButton>
            </Grid>
          <Grid item xs={12} md={3}>
            <ListItemButton sx={{ padding: '0' }}>
              <Link className="footer-link" to={`/login`}>
                <ListItemText>ADDED BOOK</ListItemText>
              </Link>
            </ListItemButton>
          </Grid>
          <Grid item xs={12} md={3}></Grid>
          <Grid item xs={12} md={3}></Grid>
        </Grid>

        <Grid container item spacing={3}>
        <Grid item xs={12} md={3}>
                <ListItemButton sx={{padding: '0'}}>
                    <Link className="footer-link" to={`/login`}>
                        <ListItemText>DONATE</ListItemText>
                    </Link>
                </ListItemButton>
            </Grid>
          <Grid item xs={12} md={3}>
            <ListItemButton sx={{ padding: '0' }}>
              <Link className="footer-link" to={`/login`}>
                <ListItemText>ADDED AUTHOR</ListItemText>
              </Link>
            </ListItemButton>
          </Grid>
          <Grid item xs={12} md={3}></Grid>
          <Grid item xs={12} md={3}></Grid>
        </Grid>
      </Grid>

      <Divider />
      <Grid container spacing={2} sx={{ paddingTop: '1rem' }}>
        <Grid>
          <Link to={`/`}>
            <img src={Logo} width="100" alt="logo" />
          </Link>
        </Grid>
        <Grid>
          <p> Imaginary library is a web site for reading, borrowing books </p>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Footer
