import React from 'react'

import { Grid, TextField, Container, Divider, Typography } from '@mui/material'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
// import ColorButton from './Button'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'redux/store'
import 'App.css'
import LoginForm from './LoginForm'
import { useParams } from 'react-router-dom'


const Alert = () => {

  const id = useParams().id

  

  

  return (
    <>
      <Container className="alert-container">
        <h2>Permission denied.</h2>
        <Typography>Permission denied to delete /books/alert/{id}</Typography>
        <Typography>Only logged users as an admin are allowed to modify and delete books and authors</Typography>
      </Container>
      <LoginForm />
    </>
  )
}

export default Alert
