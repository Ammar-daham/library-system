import { Grid, Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import BookCard from './BookCard'
import ReusedButton from './Button'

import 'App.css'

const Books = () => {
  const booksState = useSelector((state: RootState) => state.books)

  console.log('books ', booksState)
  const handleClick = () => {
    console.log('Button clicked!');
  }

  return (
      <Grid container columns={{ xs: 6, sm: 4, md: 3 }} sx={{ justifyContent: 'center' }}>
        {booksState.bookList.map((book, index) =>
          book.cover ? (
            <Grid item style={{ width: '15em', padding:'1rem', textAlign: 'center'}}>
              <Grid item  key={index}>
                <BookCard book={book} />
              </Grid>
              <Grid item key={index}>
                <ReusedButton onClick={handleClick} style={{ width: '15em' }}>
                  Preview Only
                </ReusedButton>
              </Grid>
            </Grid>
          ) : null,
        )}
      </Grid>
  )
}

export default Books
