import { useEffect, useState } from 'react'
import { Container, Divider, Grid, TextField } from '@mui/material'
import {
  CredentialResponse,
  GoogleLogin,
  googleLogout,
} from '@react-oauth/google'
import ColorButton from './Button'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'redux/store'
import { auth, userFetch } from '../redux/slices/authSlice'
import jwt_decode from 'jwt-decode'
import { DecodedUser, User } from 'types'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [authenticated, setAuthenticated] = useState(false)

  //const users = useSelector((state: RootState) => state.user.users)
  
  useEffect(() => {
    const userToken = localStorage.getItem('userToken') || ''
    const decoded = jwt_decode(userToken) as DecodedUser
    if(decoded) {
      setAuthenticated(true)
    }
  }, [authenticated])
  
  const handleGoogleOnSuccess = async (data: CredentialResponse) => {
    await dispatch(auth(data))
    //const userToken = localStorage.getItem('userToken') || ''
    //decoded = await jwt_decode(userToken) as DecodedUser
    const isAdmin = JSON.parse(localStorage.getItem('isAdmin') || '')
    console.log('IsAdmin: ', isAdmin)

        if (authenticated && isAdmin) {
          console.log('home page')
          navigate('/home')
        } else {
          console.log('Login')
          navigate('/books')
        } 
    
      }
    // const handleLogout = (data: CredentialResponse) => {
    //   //localStorage.setItem('isAdmin', JSON.stringify(decoded.isAdmin))
    //   dispatch(auth(data))
    //   //const isAdmin = JSON.parse(localStorage.getItem('isAdmin') || '');
    //   if (authenticated && user) {
    //     console.log('home page')
    //     navigate('/home')
    //   } else {
    //     console.log('Login')
    //     navigate('/books')
    //   }

  return (
    <Container
      sx={{
        padding: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <form >
        <Grid
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
            <ColorButton sx={{ height: 40, width: 290 }} >Sign In</ColorButton>
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
          {/* <Grid item xs={12}></Grid>
            <GoogleLogout
            onSuccess={handleGoogleOnSuccess}
            onError={() => {
              console.log('Login Failed')
            }}
            shape="rectangular"
            width="290px" />  
          </Grid> */}
        </Grid>
      </form>
    </Container>
  )
}

export default LoginForm
