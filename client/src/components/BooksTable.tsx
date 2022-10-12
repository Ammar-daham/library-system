import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { useDispatch } from 'react-redux'
import jwt_decode from 'jwt-decode'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Grid,
  TextField,
  TableContainer,
} from '@mui/material'

import '../App.css'
import { orange } from '@mui/material/colors'
import ColorButton from './Button'
import { useEffect, useState } from 'react'
import {
  borrowBook,
  returnBook,
  removeBook,
  booksFetch,
} from 'redux/slices/bookSlice'
import { DecodedUser } from 'types'

import '../App.css'

const BookTable = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { books } = useSelector((state: RootState) => state)

  const isAdmin = JSON.parse(localStorage.getItem('isAdmin') || '')
  console.log('IsAdmin: ', isAdmin)

  const [book, setBook] = useState({
    id: '',
    isbn: '',
    title: '',
    description: '',
    authors: [],
    status: '',
    borrowerId: '',
    published_Date: '',
    borrow_Date: '',
    return_Date: '',
  })

  console.log('book: ', book)
  const userToken = localStorage.getItem('userToken') || ''
  const decoded = jwt_decode(userToken) as DecodedUser

  useEffect(() => {
    dispatch(booksFetch)
  }, [dispatch])

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} className="search">
          <TextField id="title-input" name="title" label="TITLE" type="text" />
          <TextField
            id="status-input"
            name="status"
            label="STATUS"
            type="text"
          />
        </Grid>

        <Grid item xs={12}>
          <TableContainer className="tableContainer">
            <Table className="table" stickyHeader aria-label="books">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ backgroundColor: orange[500], color: 'white' }}
                  >
                    ISBN
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: orange[500], color: 'white' }}
                  >
                    Title
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: orange[500], color: 'white' }}
                  >
                    Description
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: orange[500], color: 'white' }}
                  >
                    Publisher
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: orange[500], color: 'white' }}
                  >
                    Published Date
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: orange[500], color: 'white' }}
                  >
                    Borrow Date
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: orange[500], color: 'white' }}
                  >
                    Return Date
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: orange[500], color: 'white' }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: orange[500], color: 'white' }}
                  >
                    Category
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: orange[500], color: 'white' }}
                  >
                    Authors
                  </TableCell>
                  {isAdmin && (
                    <TableCell
                      sx={{ backgroundColor: orange[500], color: 'white' }}
                    >
                      Remove
                    </TableCell>
                  )}
                  {isAdmin && (
                    <TableCell
                      sx={{ backgroundColor: orange[500], color: 'white' }}
                    >
                      Update
                    </TableCell>
                  )}
                  {!isAdmin && (
                    <TableCell
                      sx={{ backgroundColor: orange[500], color: 'white' }}
                    >
                      Borrow
                    </TableCell>
                  )}
                  {!isAdmin && (
                    <TableCell
                      sx={{ backgroundColor: orange[500], color: 'white' }}
                    >
                      Return
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>

              <TableBody>
                {books.bookList.map(
                  (book: any) =>
                    book._id && (
                      <TableRow key={book._id}>
                        <TableCell className='tableData'>{book.isbn}</TableCell>
                        <TableCell className='tableData'>{book.title}</TableCell>
                        <TableCell className='tableData'>{book.description}</TableCell>
                        <TableCell className='tableData'>{book.publisher}</TableCell>
                        <TableCell className='tableData'>{book.published_Date}</TableCell>
                        <TableCell className='tableData'>{book.borrow_Date}</TableCell>
                        <TableCell className='tableData'>{book.return_Date}</TableCell>
                        <TableCell className='tableData'>{book.status}</TableCell>
                        <TableCell className='tableData'>{book.category}</TableCell>
                        <TableCell className='tableData'>
                          <ul style={{ paddingLeft: 15 }}>
                            {book.authors.map((author: any) => (
                              <li key={author._id}>{author.name}</li>
                            ))}
                          </ul>
                        </TableCell>
                        {isAdmin && book.status !== 'borrowed' && (
                          <TableCell>
                            <ColorButton
                              onClick={() => {
                                dispatch(removeBook({ id: book._id }))
                              }}
                            >
                              Remove
                            </ColorButton>
                          </TableCell>
                        )}
                        {isAdmin && book.status === 'borrowed' && (
                          <TableCell>
                            <ColorButton disabled>Remove</ColorButton>
                          </TableCell>
                        )}
                        {isAdmin && (
                          <TableCell>
                            <ColorButton>Update</ColorButton>
                          </TableCell>
                        )}
                        {!isAdmin && (
                          <TableCell>
                            {book.status === 'borrowed' && (
                              <ColorButton disabled>Borrow</ColorButton>
                            )}
                            {book.status === 'available' && (
                              <ColorButton
                                onClick={async () => {
                                  setBook({
                                    ...book,
                                    borrowerId: decoded.userId,
                                  })
                                  await dispatch(
                                    borrowBook({
                                      id: book._id,
                                      borrowerId: decoded.userId,
                                    }),
                                  )
                                }}
                              >
                                Borrow
                              </ColorButton>
                            )}
                          </TableCell>
                        )}
                        {!isAdmin && (
                          <TableCell>
                            {book.status === 'borrowed' && (
                              <ColorButton
                                onClick={async () => {
                                  setBook({
                                    ...book,
                                    borrowerId: decoded.userId,
                                  })
                                  await dispatch(
                                    returnBook({
                                      id: book._id,
                                      borrowerId: book.borrowerId,
                                    }),
                                  )
                                }}
                              >
                                Return
                              </ColorButton>
                            )}
                            {book.status === 'available' && (
                              <ColorButton disabled>Return</ColorButton>
                            )}
                          </TableCell>
                        )}
                      </TableRow>
                    ),
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  )
}

export default BookTable
