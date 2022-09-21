import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { booksFetch } from 'redux/slices/bookSlice'
import { AppDispatch, RootState } from '../redux/store'





const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  //const { books } = useSelector((state: RootState) => state)


  useEffect(() => {
    dispatch(booksFetch())
  }, [dispatch])

  return <h1>HOME</h1>
}

export default Home