import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { booksFetch } from 'redux/slices/bookSlice'
import { AppDispatch } from '../redux/store'
import  BookTable from '../components/BooksTable' 
import AuthorTable from '../components/AuthorsTable'
import { Box, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import Header from 'components/Header'
import { orange } from '@mui/material/colors'


import '../App.css'
import BookForm from 'components/BookForm'
import { fetchAuthors } from 'redux/slices/authorSlice'
import AuthorForm from 'components/AuthorForm'

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [ book, setBook ] = useState(false)
  const [ newBook, setNewBook ] = useState(false)
  const [ author, setAuthor ] = useState(false)
  const [ newAuthor, setNewAuthor ] = useState(false)


  useEffect(() => {
    dispatch(booksFetch())
    dispatch(fetchAuthors())
  }, [dispatch])

  const handleBookTable = () => {
    setBook(true)
    setNewBook(false)
    setAuthor(false)
    setNewAuthor(false)
  }

  const handleAddBook = () => {
    setNewBook(true)
    setBook(false)
    setAuthor(false)
    setNewAuthor(false)
  }

  const handleAuthorTable = () => {
    setBook(false)
    setNewBook(false)
    setAuthor(true)
    setNewAuthor(false)
  }

  const handleAddAuthor = () => {
    setBook(false)
    setNewBook(false)
    setAuthor(false)
    setNewAuthor(true)
  }

  return (
    <Box className='mainBox'>
      <Grid container className='mainGrid'>
        <Grid item xs={12} sx={{maxHeight:100}}>
          <Header />
        </Grid>
        <Grid item xs={2}>
          <div className='sideBarDashboard' style={{backgroundColor: orange[800]}}>
            <Typography className='link' onClick={handleBookTable}>
              Books
            </Typography>
            <Typography className='link' onClick={handleAddBook}>
              Add Book
            </Typography>
            <Typography className='link'>
              Update Book
            </Typography >
            <Typography  className='link' onClick={handleAuthorTable}>
              Authors
            </Typography >
            <Typography  className='link'>
              Update Author
            </Typography >
            <Typography  className='link' onClick={handleAddAuthor}>
              Add Author
            </Typography >
          </div>
        </Grid>
        <Grid item xs={10} sx={{padding: '50px 150px 0 30px'}}>
          <div>
            { book && 
              <BookTable />
            }
          </div>
          <div>
            { 
              newBook && 
              <BookForm />
            }
          </div>
          <div>
            { 
              author && 
              <AuthorTable />
            }
          </div>
          <div>
            { 
              newAuthor && 
              <AuthorForm />
            }
          </div>
        </Grid>
        
      </Grid>
    </Box>
  )
}

export default Dashboard
