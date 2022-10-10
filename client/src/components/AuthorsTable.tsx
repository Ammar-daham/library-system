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
import { useState } from 'react'
import { fetchAuthors } from 'redux/slices/authorSlice'
import { DecodedUser } from 'types'

const BookTable = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { authors } = useSelector((state: RootState) => state)

  const isAdmin = JSON.parse(localStorage.getItem('isAdmin') || '')
  console.log('IsAdmin: ', isAdmin)

  // const [book, setBook] = useState({
  //   id: '',
  //   isbn: '',
  //   title: '',
  //   description: '',
  //   authors: [],
  //   status: '',
  //   borrowerId: '',
  //   published_Date: '',
  //   borrow_Date: '',
  //   return_Date: '',
  // })

  // console.log('book: ', book)
  const userToken = localStorage.getItem('userToken') || ''
  const decoded = jwt_decode(userToken) as DecodedUser

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <TableContainer className="tableContainer">
            <Table className="table" stickyHeader aria-label="books">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ backgroundColor: orange[500], color: 'white' }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: orange[500], color: 'white' }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: orange[500], color: 'white' }}
                  >
                    Books
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: orange[500], color: 'white' }}
                  >
                    Delete
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: orange[500], color: 'white' }}
                  >
                    Update
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {authors.authorList.map(
                  (author) =>
                    author._id && (
                      <TableRow key={author._id}>
                        <TableCell>{author.name}</TableCell>
                        <TableCell>{author.email}</TableCell>
                        <TableCell>
                          <ul style={{ paddingLeft: 15 }}>
                           
                            {author.books.map(
                              (book: any) => (
                                <li key={book}>{book.title}</li>
                              ),
                            )}
                          </ul>
                        </TableCell>
                        {/* <TableCell>{author.books}</TableCell> */}
                        <TableCell>
                          <ColorButton>Remove</ColorButton>
                        </TableCell>
                        <TableCell>
                          <ColorButton>Update</ColorButton>
                        </TableCell>
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
