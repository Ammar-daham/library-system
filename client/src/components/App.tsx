import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Books from './Books'
import LoginForm from './LoginForm'
import Book from './Book'
import SignUpForm from './SignUpForm'
import Footer from './Footer'
import Header from './Header'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import Logo from '../header-logo.png'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { AppDispatch } from '../redux/store'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { booksFetch } from 'redux/slices/bookSlice'
import AppBar from './MobileAppBar'
import Alert from './Alert'
import UpdatedBook from './UpdatedBook'
import NewBook from './NewBook'

const App = () => {
  window.onbeforeunload = function () {
    localStorage.clear()
  }

  // get existing userToken

  const [ menu, setMenu ] = useState(false)

  const booksState = useSelector((state: RootState) => state.books.bookList)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(booksFetch())
  }, [dispatch, booksState])

  return (
    <Router>
      <div className="app-container">
        <Link to={`/`}>
          <img src={Logo} width="100" alt="logo" />
        </Link>
      </div>
      <Header menu={menu} setMenu={setMenu}/>
      {
        menu && 
        <AppBar />
      }
      <Routes>
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/" element={<Books books={booksState} />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/books/:id" element={<Book books={booksState} />} />
        <Route path="/books/alert/:id" element={<Alert />} />
        <Route path="/books/edit-book/:id" element={<UpdatedBook books={booksState} />} />
        <Route path="/books/new-book" element={<NewBook />} />
      </Routes>
      <Footer />
    </Router>
  )
}
export default App
