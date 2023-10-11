import { Grid, Divider, Container } from '@mui/material'
import * as React from 'react'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import BookCard from './BookCard'
import { BooksProps } from '../types'
import { useParams } from 'react-router-dom'
import ReusedButton from './Button'

import 'App.css'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const Book: React.FC<BooksProps> = ({ books }) => {
  const id = useParams().id
  const book = books.find((book) => book.id === id)

  if (!book) {
    return null
  }

  const handleClick = () => {}

  return (
    <Container className="book-main-container">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3} md={3}>
          <Grid>
            <BookCard book={book} />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={9} md={9}>
          <Item sx={{textAlign: 'left'}}>
            <Container style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h2>
                    {book.title}
                </h2>
                    <ReusedButton onClick={handleClick}>Edit</ReusedButton>
            </Container>
            <Divider />
            <p>{book.description}</p>
          </Item>
          <br />
          <Grid container spacing={1}>
            <Grid item xs={6} sm={3} md={3}>
              <Item>
                <b>
                  <u>Published Date</u>
                </b>
                <p>{book.publishedDate}</p>
              </Item>
            </Grid>
            <Grid item xs={6} sm={3} md={3}>
              <Item>
                <b>
                  <u>Publisher</u>
                </b>
                <p>{book.publisher}</p>
              </Item>
            </Grid>
            <Grid item xs={6} sm={3} md={3}>
              <Item>
                <b>
                  <u>Language</u>
                </b>
                <p>Language</p>
              </Item>
            </Grid>
            <Grid item xs={6} sm={3} md={3}>
              <Item>
                <b>
                  <u>Pages</u>
                </b>
                <p>Pages</p>
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Book
