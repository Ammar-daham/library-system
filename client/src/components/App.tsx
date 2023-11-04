import React, { useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'redux/store'
import { booksFetch,removeBook } from 'redux/slices/bookSlice'
import { fetchCategories } from 'redux/slices/categorySlice'
import { fetchAuthors } from 'redux/slices/authorSlice'
import Books from './Books'
import LoginForm from './LoginForm'
import Book from './Book'
import SignUpForm from './SignUpForm'
import Footer from './Footer'
import Header from './Header'
import MobileAppBar from './MobileAppBar'
import Alert from './Alert'
import UpdatedBook from './UpdatedBook'
import NewBook from './NewBook'
import NewAuthor from './NewAuthor'
import Authors from './Authors'
import UpdatedAuthor from './UpdatedAuthor'
import Genres from './Genres'
import NewGenre from './NewGenre'
import UpdatedGenre from './UpdatedGenre'

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
			
			<Header menu={menu} setMenu={setMenu}/>
			{
				menu && 
				<MobileAppBar />
			}
			<Routes>
				<Route path="/" element={<Books books={booksState} categories={categoriesState} authors={authorsState} successMessage={successMessage}
				errorMessage={errorMessage} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} handleDeleteClick={handleDeleteClick}/>} />
				<Route path="/login" element={<LoginForm />} />
				<Route path="/sign-up" element={<SignUpForm />} />
				<Route path="/books/:id" element={<Book books={booksState} handleDeleteClick={handleDeleteClick} categories={categoriesState} authors={authorsState} successMessage={successMessage} errorMessage={errorMessage} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} />} />
				<Route path="/books/books-alert/" element={<Alert />} />
				<Route path="/books/edit-book/:id" element={<UpdatedBook handleDeleteClick={handleDeleteClick} books={booksState} categories={categoriesState} authors={authorsState} successMessage={successMessage} errorMessage={errorMessage} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} />} />
				<Route path="/books/new-book" element={<NewBook categories={categoriesState} authors={authorsState} successMessage={successMessage} errorMessage={errorMessage} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage}/>} />
				<Route path="/authors/new-author" element={<NewAuthor books={booksState} successMessage={successMessage} errorMessage={errorMessage} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage}/>} />
				<Route path="/authors" element={<Authors  books={booksState} authors={authorsState} successMessage={successMessage} errorMessage={errorMessage} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage}/>} />
				<Route path="/authors/edit-author/:id" element={<UpdatedAuthor books={booksState} authors={authorsState} successMessage={successMessage} errorMessage={errorMessage} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} />} />
				<Route path="/authors/authors-alert/" element={<Alert />} />
				<Route path="/genres" element={<Genres  books={booksState} categories={categoriesState} successMessage={successMessage} errorMessage={errorMessage} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage}/>} />
				<Route path="/genres/new-genre" element={<NewGenre books={booksState} successMessage={successMessage} errorMessage={errorMessage} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage}/>} />
				<Route path="/genres/edit-genre/:id" element={<UpdatedGenre books={booksState} categories={categoriesState} successMessage={successMessage} errorMessage={errorMessage} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} />} />
				<Route path="/genres/genres-alert/" element={<Alert />} />
			</Routes>
			<Footer />
		</Router>
	)
}
export default App
