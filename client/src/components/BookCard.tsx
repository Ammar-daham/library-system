import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'redux/store'
import { Book } from 'types'
import background from '../books.jpg'

const BookCard = ({ book }: { book: Book }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: '10px' }}>
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
        <Typography variant="body2" color="text.secondary">
          {book.description}
        </Typography>
        <ul style={{ paddingLeft: 15 }}>
          {book.authors.map((author) => (
            <li key={author._id}>{author.name}</li>
          ))}
        </ul>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default BookCard
