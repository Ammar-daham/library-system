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
import { fetchCategories } from 'redux/slices/categorySlice'
import AppBar from './MobileAppBar'
import Alert from './Alert'
import UpdatedBook from './UpdatedBook'
import NewBook from './NewBook'
import { fetchAuthors } from 'redux/slices/authorSlice'

const App = () => {
  window.onbeforeunload = function () {
    localStorage.clear()
  }

  // get existing userToken

  const [ menu, setMenu ] = useState(false)

  const booksState = useSelector((state: RootState) => state.books.bookList)
  const categoriesState = useSelector((state: RootState) => state.categories.categoryList)
  const authorsState = useSelector((state: RootState) => state.authors.authorList)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(booksFetch())
    dispatch(fetchCategories())
    dispatch(fetchAuthors())
  }, [dispatch])
  
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
        <Route path="/" element={<Books books={booksState} categories={categoriesState} authors={authorsState}/>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/books/:id" element={<Book books={booksState} categories={categoriesState} authors={authorsState}/>} />
        <Route path="/books/alert/" element={<Alert />} />
        <Route path="/books/edit-book/:id" element={<UpdatedBook books={booksState} categories={categoriesState} authors={authorsState} />} />
        <Route path="/books/new-book" element={<NewBook categories={categoriesState} authors={authorsState}/>} />
      </Routes>
      <Footer />
    </Router>
  )
}
export default App
