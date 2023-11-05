import React from 'react'
import { Grid, TextField, Container, Divider } from '@mui/material'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { auth, login } from '../redux/slices/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import ReusedButton from './Button'
import { initialLoggedUser, loggedUser } from '../types'
import Notification from './Notifications'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'redux/store'
import 'App.css'

import { useState } from 'react'

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [successMessage, setSuccessMessage] = useState<string | null>('')
  const [errorMessage, setErrorMessage] = useState<string | null>('')

  const pathname = window.location.pathname
  const staticPart = pathname.split('/').filter(Boolean)[0]

  const [user, setUser] = useState<loggedUser>(initialLoggedUser)

  const handleGoogleOnSuccess = async (data: CredentialResponse) => {
    const res = await dispatch(auth(data))
    if (res.type === 'user/google-login/fulfilled') {
      setSuccessMessage(`Thank you, you have successfully Logged in`)
      setErrorMessage('')
      setTimeout(() => {
        setErrorMessage('')
        setSuccessMessage('')
        if (staticPart === 'authors') {
          navigate('/authors')
        } else if (staticPart === 'books') {
          navigate('/')
        } else {
          navigate('/genres')
        }
      }, 2000)
    } else {
      setErrorMessage(
        `Logging in failed, make sure you are typing the right username and password`,
      )
      setSuccessMessage('')
      setTimeout(() => {
        setErrorMessage('')
        setSuccessMessage('')
      }, 3000)
    }
  }

  const handleClick = async () => {
    const res = await dispatch(login(user))
    if (res.type === 'user/login/fulfilled') {
      setSuccessMessage( `Thank you, you have successfully Logged in`)
      setErrorMessage('')
      setTimeout(() => {
        setErrorMessage('')
        setSuccessMessage('')
        if (staticPart === 'authors') {
          navigate('/authors')
        } else if (staticPart === 'books') {
          navigate('/')
        } else {
          navigate('/genres')
        }
      }, 2000)
    } else {
      setErrorMessage(
        `Logging in failed, make sure you are typing the right username and password`,
      )
      setSuccessMessage('')
      setTimeout(() => {
        setErrorMessage('')
        setSuccessMessage('')
      }, 3000)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Container className="main-container">
      <h2 className="login-h2">LOGIN</h2>
      <form>
        <Grid item xs={12}>
          <GoogleLogin
            onSuccess={handleGoogleOnSuccess}
            onError={() => {
              console.log('Login Failed')
            }}
            shape="rectangular"
            width="290px"
          />
        </Grid>
        <Grid item xs={12} className="login-divider">
          <Divider />
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <p>
              Please enter your email and password to access our your imaginary
              library
            </p>
            <TextField
              fullWidth
              id="input"
              name="username"
              label="Username"
              placeholder="Username"
              type="text"
              value={user.username}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="input"
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
              value={user.password}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <ReusedButton onClick={handleClick} style={{ width: '15em' }}>
              LOGIN
            </ReusedButton>
          </Grid>
          <Grid item xs={12}>
            Not a member of imaginary library?{' '}
            <Link to="/sign-up"> Sign up now</Link>
          </Grid>
        </Grid>
      </form>
      <Notification
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
    </Container>
  )
}

export default LoginForm
