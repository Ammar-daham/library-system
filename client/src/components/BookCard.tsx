import React from 'react'

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Container,
  Typography,
  Collapse,
  Button
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'redux/store'
import { Book, DecodedUser } from 'types'
import background from '../books.jpg'
import ReusedButton from './Button'
import jwt_decode from 'jwt-decode'
import { booksFetch, borrowBook, returnBook } from 'redux/slices/bookSlice'
import '../App.css'
import { ExpandMore } from './ExpandMoreIcon'


const BookCard = ({ book }: { book: Book }) => {
  // const userToken = localStorage.getItem('userToken') || ''
  // const decoded = jwt_decode(userToken) as DecodedUser
  // const dispatch = useDispatch<AppDispatch>()

  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }



  // const borrow = () => {
  //   dispatch(
  //     borrowBook({
  //       id: book._id,
  //       borrowerId: decoded.userId,
  //     }),
  //   )
  // }

  // const returnBorrowedBook = () => {
  //   dispatch(
  //     returnBook({
  //       id: book._id,
  //       borrowerId: null,
  //     }),
  //   )
  // }

  return (
    // <Card className="book-card">
    //   <CardMedia
    //     component="img"
    //     height="200"
    //     image={background}
    //     alt="green iguana"
    //   />
    //   <CardContent>
    //     <Typography gutterBottom variant="h5" component="div">
    //       {book.title}
    //     </Typography>
    //     <Collapse in={expanded} timeout="auto" unmountOnExit>
    //       <Typography variant="body2" color="text.secondary">
    //         {book.description}
    //       </Typography>
    //     </Collapse>
    //     <Typography>
    //         Publisher: {book.publisher}
    //     </Typography>
    //     <Typography>
    //         category: {book.category}
    //     </Typography>
    //     {/* {book.status === 'borrowed' &&
    //       <Typography>
    //         Borrow-Date: {book.borrowDate}
    //       </Typography>
    //     }
    //     {book.status === 'available' &&
    //       <Typography>
    //         Return-Date: {book.returnDate}
    //       </Typography>
    //     } */}
    //     <ul style={{ paddingLeft: 15 }}>
    //       {book.authors.map((author) => (
    //         <li key={author._id}>{author.name}</li>
    //       ))}
    //     </ul>
    //   </CardContent>
    //   <CardActions>
    //     {/* <Grid container>
    //       <Grid>
    //         {book.status === 'borrowed' && (
    //           <ColorButton disabled>Borrow</ColorButton>
    //         )}
    //         {book.status === 'available' && (
    //           <ColorButton onClick={borrow}>Borrow</ColorButton>
    //         )}
    //       </Grid>
    //       <Grid sx={{ marginLeft: '10px' }}>
    //         {book.status === 'borrowed' && (
    //           <ColorButton onClick={returnBorrowedBook}>Return</ColorButton>
    //         )}
    //         {book.status === 'available' && (
    //           <ColorButton disabled>Return</ColorButton>
    //         )}
    //       </Grid>
    //     </Grid> */}
    //     <Grid>
    //       <ExpandMore
    //         expand={expanded}
    //         onClick={handleExpandClick}
    //         aria-expanded={expanded}
    //         aria-label="show more"
    //       >
    //         <ExpandMoreIcon />
    //       </ExpandMore>
    //     </Grid>
    //   </CardActions>
    // </Card>
     
      <Card className='book-card'>
        <CardMedia
          component="img"
          height="300"
          image={book.cover.small}
          alt={book.title}
          />
      </Card>
    
  )
}

export default BookCard
