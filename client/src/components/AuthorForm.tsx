import React from 'react'
import {
  Container,
  Grid,
  TextField,
} from '@mui/material'
import { AuthorFormProps } from '../types'
import SelectBooks from './SelectBooks'
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
          <Grid item xs={12} sm={12}>
            <TextField
              required
              fullWidth
              className="input"
              name="name"
              label="Name"
              type="text"
              value={author.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              fullWidth
              className="input"
              name="email"
              label="Email"
              type="text"
              value={author.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <SelectBooks
              author={author}
              setAuthor={setAuthor}
              category={null}
              setCategory={null}
              name={'Books'}
              label={'Books'}
              books={books}
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
