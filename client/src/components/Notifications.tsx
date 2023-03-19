import React from 'react'
import '../App.css'

const Notifications = ({ successMessage, errorMessage }: any) => {
  if (successMessage === null && errorMessage === null) {
    return null
  }

  return (
    <div>
      {
        successMessage &&
          <div className="success">{successMessage}</div>
      }
      {
        errorMessage &&
          <div className="error">{errorMessage}</div>
      }
    </div>
  )
}

export default Notifications