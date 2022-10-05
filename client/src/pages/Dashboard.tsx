import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { booksFetch } from 'redux/slices/bookSlice'
import { AppDispatch } from '../redux/store'

import { Container } from '@mui/material'
import ColorButton from 'components/Button'
import { Link } from 'react-router-dom'
import Header from 'components/Header'

const Dashboard = () => {
 
  
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(booksFetch())
  }, [dispatch])

  

  return (
    <>
    <Header />
    <Container
      sx={{
        paddingTop: 30,
        textAlign: 'center',
      }}
    >
        <Link to={`/books/`}>
          <ColorButton variant="contained">Books</ColorButton>
        </Link>
        <Link to={`/books/add-book`}>
          <ColorButton variant="contained"> Add A Book</ColorButton>
        </Link>
        <ColorButton variant="contained"> Remove A Book</ColorButton>
        <ColorButton variant="contained"> Update A Book</ColorButton>
    </Container>
    </>
  )
}

export default Dashboard
