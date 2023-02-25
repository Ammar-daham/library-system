import { Grid, TextField, withStyles } from '@mui/material'
import {
  CredentialResponse,
  GoogleLogin,
} from '@react-oauth/google'
import ColorButton from './Button'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'redux/store'
import { auth } from '../redux/slices/authSlice'
import { Link, useNavigate } from 'react-router-dom'

import '../App.css'



const LoginForm = () => {

 

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  
  const handleGoogleOnSuccess = async (data: CredentialResponse) => {
    await dispatch(auth(data))
    const isAdmin = JSON.parse(localStorage.getItem('isAdmin') || '')
    console.log('IsAdmin: ', isAdmin)
    
    if (isAdmin) {
      console.log('home page')
      navigate('/dashboard')
    } else {
      console.log('Login')
      navigate('/user')
    } 
    
      }

  return (
      <form>
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
              name="email"
              label="Email"
              placeholder="Email"
              type="text"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="input"
              name="password"
              label="Password"
              placeholder="Password"
              type="text"
            />
          </Grid>

          <Grid item xs={12}>
            <ColorButton sx={{ height: 40, width: 290 }} >Login</ColorButton>
          </Grid>
          <br />
          <br />

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
          <Grid item xs={12}>
               <Link to="/singup">Don't have an account? Sign up</Link>
          </Grid>
        </Grid>
      </form>
  )
}

export default LoginForm
