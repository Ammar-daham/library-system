import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { booksFetch } from 'redux/slices/bookSlice'
import { AppDispatch } from '../redux/store'
import  Table from '../components/Table' 
import { Box, Grid, Paper, styled, Typography } from '@mui/material'
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
  const [ book, setBook ] = useState(false)
  console.log(book)
  useEffect(() => {
    dispatch(booksFetch())
    
  }, [dispatch])

  const handleBookTable = () => {
    setBook(true)
  }

  return (
    <Box className='mainBox'>
      <Grid container className='mainGrid'>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={2}>
          <div className='sideBarDashboard' style={{backgroundColor: orange[800]}}>
            <Typography className='link' onClick={handleBookTable}>
              Books
            </Typography>
            <Typography className='link'>
              Add Book
            </Typography>
            <Typography className='link'>
              Update Book
            </Typography >
            <Typography  className='link'>
              Remove Book
            </Typography >
            <Typography  className='link'>
              Remove Author
            </Typography >
            <Typography  className='link'>
              Update Author
            </Typography >
            <Typography  className='link'>
              Remove Author
            </Typography >
          </div>
        </Grid>
        <Grid item xs={10}>
          <div className='main'>
            { book && 
              <Table />
            }
          </div>
        </Grid>
        
        {/*
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid> */}
      </Grid>
    </Box>
  )
}

export default Dashboard
