import {  Grid, TextField } from '@mui/material'
import ColorButton from './Button'

import '../App.css'
import { Link } from 'react-router-dom'


const SignupForm = () => {
  
  

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
              name="username"
              label="Username"
              placeholder="username"
              type="text"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="input"
              name="first-name"
              label="First-name"
              placeholder="first name"
              type="text"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="input"
              name="last-name"
              label="last-name"
              placeholder="last name"
              type="text"
            />
          </Grid>

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
            <ColorButton sx={{ height: 40, width: 290 }} >Sign up</ColorButton>
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
