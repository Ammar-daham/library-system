import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'redux/store'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { initialCategory, GenresProps, Category } from '../types'
import GenreForm from './GenreForm'
import { updateCategory } from 'redux/slices/categorySlice'

const UpdatedGenre: React.FC<GenresProps> = ({
  categories,
  successMessage,
  errorMessage,
  setSuccessMessage,
  setErrorMessage,
  books
}) => {
  const [updatedGenre, setUpdatedGenre] = useState<Category>(initialCategory)
  const state = useSelector((state: RootState) => state.categories)
  const id = useParams().id
  const editedCategory = categories.find((category) => category.id === id)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(() => {
    if (editedCategory) {
      const { books, ...restOfCategory } = editedCategory
      setUpdatedGenre((prevCategory) => ({
        ...prevCategory,
        ...restOfCategory,
      }))
    }
  }, [editedCategory])

  if (!editedCategory) {
    return null
  }

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    // Remove 'categories' and 'authors' from restOfBook
    const { id, books, ...category } = updatedGenre

    const response = await dispatch(updateCategory({ id, ...category }))
    if (response.type === 'category/updateCategory/fulfilled') {
      setSuccessMessage(
        state.message ||
          `Thank you, you have successfully edited category ${id}`,
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
          `Updating the category with id ${id} failed`,
      )
      setSuccessMessage('')
      setTimeout(() => {
        setErrorMessage('')
        setSuccessMessage('')
      }, 3000)
    }
  }

  return (
    <GenreForm
      handleClick={handleClick}
      name={'EDIT'}
      category={updatedGenre}
      setCategory={setUpdatedGenre}
      title={'Edit and existing book'}
      successMessage={successMessage}
      errorMessage={errorMessage}
      books={books}
    />
  )
}

export default UpdatedGenre
