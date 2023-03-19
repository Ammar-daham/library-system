import { useEffect, useState } from 'react'
import {  Grid, TextField } from '@mui/material'
import ColorButton from './Button'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppDispatch, RootState } from 'redux/store'
import { createUser } from '../redux/slices/authSlice'
import { initialUser, User } from '../types'
import Notification from './Notifications'
import '../App.css'


const SignUpForm = () => {

  const [user, setUser] = useState<User>(initialUser)
  const [ successMessage, setSuccessMessage ] = useState<string|null>('')
  const [ errorMessage , setErrorMessage ] = useState<string|null>('')

  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state.users)

  
  useEffect(() => {
    const setMessage = async () => {
      if (state.success) {
        setSuccessMessage(state.message)
        setErrorMessage('');
      } else {
        setErrorMessage(state.message);
        setSuccessMessage('')
      }
    }
    setMessage()
    setTimeout(() => {
      setErrorMessage('')
      setSuccessMessage('')
    }, 5000)
  }, [state.message, state.success])

  
  
  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    await dispatch(createUser(user));
    setUser(initialUser)
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };


  return (
      <form >
        <Grid
          className='grid-container'
          container
          spacing={2}
          id='grid-container'
        >
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              className='input'
              name="username"
              label="Username"
              type="text"
              value={user.username}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              className='input'
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
              className='input'
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
              className='input'
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
              className='input'
              name="password"
              label="Password"
              type="password"
              value={user.password}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <ColorButton onClick={handleSignUp} sx={{ height: 40, width: 290 }} >Sign up</ColorButton>
          </Grid>
          <br />
          <br />

          
          <Grid item xs={12}>
            <Link to='/' style={{ textDecoration: 'none' }}><ColorButton sx={{ height: 40, width: 290 }} >Login</ColorButton></Link>
          </Grid>
          <Grid item xs={12}>
          {
            user &&
            <Notification successMessage={successMessage} errorMessage={errorMessage} />
          }
          </Grid>
        </Grid>
      </form>
  )
}

export default SignUpForm
