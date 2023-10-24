import React from 'react'
import {
  Card,
  CardMedia,
} from '@mui/material'
import { Book } from 'types'
import '../App.css'

const BookCard = ({ book }: { book: Book }) => {

  return (
      <Card className='book-card'>
        <CardMedia
          component="img"
          height="300"
          image={book.cover}
          alt={book.title}
          />
      </Card>
  )
}

export default BookCard
