import { useState } from 'react'
import {  Grid, TextField } from '@mui/material'
import ColorButton from './Button'
import { useDispatch } from 'react-redux'

import '../App.css'
import { Link } from 'react-router-dom'
import { AppDispatch } from 'redux/store'
import { User } from 'types'
import { createUser } from '../redux/slices/authSlice'
import { initialUser } from '../types'


const SignupForm = () => {

  const [user, setUser] = useState<User>(initialUser)

  const dispatch = useDispatch<AppDispatch>()

  const handleSignup = async (e: any) => {
    e.preventDefault()
    await dispatch(createUser(user))
  }

  const handleInputChange = ( e : any ) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

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
              fullWidth
              id="input"
              name="username"
              label="Username"
              type="text"
              value={user.username}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="input"
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
              id="input"
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
              id="input"
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
              id="input"
              name="password"
              label="Password"
              type="text"
              value={user.password}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <ColorButton onClick={handleSignup} sx={{ height: 40, width: 290 }} >Sign up</ColorButton>
          </Grid>
          <br />
          <br />

          
          <Grid item xs={12}>
            <Link to='/' style={{ textDecoration: 'none' }}><ColorButton sx={{ height: 40, width: 290 }} >Login</ColorButton></Link>
          </Grid>
        </Grid>
      </form>
  )
}

export default SignupForm
