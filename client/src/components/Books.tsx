import React from 'react'
import { Grid, Container } from '@mui/material'
import BookCard from './BookCard'
import ReusedButton from './Button'
import { Link } from 'react-router-dom'
import { BooksProps } from '../types'

import 'App.css'

const Books: React.FC<BooksProps> = ({ books }) => {
  const handleClick = () => {}

  const userToken = localStorage.getItem('userToken')

  return (
    <Container className="home-main-container">
      <Container className="home-sub-container">
        <h2 className="home-h2">WELCOME TO OUR IMAGINARY LIBRARY</h2>
        <Grid
          container
          columns={{ xs: 6, sm: 4, md: 3 }}
          sx={{ justifyContent: 'center' }}
        >
          {books.map((book, index) =>
              <Grid
                item
                style={{ width: '15em', padding: '1rem', textAlign: 'center' }}
              >
                <Grid item key={index}>
                  <BookCard book={book} />
                </Grid>
                <Grid item key={index} sx={{paddingBottom: "10px"}}>
                  <Link className="item_link" to={`/books/${book.id}`}>
                    <ReusedButton onClick={handleClick}>
                      Preview Only
                    </ReusedButton>
                  </Link>
                </Grid>
                <Grid item key={index}>
                  {!userToken ? (
                    <Link className="item_link" to={`/books/alert/`}>
                      <ReusedButton onClick={handleClick}>Delete</ReusedButton>
                    </Link>
                  ) : (
                    <Link className="item_link" to={`/login`}>
                      <ReusedButton onClick={handleClick}>Delete</ReusedButton>
                    </Link>
                  )}
                </Grid>
              </Grid>
          )}
        </Grid>
      </Container>
    </Container>
  )
}

export default Books
