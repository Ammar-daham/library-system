import React from 'react'

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import {
  List,
  ListItemButton,
  ListItem,
  ListItemText,
  Container,
  Grid,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom'
import SearchInput from './Search'
import ReusedButton from './Button'
import Logout from './Logout'
import Profile from './Profile'
import { HeaderProps } from 'types';
import { StickyState } from 'types';
import '../App.css'


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

  const [sticky, setSticky] = useState<StickyState>({ isSticky: false, offset: 0 });
  const headerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (elTopOffset: number, elHeight: number) => {
    if (window.pageYOffset > (elTopOffset + elHeight)) {
      setSticky({ isSticky: true, offset: elHeight });
    } else {
      setSticky({ isSticky: false, offset: 0 });
    }
  };

  useEffect(() => {
    const header = headerRef.current?.getBoundingClientRect();

    const handleScrollEvent = () => {
      if (header) {
        handleScroll(header.top, header.height);
      }
    };

    window.addEventListener('scroll', handleScrollEvent);

    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);

  return (
    <div id="sticky-header" className={`navbar${sticky.isSticky ? ' sticky' : ''}`} ref={headerRef}>
    <Container className='header-container'>
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
              <MenuIcon fontSize='large' onClick={handleClickMenu}></MenuIcon>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Container>
    </div>
  )
}

export default Header
