import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  List,
  ListItemButton,
  ListItem,
  ListItemText,
  Container,
  Grid,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from 'react-router-dom'
import SearchInput from './Search'
import ReusedButton from './Button'
import Logout from './Logout'
import Profile from './Profile'
import { HeaderProps } from 'types'
import '../App.css'
import NavBar from './NavBar'

const Header: React.FC<HeaderProps> = ({ menu, setMenu }) => {
  const navigate = useNavigate()

  // to get the param
  const pathname = window.location.pathname
  const staticPart = pathname.split('/').filter(Boolean)[0]

  // get user token from local storage
  const userToken = localStorage.getItem('userToken')
  const handleClick = () => {
    navigate('/sign-up')
  }

  const handleClickMenu = () => {
    !menu ? setMenu(true) : setMenu(false)
  }

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 968)

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 968)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
      <Container className="header-container">
        <Grid container spacing={2}>
          <Grid item xs={2} sm={6} md={8}>
            {isMobile && staticPart !== 'sign-up' && staticPart !== 'login' && (
              <ListItem
                disablePadding
                sx={{ textAlign: 'center', paddingTop: '15px' }}
              >
                <MenuIcon fontSize="large" onClick={handleClickMenu}></MenuIcon>
              </ListItem>
            )}
            {staticPart !== 'sign-up' && staticPart !== 'login' && !isMobile && (
              <List>
                <ListItem disablePadding>
                  <NavBar />
                </ListItem>
              </List>
            )}
          </Grid>

          <Grid item xs={10} sm={6} md={4}>
            <List sx={{ float: 'right' }}>
              <ListItem disablePadding>
                {staticPart !== 'sign-up' &&
                  staticPart !== 'login' &&
                  !isMobile && <SearchInput />}
                {!userToken ? (
                  <>
                    <Grid>
                      <ListItemButton sx={{ textAlign: 'center' }}>
                        <Link className="header-link" to={`/login`}>
                          <ListItemText>LOGIN</ListItemText>
                        </Link>
                      </ListItemButton>
                    </Grid>
                    <Grid>
                      <ReusedButton onClick={handleClick}>Sign Up</ReusedButton>
                    </Grid>
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
