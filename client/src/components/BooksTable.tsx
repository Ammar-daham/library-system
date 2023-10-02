import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { useDispatch } from 'react-redux'
import jwt_decode from 'jwt-decode'
import { Book } from '../types'

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
  styled,
  Dialog,
  DialogTitle,
  IconButton,
  DialogActions,
  DialogContent,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { orange } from '@mui/material/colors'
import ColorButton from './Button'
import {
  removeBook,
  booksFetch,
  updateBook,
} from 'redux/slices/bookSlice'
import { fetchAuthors } from 'redux/slices/authorSlice'
import { DecodedUser } from 'types'

import '../App.css'
import Search from './Search'
import { BootstrapDialog, BootstrapDialogTitle } from './UpdateBootstrapDialog'


const BookTable = () => {
  const dispatch = useDispatch<AppDispatch>()
  const booksState = useSelector((state: RootState) => state.books)
  const authors = useSelector((state: RootState) => state.authors.authorList)

  const isAdmin = JSON.parse(localStorage.getItem('isAdmin') || '')
  console.log('IsAdmin: ', isAdmin)

  const [book, setBook] = useState<Book>({
    _id: '',
    isbn: '',
    title: '',
    description: '',
    publisher: '',
    category: '',
    authors: [],
    cover: {
      small: '',
      large: ''
    },
    status: '',
    borrowerId: [],
    publishedDate: '',
    borrowDate: '',
    returnDate: '',
  })

  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const [author, setAuthor] = useState({
    _id: '',
  })

 

  const handleChange = (event: SelectChangeEvent) => {
    let value = event.target.value
    setAuthor({ ...author, _id: event.target.value as string })
    setBook({ ...book, authors: value.split(',') as any })
  }

  return (
    <Box>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Update Book Info
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container sx={{ textAlign: 'center' }}>
            <Grid item xs={6} className="addBookInput">
              <TextField
                id="isbn-input"
                name="isbn"
                label="ISBN"
                type="text"
                value={book.isbn}
                onChange={(e) => setBook({ ...book, isbn: e.target.value })}
              />
            </Grid>
            <Grid item xs={6} className="addInput">
              <TextField
                id="title-input"
                name="title"
                label="Title"
                type="text"
                value={book.title}
                onChange={(e) => setBook({ ...book, title: e.target.value })}
              />
            </Grid>
            <Grid item xs={6} className="addInput">
              <TextField
                id="description-input"
                name="description"
                label="Description"
                type="text"
                value={book.description}
                onChange={(e) =>
                  setBook({ ...book, description: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6} className="addInput">
              <TextField
                id="publisher-input"
                name="publisher"
                label="Publisher"
                type="text"
                value={book.publisher}
                onChange={(e) =>
                  setBook({ ...book, publisher: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6} className="addInput">
              <TextField
                id="category-input"
                name="category"
                label="Category"
                type="text"
                value={book.category}
                onChange={(e) => setBook({ ...book, category: e.target.value })}
              />
            </Grid>
            <Grid item xs={6} className="addInput">
              <TextField
                id="status-input"
                name="status"
                label="Status"
                type="text"
                value={book.status}
                onChange={(e) => setBook({ ...book, status: e.target.value })}
              />
            </Grid>
            <Grid item xs={6} className="addInput">
              <TextField
                sx={{ width: '200px' }}
                id="publishedDate-input"
                name="publishedDate"
                type="date"
                value={book.publishedDate}
                onChange={(e) =>
                  setBook({ ...book, publishedDate: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6} className="addInput">
              <Select
                value={author._id}
                label="Author-Name"
                onChange={handleChange}
                sx={{ width: '200px', background: 'wheat' }}
              >
                {authors.map((author) => (
                  <MenuItem key={author._id} value={author._id} sx={{ background: 'wheat' }}>
                    {author.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {/* <ColorButton
            autoFocus
            onClick={async () => {
              await dispatch(fetchAuthors())
              await dispatch(updateBook({ id: book._id, ...book }))
              await dispatch(booksFetch())
              setOpen(false)
            }}
          >
            Save changes
          </ColorButton> */}
        </DialogActions>
      </BootstrapDialog>

      <Grid container>
        <Grid item xs={12} className="search">
            <Search />
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
                    Publisher
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
                  { isAdmin && 
                  <TableCell
                    sx={{ backgroundColor: orange[500], color: 'white' }}
                  >
                    Authors
                  </TableCell>
                  }
                  {isAdmin && (
                    <TableCell
                      sx={{ backgroundColor: orange[500], color: 'white' }}
                    >
                      Borrower Name
                    </TableCell>
                  )}
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
                {booksState.bookList.map(
                  (book: any) =>
                    book._id && (
                      <TableRow key={book._id}>
                        <TableCell className="tableData">{book.isbn}</TableCell>
                        <TableCell className="tableData">
                          {book.title}
                        </TableCell>               
                        <TableCell className="tableData">
                          {book.publisher}
                        </TableCell>                     
                        <TableCell className="tableData">
                          {book.borrow_Date}
                        </TableCell>
                        <TableCell className="tableData">
                          {book.return_Date}
                        </TableCell>
                        <TableCell className="tableData">
                          {book.status}
                        </TableCell>
                        <TableCell className="tableData">
                          {book.category}
                        </TableCell>
                        {
                          isAdmin && 
                        <TableCell className="tableData">
                          <ul style={{ paddingLeft: 15 }}>
                            {book.authors.map((author: any) => (
                              <li key={author._id}>{author.name}</li>
                            ))}
                          </ul>
                        </TableCell>
                        }
                        {isAdmin && book.borrowerId &&
                        <TableCell className="tableData">
                            {book.borrowerId.map((user: any) => (
                                <p>{user.firstname}</p>                           
                            ))} 
                        </TableCell>
                        }
                        {
                          isAdmin && !book.borrowerId &&
                          <TableCell className="tableData">                   
                          </TableCell>

                        }
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
                        {/* {isAdmin && book.status === 'borrowed' && (
                          <TableCell>
                            <ColorButton disabled>Remove</ColorButton>
                          </TableCell>
                        )}
                        {isAdmin && (
                          <TableCell>
                            <ColorButton
                              onClick={() => {
                                setOpen(true)
                                setBook({ ...book })
                              }}
                            >
                              Update
                            </ColorButton>
                          </TableCell>
                        )} */}
                        {/* {!isAdmin && (
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
                                  console.log(decoded.userId)
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
                                  await dispatch(
                                    returnBook({
                                      id: book._id,
                                      borrowerId: null,                              
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
                        )} */}
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
