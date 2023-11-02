import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { GenresProps } from 'types'
import { Container } from '@mui/material'
import ReusedButton from './Button'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'redux/store'
import { removeAuthor, fetchAuthors } from 'redux/slices/authorSlice'
import Notification from './Notifications'

const Genres: React.FC<GenresProps> = ({
  categories,
  successMessage,
  errorMessage,
  setSuccessMessage,
  setErrorMessage,
}) => {
  const userToken = localStorage.getItem('userToken')
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state.categories)


  const handleClick = () => {}

  const handleDeleteAuthor = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    console.log("id ", id)
    const response = await dispatch(removeAuthor(id))
    if (response.type === 'author/removeAuthor/fulfilled') {
      dispatch(fetchAuthors())
      setSuccessMessage(
        state.message ||
        `Thank you, you have successfully deleted the author ${id}`,
      )
      setTimeout(() => {
        setSuccessMessage('')
        setErrorMessage('')
      }, 3000)
    } else {
      setErrorMessage(`Deleting the author with id ${id} failed`)
      setTimeout(() => {
        setSuccessMessage('')
        setErrorMessage('')
      }, 3000)
    }
  }

  return (
    <Container className="main-container">
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{fontWeight: "bold"}}>Name</TableCell>
            <TableCell align="center" sx={{fontWeight: "bold"}}>Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow
              key={category.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {category.name}
              </TableCell>
              <TableCell align="center">
                {!userToken ? (
                  <Link className="item_link" to={`/authors/authors-alert/`}>
                    <ReusedButton onClick={handleClick}>Update</ReusedButton>
                    <ReusedButton onClick={handleClick}>Delete</ReusedButton>
                  </Link>
                ) : (
                  <>
                    <Link className="item_link" to={`/genres/edit-genre/${category.id}`}>
                      <ReusedButton onClick={handleClick}>Update</ReusedButton>
                    </Link>
                    <ReusedButton
                    onClick={(e) => handleDeleteAuthor(e, category.id)}
                  >
                    Delete
                  </ReusedButton>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Notification
          successMessage={successMessage}
          errorMessage={errorMessage}
        />
    </Container>
  )
}

export default Genres
