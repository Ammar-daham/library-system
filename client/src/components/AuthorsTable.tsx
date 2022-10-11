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
  TableContainer,
  CircularProgress,
} from '@mui/material'

import '../App.css'
import { orange } from '@mui/material/colors'
import ColorButton from './Button'
import { useEffect, useState } from 'react'
import { fetchAuthors, removeAuthor } from 'redux/slices/authorSlice'
import { DecodedUser } from 'types'

const BookTable = () => {
  const dispatch = useDispatch<AppDispatch>()
  const  authors  = useSelector((state: RootState) => state.authors.authorList)

  const isAdmin = JSON.parse(localStorage.getItem('isAdmin') || '')
  console.log('IsAdmin: ', isAdmin)


  useEffect(() => {
    dispatch(fetchAuthors)
  }, [dispatch])

  
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
                {authors.map(
                  (author: any) => (
                    author._id &&
                      <TableRow key={author._id}>
                        <TableCell className='tableData'>{author.name}</TableCell>
                        <TableCell className='tableData'>{author.email}</TableCell>
                        <TableCell className='tableData'>
                          <ul style={{ paddingLeft: 15 }}>
                            {author.books.map(
                              (book: any) => (
                                <li key={book._id}>{book.title}</li>
                              ),
                            )}
                          </ul>
                        </TableCell>
                          {
                            isAdmin && author.books.length === 0 &&
                        <TableCell>
                          <ColorButton
                            onClick={() => {
                              dispatch(removeAuthor({id: author._id}))
                            }}
                            >
                            Remove
                          </ColorButton>   
                            </TableCell>
                          } 
                          {
                            author.books.length > 0 && 
                            <TableCell>
                              <ColorButton disabled>Remove</ColorButton>

                            </TableCell>
                          }
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
