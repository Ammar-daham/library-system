import { Box, Grid } from '@mui/material'
import Header from 'components/Header'
import Books from 'components/Books'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { booksFetch } from 'redux/slices/bookSlice'
import { AppDispatch } from 'redux/store'

const ClientPage = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(booksFetch())
  }, [dispatch])

  return (
    <Box className="mainBox">
      <Grid container>
        <Grid xs={12}>
          <Header />
          <Books />
        </Grid>
      </Grid>
    </Box>
  )
}

export default ClientPage
