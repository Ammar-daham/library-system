import { Grid, TextField, Container, Divider } from '@mui/material'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
// import ColorButton from './Button'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'redux/store'
import { auth, login } from '../redux/slices/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import ReusedButton from './Button'
import { initialLoggedUser, loggedUser } from '../types'
import 'App.css'

import { useState } from 'react'

// const LoginForm = () => {
//   const dispatch = useDispatch<AppDispatch>()
//   const navigate = useNavigate()
//   const [user, setUser] = useState<loggedUser>(initialLoggedUser)

//   const handleGoogleOnSuccess = async (data: CredentialResponse) => {
//     await dispatch(auth(data))
//     const isAdmin = JSON.parse(localStorage.getItem('isAdmin') || '')
//     console.log('IsAdmin: ', isAdmin)
//     if (isAdmin) {
//       navigate('/dashboard')
//     } else {
//       navigate('/books')
//     }
//   }

//   const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
//     e.preventDefault();
//     const res = await dispatch(login(user))
//     if(res.type === 'user/login/fulfilled') {
//       navigate('/books')
//     }
//     setUser(initialLoggedUser)
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     setUser({
//       ...user,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <form>
//       <Grid
//         className="grid-container"
//         container
//         spacing={2}
//         id="grid-container"
//       >
//         <Grid item xs={12}>
//           <TextField
//             fullWidth
//             id="input"
//             name="email"
//             label="Email"
//             placeholder="Email"
//             type="text"
//             value={user.email}
//             onChange={handleInputChange}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             fullWidth
//             id="input"
//             name="password"
//             label="Password"
//             placeholder="Password"
//             type="password"
//             value={user.password}
//             onChange={handleInputChange}
//           />
//         </Grid>

//         {/* <Grid item xs={12}>
//           <ColorButton sx={{ height: 40, width: 290 }} onClick={handleLogin}>Login</ColorButton>
//         </Grid> */}
//         <br />
//         <br />

//         <Grid item xs={12}>
//           <GoogleLogin
//             onSuccess={handleGoogleOnSuccess}
//             onError={() => {
//               console.log('Login Failed')
//             }}
//             shape="rectangular"
//             width="290px"
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Link to="/singup">Don't have an account? Sign up</Link>
//         </Grid>
//       </Grid>
//     </form>
//   )
// }

// export default LoginForm

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [user, setUser] = useState<loggedUser>(initialLoggedUser)

  const handleGoogleOnSuccess = async (data: CredentialResponse) => {
    await dispatch(auth(data))
    const isAdmin = JSON.parse(localStorage.getItem('isAdmin') || '')
    console.log('IsAdmin: ', isAdmin)
    if (isAdmin) {
      navigate('/dashboard')
    } else {
      navigate('/books')
    }
  }

  const handleClick = () => {
    console.log('Button clicked!');
  }

  return (
    <Container className="login-main-container">
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

        <Grid
          // className="grid-container"
          container
          spacing={2}
        >
          <Grid item xs={12}>
            <p>
              Please enter your email and password to access our your imaginary
              library
            </p>
            <TextField
              fullWidth
              id="input"
              name="email"
              label="Email"
              placeholder="Email"
              type="text"
              // value={user.email}
              // onChange={handleInputChange}
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
              // value={user.password}
              // onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <ReusedButton onClick={handleClick} style={{ width: '15em' }}>
              LOGIN
            </ReusedButton>
          </Grid>
          <Grid item xs={12}>
            Not a member of imaginary library? <Link to="/sign-up"> Sign up now</Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default LoginForm
