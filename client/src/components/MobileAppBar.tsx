import React from 'react'
import {
  List,
  Container,
} from '@mui/material'
import SearchInput from './Search'
import NavBar from './NavBar'

const MobileAppBar = () => {
  return (
    <Container className="app-bar-container">
      <List sx={{ display: 'flex', flexDirection: 'column' }}>
        <SearchInput />
        <NavBar />
      </List>
    </Container>
  )
}

export default MobileAppBar
