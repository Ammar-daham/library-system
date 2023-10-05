import { Link } from 'react-router-dom'
import {
  List,
  ListItemButton,
  ListItem,
  ListItemText,
  Container,
  Grid,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import SearchInput from './Search'
import ReusedButton from './Button'
import Logout from './Logout'
import Profile from './Profile'

import '../App.css'

const Header = () => {
  const navigate = useNavigate()

  // to get the param
  const pathname = window.location.pathname
  const staticPart = pathname.split('/').filter(Boolean)[0]

  // get user token from local storage
  const userToken = localStorage.getItem('userToken')

  const handleClick = () => {
    navigate('/sign-up')
  }

  return (
    <Container className="header-container">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {staticPart !== 'sign-up' && staticPart !== 'login' && (
            <List>
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <Link className="header-link" to={`/login`}>
                    <ListItemText>BOOKS</ListItemText>
                  </Link>
                </ListItemButton>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <Link className="header-link" to={`/login`}>
                    <ListItemText>AUTHORS</ListItemText>
                  </Link>
                </ListItemButton>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <Link className="header-link" to={`/login`}>
                    <ListItemText>ADDED BOOK</ListItemText>
                  </Link>
                </ListItemButton>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <Link className="header-link" to={`/login`}>
                    <ListItemText>ADDED AUTHOR</ListItemText>
                  </Link>
                </ListItemButton>
              </ListItem>
            </List>
          )}
        </Grid>

        <Grid item xs={6}>
          <List sx={{ float: 'right' }}>
            <ListItem disablePadding>
              {staticPart !== 'sign-up' && staticPart !== 'login' && (
                <SearchInput />
              )}
              {!userToken ? (
                <>
                  <ListItemButton sx={{ textAlign: 'center' }}>
                    <Link className="header-link" to={`/login`}>
                      <ListItemText>LOGIN</ListItemText>
                    </Link>
                  </ListItemButton>
                  <ReusedButton onClick={handleClick}>Sign Up</ReusedButton>
                </>
              ) : (
                <>
                  <Profile />
                  <Logout />
                  </>
              )}
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Header
