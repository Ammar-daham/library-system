import {
  Container,
  Grid,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  MenuItem,
  SelectChangeEvent,
  Select,
} from '@mui/material'
import ColorButton from 'components/Button'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'redux/store'
import { addAuthor } from 'redux/slices/authorSlice'

import '../App.css'
import { Author } from 'types'

const AuthorForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const authorsState = useSelector((state: RootState) => state.authors)
  const { books } = useSelector((state: RootState) => state)

  const [author, setAuthor] = useState<Author>({
    _id: '',
    name: '',
    email: '',
    books: [],
  })

  const [book, setBook] = useState({
    _id: '',
  })

  console.log('book: ', book)
  console.log('author: ', author)

  const handleChange = (event: SelectChangeEvent) => {
    let value = event.target.value
    setBook({_id: event.target.value as string })
    setAuthor({...author, books: value.split(',')  as any})
  }

  const handleAddBook = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault()
    dispatch(addAuthor(author))
  }

  return (
    <Container disableGutters maxWidth={false} className="addContainer" >
      <form onSubmit={handleAddBook} id="form1">
        <Grid container>
          <Grid item xs={12}>
            <Typography
              className="addBookHeader"
              variant="h6"
              sx={{ marginBottom: '40px' }}
            >
              Add An Author
            </Typography>
          </Grid>
        </Grid>
        <Grid container sx={{padding: '0px 150px'}}>
          <Grid item xs={12} className="addInput">
            <TextField
              id="name-input"
              name="name"
              label="Name"
              type="text"
              value={author.name}
              onChange={(e) => setAuthor({ ...author, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} className="addInput">
            <TextField
              id="email-input"
              name="email"
              label="Email"
              type="text"
              value={author.email}
              onChange={(e) => setAuthor({ ...author, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} className="addInput">
            <Select
              sx={{width: '200px'}}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={book._id}
              label="Title"
              onChange={handleChange}
            >
              {/* <MenuItem value="none">
                      None
              </MenuItem> */}
              { 
              books.bookList.map((book) => (
                <MenuItem 
                    key={book.id}
                    value={book.id}
                >                  
                    {book.title}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>

        {/* <ColorButton type="submit" form="form1" variant="contained">
          {authorsState.addAuthor === 'pending' ? (
            <CircularProgress size={24} color="secondary" />
          ) : (
            'Add Author'
          )}
        </ColorButton> */}
        <br />
        <br />
        {authorsState.addAuthor === 'rejected' ? (
          <Alert severity="error" style={{ backgroundColor: '#F8D6CE' }}>
            Error
          </Alert>
        ) : null}
        {authorsState.addAuthor === 'success' ? (
          <Alert severity="success">New Author Added...</Alert>
        ) : null}
      </form>
    </Container>
  )
}

export default AuthorForm
