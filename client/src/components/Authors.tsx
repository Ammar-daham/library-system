import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { AuthorsProps } from 'types'
import { Container } from '@mui/material'
import ReusedButton from './Button'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'redux/store'
import { removeAuthor, fetchAuthors } from 'redux/slices/authorSlice'
import Notification from './Notifications'

const Authors: React.FC<AuthorsProps> = ({
  authors,
  successMessage,
  errorMessage,
  setSuccessMessage,
  setErrorMessage,
}) => {
  const userToken = localStorage.getItem('userToken')
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state.authors)

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
    <Container className="author-form-container">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Update</TableCell>
            <TableCell align="right">Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {authors.map((author) => (
            <TableRow
              key={author.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {author.name}
              </TableCell>
              <TableCell align="right">{author.email}</TableCell>
              <TableCell align="right">
                {!userToken ? (
                  <Link className="item_link" to={`/books/alert/`}>
                    <ReusedButton onClick={handleClick}>Update</ReusedButton>
                  </Link>
                ) : (
                  <Link className="item_link" to={`/books/alert/`}>
                    <ReusedButton onClick={handleClick}>Update</ReusedButton>
                  </Link>
                )}
              </TableCell>
              <TableCell align="right">
                {!userToken ? (
                  <Link className="item_link" to={`/books/alert/`}>
                    <ReusedButton onClick={handleClick}>Delete</ReusedButton>
                  </Link>
                ) : (
                  <ReusedButton
                    onClick={(e) => handleDeleteAuthor(e, author.id)}
                  >
                    Delete
                  </ReusedButton>
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

export default Authors
