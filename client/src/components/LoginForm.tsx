import { Container, Divider, Grid, TextField, Typography } from '@mui/material'
import { GoogleLogin } from '@react-oauth/google'
import ColorButton from './Button'

const LoginForm = () => {


  const handleGoogleOnSuccess = (response: any) => {
    console.log('response: ', response)
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
          padding: '80px',
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
            style={{background: 'rgba(255,255,255,0.20)', borderRadius: '10px'}}
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
            style={{background: 'rgba(255,255,255,0.20)', borderRadius: '10px'}}
          />
        </Grid>

        <Grid item xs={12}>
          <ColorButton sx={{ height: 50, width: 250 }}>Sign In</ColorButton>
        </Grid>

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
