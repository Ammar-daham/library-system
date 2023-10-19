import React, { useEffect } from 'react'
import { useState } from 'react'
import { Grid, TextField, Container } from '@mui/material'

import { Book, initialBook } from '../types'
import Notification from './Notifications'
import ReusedButton from './Button'
import { useParams } from 'react-router-dom'
import { BookFormProps } from '../types'

import '../App.css'

const BookForm: React.FC<BookFormProps> = ({
  handleClick,
  book,
  name,
  title,
  setBook,
  successMessage,
  errorMessage,
}) => {
  if (!book) {
    return null
  }

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   setBook({
  //     ...book,
  //     [e.target.name]: e.target.value,
  //   })
  // }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target

    // If the input is for pages, convert the value to an integer
    const parsedValue = name === 'pages' ? parseInt(value) : value

    setBook({
      ...book,
      [name]: parsedValue,
    })
  }

  return (
    <Container className="book-form-container">
      <h2 className="book-form-h2">{title}</h2>
      <p>Refine an Existing Book or Introduce a new book</p>

      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              className="input"
              name="isbn"
              label="Isbn"
              type="text"
              value={book.isbn}
              onChange={handleInputChange}
              aria-required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              className="input"
              name="title"
              label="Title"
              type="text"
              value={book.title}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              className="input"
              name="publisher"
              label="Publisher"
              type="text"
              value={book.publisher}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              className="input"
              name="status"
              label="Status"
              type="text"
              value={book.status}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              className="input"
              name="published-date"
              label="Published-date"
              type="text"
              value={book.publishedDate}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              className="input"
              name="language"
              label="Language"
              type="text"
              value={book.language}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              className="input"
              name="pages"
              label="Pages"
              type="number"
              value={Number(book.pages)}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              className="input"
              label="Description"
              multiline
              rows={4}
              name="description"
              fullWidth
              type="text"
              value={book.description}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <ReusedButton onClick={handleClick}>{name}</ReusedButton>
          </Grid>
          <Grid item xs={12}>
          <Notification
            successMessage={successMessage}
            errorMessage={errorMessage}
          />
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default BookForm
