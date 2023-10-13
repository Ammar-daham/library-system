import { useState } from 'react'
import { Grid, TextField, Container } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'redux/store'
import { initialUser, User } from '../types'
import Notification from './Notifications'
import ReusedButton from './Button'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../redux/slices/authSlice'

import '../App.css'

const SignUpForm = () => {
  const [user, setUser] = useState<User>(initialUser)
  const [successMessage, setSuccessMessage] = useState<string | null>('')
  const [errorMessage, setErrorMessage] = useState<string | null>('')

  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state.users)

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    e.preventDefault()
    const res = await dispatch(createUser(user))
    if (res.type === 'user/create/fulfilled') {
      setSuccessMessage(state.message)
      setErrorMessage('')
      setTimeout(() => {
        setErrorMessage('')
        setSuccessMessage('')
        navigate('/login')
      }, 2000)
    } else {
      setErrorMessage(state.message)
      setSuccessMessage('')
    }
    console.log('Button clicked!', res)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Container className="signup-main-container">
      <h2 className="signup-h2">SIGN UP</h2>
      <p>Complete the form below to create a new imaginary library account</p>

      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              className="input"
              name="username"
              label="Username"
              type="text"
              value={user.username}
              onChange={handleInputChange}
              aria-required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              className="input"
              name="first_name"
              label="First-name"
              type="text"
              value={user.first_name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              className="input"
              name="last_name"
              label="Last-name"
              type="text"
              value={user.last_name}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              className="input"
              name="email"
              label="Email"
              type="text"
              value={user.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              className="input"
              name="password"
              label="Password"
              type="password"
              value={user.password}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <ReusedButton onClick={handleClick} >
              SIGN UP
            </ReusedButton>
          </Grid>
          <Grid item xs={12}>
            {user && (
              <Notification
                successMessage={successMessage}
                errorMessage={errorMessage}
              />
            )}
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default SignUpForm
