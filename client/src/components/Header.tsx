import { Link } from 'react-router-dom'
import {  Typography, AppBar, Toolbar } from '@mui/material'
import Logo  from './book-borrow-icon.png'
import { useNavigate } from 'react-router-dom'

import '../App.css'

const Header = () => {

  const navigate = useNavigate()


  const handleLogout = () => {
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('userToken')
    navigate('/')
  }
  
  return (
    <AppBar sx={{ padding: 1, backgroundColor: '#ff9800' }} position="sticky">
      <Toolbar>
        <Link to={`/`}>
          <img src={Logo} width = '50' style={{padding: 10}} alt="logo"/>
        </Link>

        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          Library Management System
        </Typography>

        <Typography className='logout' onClick={handleLogout}>
          Logout
        </Typography>

      </Toolbar>
    </AppBar>
  )
}

export default Header
