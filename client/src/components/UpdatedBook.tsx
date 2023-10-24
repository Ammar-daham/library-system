import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'redux/store'
import { useNavigate } from 'react-router-dom'
import { BooksProps } from '../types'
import { useParams } from 'react-router-dom'
import { updateBook } from 'redux/slices/bookSlice'
import BookForm from './BookForm'
import { useState, useEffect } from 'react'
import { Book, initialBook } from '../types'

const UpdatedBook: React.FC<BooksProps> = ({ books, categories, authors }) => {
  const [updatedBook, setUpdatedBook] = useState<Book>(initialBook)
  const [successMessage, setSuccessMessage] = useState<string | null>('')
  const [errorMessage, setErrorMessage] = useState<string | null>('')

  const state = useSelector((state: RootState) => state.books);
  const id = useParams().id;
  const editedBook = books.find((book) => book.id === id);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (editedBook) {
      const { categories, authors, ...restOfBook } = editedBook
      setUpdatedBook((prevBook) => ({
        ...prevBook,
        ...restOfBook,
      }))
    }
  }, [editedBook])


  if (!editedBook) {
    return null
  }

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
  
    // Remove 'categories' and 'authors' from restOfBook
    const { id, categories, authors, ...book } = updatedBook;

    const response = await dispatch(updateBook({ id, ...book}))
    if (response.type === 'book/updateBook/fulfilled') {
      setSuccessMessage(`${state.message} ${updatedBook.id}` || `Thank you, you have successfully edited the book ${updatedBook.id}`)
      setErrorMessage('')
      setTimeout(() => {
        setErrorMessage('')
        setSuccessMessage('')
        navigate(`/books/${updatedBook.id}`)
      }, 3000)
    } else {
        setErrorMessage(state.updateError?.message || `Updating the book with id ${updatedBook.id} failed`);
        setSuccessMessage('')
    }
  }

  return (
    <BookForm
      handleClick={handleClick}
      book={updatedBook}
      setBook={setUpdatedBook}
      name={'EDIT'}
      categories={categories}
      authors={authors}
      title={'Edit and existing book'}
      successMessage={successMessage}
      errorMessage={errorMessage}
    />
  )
}

export default UpdatedBook;
