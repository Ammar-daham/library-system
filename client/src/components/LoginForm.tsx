import { Container, Divider, Grid, TextField, Typography } from '@mui/material'
import { orange } from '@mui/material/colors'
import {
  CredentialResponse,
  GoogleLogin,
} from '@react-oauth/google'
import ColorButton from './Button'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'redux/store'
import { auth } from '../redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import background from "../books.jpg";

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
    <Container
      className='loginFormContainer'
      maxWidth={false}
      style={{ 
        padding: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        rowGap: '100px',
        height: '100%',
        position: 'absolute',
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
     }}
    >
     
      <Typography variant='h2' sx={{
        backgroundColor: orange[500],
        color: 'white', 
        padding: '10px',
        borderRadius: '10px',
        opacity: 0.9,
        boxShadow: '0 0 40px rgba(8,7,16,0.9)',
        border: '1px solid rgba(255,255,255,0.9)',
        }}>Library System</Typography>
     

      <form>
        <Grid
          className='grid-container'
          container
          spacing={2}
          sx={{
            textAlign: 'center',
            padding: '60px',
            backgroundColor: 'rgba(255,255,255,0.13)',
            width: '430px',
            borderRadius: '10px',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255,255,255,0.1)',
            boxShadow: '0 0 40px rgba(8,7,16,0.6)',
          }}
        >
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="email-input"
              name="email"
              label="Email"
              placeholder="Email"
              type="text"
              style={{
                background: 'rgba(255,255,255,0.20)',
                borderRadius: '10px',
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="password-input"
              name="password"
              label="Password"
              placeholder="Password"
              type="text"
              style={{
                background: 'rgba(255,255,255,0.20)',
                borderRadius: '10px',
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <ColorButton sx={{ height: 40, width: 290 }} >Login</ColorButton>
          </Grid>
          <br />
          <br />

          <Divider />
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
        </Grid>
      </form>
    </Container>
  )
}

export default LoginForm
