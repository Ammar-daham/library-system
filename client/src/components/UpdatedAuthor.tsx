import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'redux/store'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { updateAuthor } from 'redux/slices/authorSlice'
import { useState, useEffect } from 'react'
import { Author, initialAuthor, AuthorsProps } from '../types'
import AuthorForm from './AuthorForm'

const UpdatedAuthor: React.FC<AuthorsProps> = ({
  authors,
  successMessage,
  errorMessage,
  setSuccessMessage,
  setErrorMessage,
  books
}) => {
  const [updatedAuthor, setUpdatedAuthor] = useState<Author>(initialAuthor)
  const state = useSelector((state: RootState) => state.authors)
  const id = useParams().id
  const editedAuthor = authors.find((author) => author.id === id)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(() => {
    if (editedAuthor) {
      const { books, ...restOfAuthor } = editedAuthor
      setUpdatedAuthor((prevAuthor) => ({
        ...prevAuthor,
        ...restOfAuthor,
      }))
    }
  }, [editedAuthor])

  if (!editedAuthor) {
    return null
  }

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    // Remove 'categories' and 'authors' from restOfBook
    const { id, books, ...author } = updatedAuthor

    const response = await dispatch(updateAuthor({ id, ...author }))
    if (response.type === 'author/updateAuthor/fulfilled') {
      setSuccessMessage(
        state.message ||
          `Thank you, you have successfully edited the author ${id}`,
      )
      setErrorMessage('')
      setTimeout(() => {
        setErrorMessage('')
        setSuccessMessage('')
        navigate(`/authors`)
      }, 3000)
    } else {
      setErrorMessage(
        state.updateError?.message ||
          `Updating the author with id ${id} failed`,
      )
      setSuccessMessage('')
      setTimeout(() => {
        setErrorMessage('')
        setSuccessMessage('')
      }, 3000)
    }
  }

  return (
    <AuthorForm
      handleClick={handleClick}
      name={'EDIT'}
      author={updatedAuthor}
      setAuthor={setUpdatedAuthor}
      title={'Edit and existing book'}
      successMessage={successMessage}
      errorMessage={errorMessage}
      books={books}
    />
  )
}

export default UpdatedAuthor
