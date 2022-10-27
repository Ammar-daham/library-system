import {
  Box,
 
  Grid,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import BookCard from './BookCard'
import Search from './Search'

const Books = () => {
  const booksState = useSelector((state: RootState) => state.books)

  return (
    <Box sx={{ flexGrow: 1, padding: "50px 100px 100px", background: 'wheat' }}>
      <Grid container>
        <Grid item xs={12} className="search">
          <Search />
        </Grid>
        {booksState.bookList.map((book) => (
          <Grid xs={2} sm={4} md={4}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Books
