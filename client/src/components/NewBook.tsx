import { useState } from 'react'
import BookForm from './BookForm'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'redux/store'
import { useNavigate } from 'react-router-dom'
import { Book, initialBook } from '../types'
import { addBook } from '../redux/slices/bookSlice'

const NewBook = () => {
  const [newBook, setNewBook] = useState<Book>(initialBook)
  const [successMessage, setSuccessMessage] = useState<string | null>('')
  const [errorMessage, setErrorMessage] = useState<string | null>('')

  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state.books);
  const navigate = useNavigate()

  if (!newBook) {
    return null
  }

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const response = await dispatch(addBook(newBook))
    if (response.type === 'books/bookAdd/fulfilled') {
        setSuccessMessage(`${state.message} ${newBook.id}` || `Thank you, you have successfully added new book ${newBook.id}`)
        setErrorMessage('')
        setTimeout(() => {
          setErrorMessage('')
          setSuccessMessage('')
          navigate(`/`)
        }, 3000)
      } else {
          setErrorMessage(state.updateError?.message || `adding the book with id ${newBook.id} has failed`);
          setSuccessMessage('')
      }

  }

  return (
    <BookForm
      book={newBook}
      setBook={setNewBook}
      handleClick={handleClick}
      name={'ADD BOOK'}
      title={'Add new book'}
      successMessage={successMessage}
      errorMessage={errorMessage}
    />
  )
}

export default NewBook
