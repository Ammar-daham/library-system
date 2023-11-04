import React from 'react'
import Alert from '@mui/material/Alert'
import '../App.css'

const Notifications = ({ successMessage, errorMessage }: any) => {
  if (successMessage === null && errorMessage === null) {
    return null
  }

  return (
    <div style={{marginTop: '1em'}}>
      {successMessage && (
        <Alert variant="filled" severity="success">
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert variant="filled" severity="error">
          {errorMessage}
        </Alert>
      )}
    </div>
  )
}

export default Notifications
