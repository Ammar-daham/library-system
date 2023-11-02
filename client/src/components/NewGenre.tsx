import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'redux/store'
import { useNavigate } from 'react-router-dom'
import { Category, initialCategory, NewAuthorCategoryProps} from '../types'
import { addCategory, fetchCategories } from 'redux/slices/categorySlice'
import GenreForm from './GenreForm'

const NewGenre: React.FC<NewAuthorCategoryProps> = ({
  books,
  successMessage,
  errorMessage,
  setSuccessMessage,
  setErrorMessage,
}) => {
  const [category, setCategory] = useState<Category>(initialCategory)
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state.categories)
  const navigate = useNavigate()

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const response = await dispatch(addCategory(category))
    console.log('response in new author ', response)
    if (response.type === 'categories/addCategory/fulfilled') {
      dispatch(fetchCategories())
      setSuccessMessage(
        state.message ||
          `Thank you, you have successfully added new genre`,
      )
      setErrorMessage('')
      setTimeout(() => {
        setErrorMessage('')
        setSuccessMessage('')
        navigate(`/genres`)
      }, 3000)
    } else {
      setErrorMessage(
        state.updateError?.message ||
          `Adding genre failed, make sure all the required fields filled`,
      )
      setTimeout(() => {
        setErrorMessage('')
        setSuccessMessage('')
      }, 3000)
    }
  }

  return (
    <GenreForm
      category={category}
      setCategory={setCategory}
      handleClick={handleClick}
      books={books}
      name={'ADD GENRE'}
      title={"Add genre's information"}
      successMessage={successMessage}
      errorMessage={errorMessage}
    />
  )
}

export default NewGenre
