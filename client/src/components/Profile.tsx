import React from 'react'
import { Typography, Grid } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'

const Profile = () => {
    const userState = useSelector((state: RootState) => state.users)

    return (
        <Grid container className="profile-container" spacing={1}>
        <Grid item xs={12} md={12}>
          <AccountCircleIcon />
        </Grid>
        <Grid item xs={12} md={12}>
          <Typography variant="body1">
            {userState.user.username.toUpperCase()}
          </Typography>
        </Grid>
      </Grid>
    )
}

export default Profile;