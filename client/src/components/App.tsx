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
import { useEffect } from 'react'
import { booksFetch,removeBook } from 'redux/slices/bookSlice'
import { fetchCategories } from 'redux/slices/categorySlice'
import AppBar from './MobileAppBar'
import Alert from './Alert'
import UpdatedBook from './UpdatedBook'
import NewBook from './NewBook'
import { fetchAuthors } from 'redux/slices/authorSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'redux/store'
import NewAuthor from './NewAuthor'

const App = () => {
  window.onbeforeunload = function () {
    localStorage.clear()
  }

  const [ menu, setMenu ] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>('')
  const [errorMessage, setErrorMessage] = useState<string | null>('')
  const booksState = useSelector((state: RootState) => state.books.bookList)
  const categoriesState = useSelector((state: RootState) => state.categories.categoryList)
  const authorsState = useSelector((state: RootState) => state.authors.authorList)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(booksFetch())
    dispatch(fetchCategories())
    dispatch(fetchAuthors())
  }, [dispatch])

  //handling remove book
  const handleDeleteClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    const response = await dispatch(removeBook(id))
    if (response.type === 'book/removeBook/fulfilled') {
      dispatch(booksFetch())
      setSuccessMessage(`Thank you, you have successfully deleted the book ${id}`)
      setTimeout(() => {
        setSuccessMessage('')
        setErrorMessage('')
        window.location.href = '/'; 
      }, 3000)
    } else {
      setErrorMessage(
        `Deleting the book with id ${id} failed`,
      )
      setTimeout(() => {
        setSuccessMessage('')
        setErrorMessage('')
      }, 3000)
    }
  }
  
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
        <Route path="/" element={<Books books={booksState} categories={categoriesState} authors={authorsState} successMessage={successMessage}
        errorMessage={errorMessage} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} handleDeleteClick={handleDeleteClick}/>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/books/:id" element={<Book books={booksState} handleDeleteClick={handleDeleteClick} categories={categoriesState} authors={authorsState} successMessage={successMessage} errorMessage={errorMessage} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} />} />
        <Route path="/books/alert/" element={<Alert />} />
        <Route path="/books/edit-book/:id" element={<UpdatedBook handleDeleteClick={handleDeleteClick} books={booksState} categories={categoriesState} authors={authorsState} successMessage={successMessage} errorMessage={errorMessage} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} />} />
        <Route path="/books/new-book" element={<NewBook categories={categoriesState} authors={authorsState} successMessage={successMessage} errorMessage={errorMessage} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage}/>} />
        <Route path="/books/authors/new-author" element={<NewAuthor books={booksState} successMessage={successMessage} errorMessage={errorMessage} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage}/>} />

      </Routes>
      <Footer />
    </Router>
  )
}
export default App
