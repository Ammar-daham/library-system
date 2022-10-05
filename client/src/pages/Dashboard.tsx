import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { booksFetch } from 'redux/slices/bookSlice'
import { AppDispatch } from '../redux/store'

import { Box, Grid, Paper, styled } from '@mui/material'
import { Link } from 'react-router-dom'
import Header from 'components/Header'
import { orange } from '@mui/material/colors'

import '../App.css'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(booksFetch())
  }, [dispatch])

  return (
    <Box className='mainBox'>
      <Grid container className='mainGrid'>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={2}>
          <div className='sideBarDashboard' style={{backgroundColor: orange[800]}}>
            <a href='' className='link' onClick={() => console.log('clicked')}>
              Books
            </a>
            <a href='' className='link'>
              Add Book
            </a>
            <a href='' className='link'>
              Update Book
            </a>
            <a href='' className='link'>
              Remove Book
            </a>
            <a href='' className='link'>
              Remove Author
            </a>
            <a href='' className='link'>
              Update Author
            </a>
            <a href='' className='link'>
              Remove Author
            </a>
          </div>
        </Grid>
        
        {/* <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid> */}
      </Grid>
    </Box>
  )
}

export default Dashboard
