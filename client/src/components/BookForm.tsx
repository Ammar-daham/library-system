import React, { useEffect } from 'react'
import { useState } from 'react'
import { Grid, TextField, Container } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'redux/store'
import { Book, initialBook } from '../types'
import Notification from './Notifications'
import ReusedButton from './Button'
import { useNavigate } from 'react-router-dom'
import { BooksProps } from '../types'
import { useParams } from 'react-router-dom'
import { updateBook } from 'redux/slices/bookSlice'



import '../App.css'

const BookForm : React.FC<BooksProps> = ({ books }) => {
  const [ book, setBook ] = useState<Book>(initialBook)
  const [successMessage, setSuccessMessage] = useState<string | null>('')
  const [errorMessage, setErrorMessage] = useState<string | null>('')

  const id = useParams().id

  const editedBook = books.find((book) => book.id === id)

  useEffect(() => {
    if (editedBook) {
      setBook(editedBook);
    }
  }, [editedBook]);
  
  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>()

  if (!editedBook) {
    return null
  }


  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    e.preventDefault()
    const res = await dispatch(updateBook({id, book}))
    console.log("res ", res)
    // if (res.type === 'book/updateBook/fulfilled') {
    //   setSuccessMessage(state.message)
    //   setErrorMessage('')
    //   setTimeout(() => {
    //     setErrorMessage('')
    //     setSuccessMessage('')
    //     navigate('/login')
    //   }, 2000)
    // } else {
    //   setErrorMessage(state.message)
    //   setSuccessMessage('')
    // }
    // console.log('Button clicked!', res)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Container className="signup-main-container">
      <h2 className="book-form-h2">Book Form</h2>
      <p>Refine an Existing Book or Introduce a new book</p>

      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              className="input"
              name="isbn"
              label="Isbn"
              type="text"
              value={book.isbn}
              onChange={handleInputChange}
              aria-required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              className="input"
              name="title"
              label="Title"
              type="text"
              value={book.title}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              className="input"
              name="publisher"
              label="Publisher"
              type="text"
              value={book.publisher}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              className="input"
              name="status"
              label="Status"
              type="text"
              value={book.status}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              className="input"
              name="published-date"
              label="Published-date"
              type="text"
              value={book.publishedDate}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              className="input"
              name="language"
              label="Language"
              type="text"
              value={book.language}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              className="input"
              name="pages"
              label="Pages"
              type="text"
              value={book.pages}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              className="input"
              label="Description"
              multiline
              rows={4}
              name="description"
              fullWidth
              type="text"
              value={book.description}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} >
            <ReusedButton onClick={handleClick}>Edit</ReusedButton>
          </Grid>
          <Grid item xs={12}>
            {/* {user && (
              <Notification
                successMessage={successMessage}
                errorMessage={errorMessage}
              />
            )} */}
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default BookForm
