import { Container } from '@mui/material'
import Books from 'components/Books'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { booksFetch } from 'redux/slices/bookSlice'
import { AppDispatch } from 'redux/store'
import { Book } from '../types'
import 'App.css';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(booksFetch())
  }, [dispatch])

  return (
    <Container className='home-main-container'>
      <Container className='home-sub-container'>
          <h2 className='home-h2'>WELCOME TO OUR IMAGINARY LIBRARY</h2>
          {/* <Books books={books}/> */}
      </Container>
    </Container>
  )
}

export default Home
