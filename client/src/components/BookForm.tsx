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

import '../App.css'

const BookForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const booksState = useSelector((state: RootState) => state.books)

  const [book, setBook] = useState({
    isbn: '',
    title: '',
    description: '',
    publisher: '',
    category: '',
    authors: [],
    status: '',
    published_Date: '',
  })

  const handleAddBook = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault()
    dispatch(addBook(book))

    setBook({
      isbn: '',
      title: '',
      description: '',
      publisher: '',
      category: '',
      authors: [],
      status: '',
      published_Date: '',
    })
  }

  return (
    <Container disableGutters maxWidth={false}  className="addContainer">
      <form onSubmit={handleAddBook} id="form1">
        <Grid container>
          <Grid item xs={12}>
            <Typography className='addBookHeader' variant="h6" sx={{marginBottom: '40px'}}>
              Add A Book
            </Typography>
          </Grid>
          <Grid item xs={6} className='addBookInput'>
            <TextField
              id="isbn-input"
              name="isbn"
              label="ISBN"
              type="text"
              value={book.isbn}
              onChange={(e) => setBook({ ...book, isbn: e.target.value })}
            />
          </Grid>
          <Grid item xs={6} className='addInput'>
            <TextField
              id="title-input"
              name="title"
              label="Title"
              type="text"
              value={book.title}
              onChange={(e) => setBook({ ...book, title: e.target.value })}
            />
          </Grid>
          <Grid item xs={6} className='addInput'>
            <TextField
              id="description-input"
              name="description"
              label="Description"
              type="text"
              value={book.description}
              onChange={(e) =>
                setBook({ ...book, description: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={6} className='addInput'>
            <TextField
              id="publisher-input"
              name="publisher"
              label="Publisher"
              type="text"
              value={book.publisher}
              onChange={(e) => setBook({ ...book, publisher: e.target.value })}
            />
          </Grid>
          <Grid item xs={6} className='addInput'>
            <TextField
              id="category-input"
              name="category"
              label="Category"
              type="text"
              value={book.category}
              onChange={(e) => setBook({ ...book, category: e.target.value })}
            />
          </Grid>
          <Grid item xs={6} className='addInput'>
            <TextField
              id="authors-input"
              name="authors"
              label="Authors"
              type="text"
              value={book.authors}
              //onChange={(e) => setBook({...book, authors: e.target.value})}
            />
          </Grid>
          <Grid item xs={6} className='addInput'>
            <TextField
              id="status-input"
              name="status"
              label="Status"
              type="text"
              value={book.status}
              onChange={(e) => setBook({ ...book, status: e.target.value })}
            />
          </Grid>
          <Grid item xs={6} className='addInput'>
            <TextField
              id="publishedDate-input"
              name="publishedDate"

              type="date"
              value={book.published_Date}
              onChange={(e) =>
                setBook({ ...book, published_Date: e.target.value })
              }
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
        <br />
        <br />
        {booksState.addBook === 'rejected' ? (
          <Alert severity="error" style={{backgroundColor: '#F8D6CE'}}>Error</Alert>
        ) : null}
        {booksState.addBook === 'success' ? (
          <Alert severity="success">Book Added...</Alert>
        ) : null}
      </form>
    </Container>
  )
}

export default BookForm
