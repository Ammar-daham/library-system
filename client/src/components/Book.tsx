import { Grid, Divider, Container } from '@mui/material'
import * as React from 'react'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import BookCard from './BookCard'
import { BooksProps } from '../types'
import { useParams } from 'react-router-dom'
import ReusedButton from './Button'
import { useNavigate } from 'react-router-dom'

import 'App.css'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const Book: React.FC<BooksProps> = ({ books, handleDeleteClick }) => {
  const id = useParams().id
  const book = books.find((book) => book.id === id)
  const navigate = useNavigate()
  const userToken = localStorage.getItem('userToken')

  if (!book) {
    return null
  }

  const handleClick = () => {
    navigate(`/books/books-alert/`)
  }

  const handleUpdate = (id: string) => {
    navigate(`/books/edit-book/${id}`)
  }

  return (
    <Container className="main-container">
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={3}
          md={3}
          style={{ width: '15em', padding: '1rem', textAlign: 'center' }}
        >
          <Grid>
            <BookCard book={book} />
          </Grid>
          <Grid sx={{ paddingBottom: '10px' }}>
            {/* {!userToken ? (
              <Link className="item_link" to={`/books/books-alert/`}>
                <ReusedButton onClick={handleClick}>Borrow</ReusedButton>
              </Link>
            ) : (
                <ReusedButton onClick={handleClick}>
                    Borrow
                </ReusedButton>
            )} */}
          </Grid>
          <Grid sx={{ paddingBottom: '10px' }}>
            {userToken ? (
                <ReusedButton onClick={(e) => handleDeleteClick(e, book.id)}>
                  Delete
                </ReusedButton>
            ) : (
                <ReusedButton onClick={handleClick}>Delete</ReusedButton>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={9} md={9}>
          <Item sx={{ textAlign: 'left' }}>
            <Container
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Grid item xs={12} sm={9} md={9}>
                <h2>{book.title}</h2>
              </Grid>
              <Grid>
                {userToken ? (
                    <ReusedButton onClick={(e) => handleUpdate(book.id)}>Edit</ReusedButton>
                ) : (
                    <ReusedButton onClick={handleClick}>Edit</ReusedButton>
                )}
              </Grid>
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
                <p>{book.language}</p>
              </Item>
            </Grid>
            <Grid item xs={6} sm={3} md={3}>
              <Item>
                <b>
                  <u>Pages</u>
                </b>
                <p>{book.pages}</p>
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

    </Container>
  )
}

export default Book
