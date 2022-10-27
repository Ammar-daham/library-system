import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  styled,
  Typography,
} from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { booksFetch } from 'redux/slices/bookSlice'
import { AppDispatch, RootState } from 'redux/store'
import BookCard from './BookCard'




const Books = () => {
    const dispatch = useDispatch<AppDispatch>()
    const booksState = useSelector((state: RootState) => state.books)

    useEffect(() => {
        dispatch(booksFetch)
    }, [dispatch])
  return (
    <Box sx={{ flexGrow: 1, padding: 20, background: 'wheat' }}>
      <Grid
        container
      >
        {/* {Array.from(Array(3)).map((_, index: any) => ( */}
        {booksState.bookList.map((book) => (
          <Grid xs={2} sm={4} md={4}>
            <BookCard book={book}/>
          </Grid> 
        ))

        } 
        {/* ))} */}
      </Grid>
    </Box>
  )
}

export default Books
