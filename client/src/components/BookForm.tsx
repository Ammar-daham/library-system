import {
  Grid,
  TextField,
  Container,
} from '@mui/material'
import Notification from './Notifications'
import ReusedButton from './Button'
import { BookFormProps } from '../types'
import SelectComponent from './SelectComponent'
import '../App.css'

const BookForm: React.FC<BookFormProps> = ({
  handleClick,
  book,
  name,
  title,
  setBook,
  successMessage,
  errorMessage,
  categories,
  authors
}) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
      setBook((prevBook) => ({
        ...prevBook,
        [name]: value,
      }))
  }

  console.log('book ', book)

  return (
    <Container className="book-form-container">
      <h2 className="book-form-h2">{title}</h2>
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
              name="publishedDate"
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
              type="number"
              value={Number(book.pages)}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectComponent book={book} setBook={setBook} name={"Category"} label={"Category"} categories={categories} authors={null}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectComponent book={book} setBook={setBook} name={"Author"} label={"Author"} authors={authors} categories={null}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              className="input"
              name="cover"
              label="Cover"
              type="text"
              value={book.cover}
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
              required
            />
          </Grid>
          <Grid item xs={12}>
            <ReusedButton onClick={handleClick}>{name}</ReusedButton>
          </Grid>
          <Grid item xs={12}>
            <Notification
              successMessage={successMessage}
              errorMessage={errorMessage}
            />
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default BookForm
