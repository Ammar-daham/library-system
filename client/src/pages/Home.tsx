import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { booksFetch } from 'redux/slices/bookSlice'
import { AppDispatch, RootState } from '../redux/store'

import { Container, Paper } from '@mui/material'
import ColorButton from 'components/Button'
import { Link } from 'react-router-dom'

const Home = () => {
 
  
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(booksFetch())
  }, [dispatch])

  
  return (
    <Container
      sx={{
        paddingTop: 30,
        textAlign: 'center',
      }}
    >
      <Paper
        sx={{
          width: 500,
          height: 100,
          backgroundColor: '#ffe0b2',
          display: 'flex',
          margin: 'auto',
        }}
      >
        <Link to={`/books/`}>
          <ColorButton variant="contained">Books</ColorButton>
        </Link>
        <Link to={`/book/addbook`}>
          <ColorButton variant="contained"> Add A Book</ColorButton>
        </Link>
        <ColorButton variant="contained"> Remove A Book</ColorButton>
        <ColorButton variant="contained"> Update A Book</ColorButton>
      </Paper>
    </Container>
  )
}

export default Home
