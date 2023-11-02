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
    <Container className="main-container">
      <h2>{title}</h2>
      <p>Refine an existing author's info or introduce a new author</p>
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
              name={'Books'}
              label={'Books'}
              books={books}
              category={null}
              setCategory={null}
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
