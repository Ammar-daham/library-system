import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'redux/store'
import { useNavigate } from 'react-router-dom'
import { Author, initialAuthor } from '../types'
import { NewAuthorCategoryProps } from '../types'
import { addAuthor, fetchAuthors } from 'redux/slices/authorSlice'
import AuthorForm from './AuthorForm'

const NewAuthor: React.FC<NewAuthorCategoryProps> = ({
  books,
  successMessage,
  errorMessage,
  setSuccessMessage,
  setErrorMessage,
}) => {
  const [author, setAuthor] = useState<Author>(initialAuthor)
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state.authors)
  const navigate = useNavigate()

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log('newBook ', author)
    const response = await dispatch(addAuthor(author))
    console.log('response in new author ', response)
    if (response.type === 'authors/addAuthor/fulfilled') {
      dispatch(fetchAuthors())
      setSuccessMessage(
        state.message ||
          `Thank you, you have successfully added author`,
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
          `Adding author failed, make sure all the required fields filled`,
      )
      setTimeout(() => {
        setErrorMessage('')
        setSuccessMessage('')
      }, 3000)
    }
  }

  return (
    <AuthorForm
      author={author}
      setAuthor={setAuthor}
      handleClick={handleClick}
      books={books}
      name={'ADD AUTHOR'}
      title={"Add author's information"}
      successMessage={successMessage}
      errorMessage={errorMessage}
    />
  )
}

export default NewAuthor
