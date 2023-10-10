import {
  Container,
  Grid,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Select,
  SelectChangeEvent,
  MenuItem,
} from '@mui/material'
import ColorButton from 'components/Button'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBook } from '../redux/slices/bookSlice'
import { AppDispatch, RootState } from 'redux/store'

import '../App.css'
import { current } from '@reduxjs/toolkit'
import { Book } from 'types'

const BookForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const booksState = useSelector((state: RootState) => state.books)
  const authors = useSelector((state: RootState) => state.authors.authorList)

  const [book, setBook] = useState<Book>({
    id: '',
    isbn: '',
    title: '',
    description: '',
    publisher: '',
    category: '',
    authors: [],
    cover: {
      small: '',
      large: ''
    },
    status: '',
    borrowerId: [],
    publishedDate: '',
    borrowDate: '',
    returnDate: '',
  })

  const [author, setAuthor] = useState({
    _id: '',
  })
  
  console.log('book: ', book)
  const handleChange = (event: SelectChangeEvent) => {
    let value = event.target.value;
    setAuthor({ ...author, _id: event.target.value as string })
    setBook({...book, authors: value.split(',') as any})
  }
  

  const handleAddBook = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault()
    dispatch(addBook(book))
  }

  return (
    <Container disableGutters maxWidth={false} className="addContainer">
      <form onSubmit={handleAddBook} id="form1">
        <Grid container>
          <Grid item xs={12}>
            <Typography
              className="addBookHeader"
              variant="h6"
              sx={{ marginBottom: '40px' }}
            >
              Add A Book
            </Typography>
          </Grid>
          <Grid item xs={6} className="addBookInput">
            <TextField
              id="isbn-input"
              name="isbn"
              label="ISBN"
              type="text"
              value={book.isbn}
              onChange={(e) => setBook({ ...book, isbn: e.target.value })}
            />
          </Grid>
          <Grid item xs={6} className="addInput">
            <TextField
              id="title-input"
              name="title"
              label="Title"
              type="text"
              value={book.title}
              onChange={(e) => setBook({ ...book, title: e.target.value })}
            />
          </Grid>
          <Grid item xs={6} className="addInput">
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
          <Grid item xs={6} className="addInput">
            <TextField
              id="publisher-input"
              name="publisher"
              label="Publisher"
              type="text"
              value={book.publisher}
              onChange={(e) => setBook({ ...book, publisher: e.target.value })}
            />
          </Grid>
          <Grid item xs={6} className="addInput">
            <TextField
              id="category-input"
              name="category"
              label="Category"
              type="text"
              value={book.category}
              onChange={(e) => setBook({ ...book, category: e.target.value })}
            />
          </Grid>
          <Grid item xs={6} className="addInput">
            <TextField
              id="status-input"
              name="status"
              label="Status"
              type="text"
              value={book.status}
              onChange={(e) => setBook({ ...book, status: e.target.value })}
            />
          </Grid>
          <Grid item xs={6} className="addInput">
            <TextField
              sx={{width: '200px'}}
              id="publishedDate-input"
              name="publishedDate"
              type="date"
              value={book.publishedDate}
              onChange={(e) =>
                setBook({ ...book, publishedDate: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={6} className="addInput">
            <Select
              value={author._id}
              label="Author-Name"
              onChange={handleChange}
              sx={{width: '200px', background:'wheat'}}
            >
              {authors.map((author) => (
                <MenuItem key={author._id}  value={author._id} sx={{background:'wheat'}}>{author.name}</MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        {/* <ColorButton type="submit" form="form1" variant="contained">
          {booksState.addBook === 'pending' ? (
            <CircularProgress size={24} color="secondary" />
          ) : (
            'Add A Book'
          )}
        </ColorButton> */}
        <br />
        <br />
        {booksState.addBook === 'rejected' ? (
          <Alert severity="error" style={{ backgroundColor: '#F8D6CE' }}>
            Error
          </Alert>
        ) : null}
        {booksState.addBook === 'success' ? (
          <Alert severity="success">Book Added...</Alert>
        ) : null}
      </form>
    </Container>
  )
}


export default BookForm
