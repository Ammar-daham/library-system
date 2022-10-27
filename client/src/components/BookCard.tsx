import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  IconButtonProps,
  styled,
  Typography,
  Collapse,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'redux/store'
import { Book, DecodedUser } from 'types'
import background from '../books.jpg'
import ColorButton from './Button'
import jwt_decode from 'jwt-decode'
import { borrowBook, returnBook } from 'redux/slices/bookSlice'

import '../App.css'
import React from 'react'
import { ExpandMore } from './ExpandMoreIcon'


const BookCard = ({ book }: { book: Book }) => {
  const userToken = localStorage.getItem('userToken') || ''
  const decoded = jwt_decode(userToken) as DecodedUser
  const dispatch = useDispatch<AppDispatch>()

  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const borrow = async () => {
    await dispatch(
      borrowBook({
        id: book._id,
        borrowerId: decoded.userId,
      }),
    )
  }

  const returnBorrowedBook = async () => {
    await dispatch(
      returnBook({
        id: book._id,
        borrowerId: null,
      }),
    )
  }

  return (
    <Card className="bookCard">
      <CardMedia
        component="img"
        height="200"
        image={background}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {book.title}
        </Typography>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography variant="body2" color="text.secondary">
            {book.description}
          </Typography>
        </Collapse>
        <ul style={{ paddingLeft: 15 }}>
          {book.authors.map((author) => (
            <li key={author._id}>{author.name}</li>
          ))}
        </ul>
      </CardContent>
      <CardActions>
        <Grid container>
          <Grid>
            {book.status === 'borrowed' && (
              <ColorButton disabled>Borrow</ColorButton>
            )}
            {book.status === 'available' && (
              <ColorButton onClick={borrow}>Borrow</ColorButton>
            )}
          </Grid>
          <Grid sx={{ marginLeft: '10px' }}>
            {book.status === 'borrowed' && (
              <ColorButton onClick={returnBorrowedBook}>Return</ColorButton>
            )}
            {book.status === 'available' && (
              <ColorButton disabled>Return</ColorButton>
            )}
          </Grid>
        </Grid>
        <Grid>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </Grid>
      </CardActions>
    </Card>
  )
}

export default BookCard
