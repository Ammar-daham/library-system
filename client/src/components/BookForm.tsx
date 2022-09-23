import {
  Container,
  Grid,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material'
import ColorButton from 'components/Button'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBook } from '../redux/slices/bookSlice'
import { AppDispatch, RootState } from 'redux/store'

const BookForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const booksState = useSelector((state: RootState) => state.books)

  const [book, setBook] = useState({
    isbn: '',
    title: '',
    description: '',
    authors: [],
    status: '',
    borrowerId: Number,
    publishedDate: '',
    borrowDate: '',
    returnDate: '',
  })

  const handleAddBook = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault()
    dispatch(addBook(book))

    setBook({
      isbn: '',
      title: '',
      description: '',
      authors: [],
      status: '',
      borrowerId: Number,
      publishedDate: '',
      borrowDate: '',
      returnDate: '',
    })
  }

  return (
    <form style={{ padding: '50px' }} onSubmit={handleAddBook} id="form1">
      <Container
        sx={{ backgroundColor: 'white', textAlign: 'center', padding: '50px' }}
      >
        <Typography variant="h6">Add A Book</Typography>
        <Grid container>
          <Grid item xs={6}>
            <TextField
              id="isbn-input"
              name="isbn"
              label="ISBN"
              type="text"
              value={book.isbn}
              onChange={(e) => setBook({ ...book, isbn: e.target.value })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="title-input"
              name="title"
              label="Title"
              type="text"
              value={book.title}
              onChange={(e) => setBook({ ...book, title: e.target.value })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="description-input"
              name="descriptipn"
              label="Description"
              type="text"
              value={book.description}
              onChange={(e) =>
                setBook({ ...book, description: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="authors-input"
              name="authors"
              label="Authors"
              type="text"
              value={book.authors}
              //onChange={(e) => setBook({...book, authors: e.target.value})}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="status-input"
              name="status"
              label="Status"
              type="text"
              value={book.status}
              onChange={(e) => setBook({ ...book, status: e.target.value })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="borrowerId-input"
              name="borrowerId"
              label="Borrower-Id"
              type="number"
              value={book.borrowerId}
              //onChange={(Events) => setBook({...book, borrowerId: Events.target.value})}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="publishedDate-input"
              name="publishedDate"
              label="Published-Date"
              type="date"
              value={book.publishedDate}
              onChange={(e) =>
                setBook({ ...book, publishedDate: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="borrowDate-input"
              name="borrowDate"
              label="Borrow-Date"
              type="date"
              value={book.borrowDate}
              onChange={(e) => setBook({ ...book, borrowDate: e.target.value })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="returnDate-input"
              name="returnDate"
              label="return-Date"
              type="date"
              value={book.returnDate}
              onChange={(e) => setBook({ ...book, returnDate: e.target.value })}
            />
          </Grid>
        </Grid>
        <ColorButton type="submit" form="form1" variant="contained">
          {booksState.addBook === 'pending' ? (
            <CircularProgress size={24} color="secondary" />
          ) : (
            'Add A Book'
          )}
        </ColorButton>
        <br/><br/>
        {booksState.addBook === 'rejected' ? (
          <Alert severity="error">Error</Alert>
        ) : null}
        {booksState.addBook === 'success' ? (
          <Alert severity="success">Book Added...</Alert>
        ) : null}
      </Container>
    </form>
  )
}

export default BookForm
