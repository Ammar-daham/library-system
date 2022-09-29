import { Container, Divider, Grid, TextField } from '@mui/material'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import ColorButton from './Button'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'redux/store'
import { auth } from '../redux/slices/authSlice'

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>()
 

  //   const handleGetBooks = async () => {
  //     try{
  //         const res = await axios.get('http://localhost:4000/api/v1/books', {
  //             headers: {
  //                 Authorization: `Bearar ${token}`,
  //             }})
  //         console.log('res: ', res.data)
  //     } catch (error: any) {
  //         console.log('error: ', error.response.data)
  //     }
  //   }

  const handleGoogleOnSuccess = (data: CredentialResponse) => {
    dispatch(auth(data))
  }

  return (
    <Container
      sx={{
        padding: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
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
          <ColorButton sx={{ height: 50, width: 290 }}>Sign In</ColorButton>
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
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default LoginForm
