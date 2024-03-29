import { useState } from 'react'
import BookForm from './BookForm'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'redux/store'
import { useNavigate } from 'react-router-dom'
import { Book, initialBook } from '../types'
import { addBook, booksFetch } from '../redux/slices/bookSlice'
import { NewBookProps } from '../types'

const NewBook: React.FC<NewBookProps> = ({
  categories,
  authors,
  successMessage,
  errorMessage,
  setSuccessMessage,
  setErrorMessage,
}) => {
  const [newBook, setNewBook] = useState<Book>(initialBook)
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state.books)

  const navigate = useNavigate()

  if (!newBook) {
    return null
  }

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const response = await dispatch(addBook(newBook))
    if (response.type === 'books/bookAdd/fulfilled') {
      dispatch(booksFetch())
      setSuccessMessage(
        state.message ||
          `Thank you, you have successfully added new book`,
      )
      setErrorMessage('')
      setTimeout(() => {
        setErrorMessage('')
        setSuccessMessage('')
        navigate(`/`)
      }, 3000)
    } else {
      setErrorMessage(
        state.updateError?.message ||
          `Adding new book failed, make sure all the required fields filled`,
      )
      setTimeout(() => {
        setErrorMessage('')
        setSuccessMessage('')
      }, 3000)
    }
  }

  return (
    <BookForm
      book={newBook}
      setBook={setNewBook}
      handleClick={handleClick}
      categories={categories}
      authors={authors}
      name={'ADD BOOK'}
      title={'Add new book'}
      successMessage={successMessage}
      errorMessage={errorMessage}
    />
  )
}

export default NewBook
