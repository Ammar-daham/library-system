import React from 'react'
import {
  Container,
  Grid,
  TextField,
} from '@mui/material'
import { AuthorFormProps } from '../types'
import SelectComponent from './SelectComponent'
import Notification from './Notifications'
import ReusedButton from './Button'
import '../App.css'


const AuthorForm: React.FC<AuthorFormProps> = ({
  handleClick,
  author,
  name,
  title,
  setAuthor,
  successMessage,
  errorMessage,
  books
}) => {
 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
      setAuthor((prevAuthor) => ({
        ...prevAuthor,
        [name]: value,
      }))
  }

  return (
    <Container className="author-form-container">
      <h2 className="author-form-h2">{title}</h2>
      <p>Refine an Existing Author's info or Introduce a new author</p>

      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              className="input"
              name="name"
              label="Name"
              type="text"
              value={author.name}
              onChange={handleInputChange}
              aria-required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              className="input"
              name="email"
              label="Email"
              type="email"
              value={author.email}
              onChange={handleInputChange}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <SelectComponent
              author={author}
              book={null}
              category={null}
              setAuthor={setAuthor}
              setBook={null}
              setCategory={null}
              name={'Book'}
              label={'Book'}
              books={books}
              categories={null}
              authors={null}
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

export default AuthorForm;
