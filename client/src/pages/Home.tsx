import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { booksFetch } from 'redux/slices/bookSlice'
import { AppDispatch, RootState } from '../redux/store'

import { Box, Container, Paper, Card, Button, styled } from '@mui/material'
import { ButtonProps } from '@mui/material/Button';
import { orange } from '@mui/material/colors';
import { BooksTable } from '../components/Table'
import { Link } from 'react-router-dom'


const Home = () => {

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(orange[500]),
    width:200,
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange[700],
    },
  }));

  const dispatch = useDispatch<AppDispatch>()
  const { books } = useSelector((state: RootState) => state)

  useEffect(() => {
    dispatch(booksFetch())
  }, [dispatch])

  const fetchBooksTable = () => {
    
      <Link to={`/books`}></Link>
  }

  return (
    <Container sx={{
      paddingTop: 30,
      textAlign:'center'
    }}>
          <Paper
            sx={{
              width: 500,
              height: 100,
              backgroundColor: '#ffe0b2',
              display: 'flex',
              margin: 'auto'
            }}
          >
                <Link to={`/books/`}>
                  <ColorButton variant="contained">Books</ColorButton>
                </Link>
                <ColorButton variant="contained"> Add A Book</ColorButton>
                <ColorButton variant="contained"> Remove A Book</ColorButton>
          </Paper>
      
      
    </Container>
      
    
  )
}

export default Home
