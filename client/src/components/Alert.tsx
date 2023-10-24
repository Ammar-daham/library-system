import React from 'react';
import { Container, Typography } from '@mui/material';
import LoginForm from './LoginForm';

const Alert = () => {
  return (
    <>
      <Container className="alert-container">
        <h2>Permission denied.</h2>
        <Typography>Permission denied to delete, updated and add new book</Typography>
        <Typography>Only logged users are allowed to modify, add and delete books and authors</Typography>
      </Container>
      <LoginForm />
    </>
  )
}

export default Alert
