import { Link } from 'react-router-dom'
import {
  List,
  Typography,
  Button,
  Toolbar,
  ListItemButton,
  ListItem,
  ListItemText,
} from '@mui/material'
import Logo from '../logo.png'
import { useNavigate } from 'react-router-dom'
import SearchInput from './Search'
import ReusedButton from './Button'

import '../App.css'




const Header = () => {
  const navigate = useNavigate()

  // const handleLogout = () => {
  //   localStorage.removeItem('isAdmin')
  //   localStorage.removeItem('userToken')
  //   navigate('/')
  // }

  const handleClick = () => {
    console.log('Button clicked!');
  }

  return (
    <div className="header-container">
      <Toolbar>
        <Link to={`/`}>
          <img src={Logo} width="100" alt="logo" />
        </Link>

        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          Imaginary Library
        </Typography>

        {/* <Typography className='logout' onClick={handleLogout}>
          Logout
        </Typography> */}
         <SearchInput />
        <List>
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <Link className='header-link' to={`/login`}>
                <ListItemText>LOGIN</ListItemText>
              </Link>
            </ListItemButton>
            <Link className='header-link' to={`/sign-up`}>
              <ReusedButton onClick={handleClick}>
                Sign Up
              </ReusedButton>
            </Link>
          </ListItem>
        </List>
      </Toolbar>
    </div>
  )
}

export default Header
