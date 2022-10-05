import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { booksFetch } from 'redux/slices/bookSlice'
import { AppDispatch } from '../redux/store'

import { Box, Container, Grid, Paper, styled } from '@mui/material'
import ColorButton from 'components/Button'
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
            <Link to={`/books/`} className='link'>
              Books
            </Link>
            <Link to={`/books/add-book`} className='link'>
              Add Book
            </Link>
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
    // <Box sx={{ flexGrow: 1 }}>
    //     <Grid container spacing={2} className='mainGrid'>
    //       <Grid item xs={2} className='sideBarDashboard'>
    //         <Item>xs=2</Item>

    //       </Grid>
    //       <Grid item xs={10} className='header' sx={{backgroundColor: 'black'}}>
    //        <Item>xs=10</Item>
    //       </Grid>
    //     {/* <Link to={`/books/`}>
    //       <ColorButton variant="contained">Books</ColorButton>
    //       </Link>
    //       <Link to={`/books/add-book`}>
    //       <ColorButton variant="contained"> Add A Book</ColorButton>
    //       </Link>
    //       <ColorButton variant="contained"> Remove A Book</ColorButton>
    //     <ColorButton variant="contained"> Update A Book</ColorButton> */}
    //     </Grid>
    //   </Box>
  )
}

export default Dashboard
