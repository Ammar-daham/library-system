import React from 'react'
import { Grid, Container } from '@mui/material'
import BookCard from './BookCard'
import ReusedButton from './Button'
import { BooksProps } from '../types'
import Notification from './Notifications'
import { useNavigate } from 'react-router-dom'

import 'App.css'

const Books: React.FC<BooksProps> = ({
  books,
  successMessage,
  errorMessage,
  setErrorMessage,
  handleDeleteClick,
}) => {
  const navigate = useNavigate()

  if(books.length === 0) {
    setErrorMessage("Something wrong with the server!")
  } else {
    setErrorMessage('')
  }

  const handleClick = (id: string) => {
    navigate(`/books/${id}`)
  }

  const handleDelete = () => {
    navigate(`/books/books-alert/`)
  }

  const userToken = localStorage.getItem('userToken')
  return (
    <Container className="main-container">
        <h2>WELCOME TO OUR IMAGINARY LIBRARY</h2>
        <Notification
          successMessage={successMessage}
          errorMessage={errorMessage}
        />
        <Grid
          container
          columns={{ xs: 6, sm: 4, md: 12 }}
          sx={{ justifyContent: 'center' }}
        >
          {books.map((book, index) => (
            <Grid item key={index} sx={{ width: '15em', padding: '1rem' }}>
              <Grid item>
                <BookCard book={book} />
              </Grid>
              <Grid item>
                <ReusedButton onClick={(e) => handleClick(book.id)}>
                  Preview Only
                </ReusedButton>
              </Grid>
              <Grid item>
                {userToken ? (
                  <ReusedButton onClick={(e) => handleDeleteClick(e, book.id)}>
                    Delete
                  </ReusedButton>
                ) : (
                  <ReusedButton onClick={handleDelete}>Delete</ReusedButton>
                )}
              </Grid>
            </Grid>
          ))}
        </Grid>
    </Container>
  )
}

export default Books
