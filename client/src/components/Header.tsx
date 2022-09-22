import { Link } from 'react-router-dom'
import {  Typography, AppBar, Toolbar } from '@mui/material'
import Logo  from './book-borrow-icon.png'


const Header = () => {
  
  return (
    <AppBar sx={{ padding: 1, backgroundColor: '#ff9800' }} position="sticky">
      <Toolbar>
        <Link to={`/`}>
          <img src={Logo} width = '50' style={{padding: 10}}/>
        </Link>

        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          Library Management System
        </Typography>

      </Toolbar>
    </AppBar>
  )
}

export default Header
