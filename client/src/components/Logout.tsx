import React from 'react'

import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ReusedButton from './Button'

const Logout = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('userToken')
    navigate('/')
  }

  return (
    <Typography className="logout-link" onClick={handleLogout}>
      <ReusedButton onClick={handleLogout}> LOGOUT </ReusedButton>
    </Typography>
  )
}

export default Logout
