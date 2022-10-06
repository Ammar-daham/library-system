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
import { borrowBook, returnBook } from 'redux/slices/bookSlice'
import { DecodedUser } from 'types'

 const BookTable = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { books } = useSelector((state: RootState) => state)

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

  // const handleBorrow = async () => {
  //   setBook({ ...book, borrowerId: decoded.userId })
  //   console.log('decodedUser: ', decoded)
  //   await dispatch(borrowBook(book))
  // }
  

  return (
      <Box>
        <Grid container>
          <Grid item xs={12} className='search'>
              <TextField
                id="title-input"
                name="title"
                label="TITLE"
                type="text"
              />
              <TextField
                id="status-input"
                name="status"
                label="STATUS"
                type="text"
              />
          </Grid>

          <Grid item xs={12}>
          <TableContainer style={{ maxHeight: '750px' }}>
            <Table
              className='table'
              stickyHeader
              aria-label="books"
            >
              <TableHead >
                <TableRow >
                  <TableCell sx={{backgroundColor: orange[500], color: 'white'}}>ISBN</TableCell>
                  <TableCell sx={{backgroundColor: orange[500], color: 'white'}}>Title</TableCell>
                  <TableCell sx={{backgroundColor: orange[500], color: 'white'}}>Description</TableCell>
                  <TableCell sx={{backgroundColor: orange[500], color: 'white'}}>Publisher</TableCell>
                  <TableCell sx={{backgroundColor: orange[500], color: 'white'}}>Published Date</TableCell>
                  <TableCell sx={{backgroundColor: orange[500], color: 'white'}}>Borrow Date</TableCell>
                  <TableCell sx={{backgroundColor: orange[500], color: 'white'}}>Return Date</TableCell>
                  <TableCell sx={{backgroundColor: orange[500], color: 'white'}}>Status</TableCell>
                  <TableCell sx={{backgroundColor: orange[500], color: 'white'}}>Category</TableCell>
                  <TableCell sx={{backgroundColor: orange[500], color: 'white'}}>Borrow</TableCell>
                  <TableCell sx={{backgroundColor: orange[500], color: 'white'}}>Return</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {books.bookList.map((book: any) =>  (
                  <TableRow key={book._id}>
                    <TableCell >{book._id}</TableCell>
                    <TableCell >{book.isbn}</TableCell>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.description}</TableCell>
                    <TableCell>{book.Publisher}</TableCell>
                    <TableCell>{book.publishedDate}</TableCell>
                    <TableCell>{book.borrowDate}</TableCell>
                    <TableCell>{book.returnDate}</TableCell>
                    <TableCell>{book.status}</TableCell>
                    <TableCell>{book.category}</TableCell>
                    <TableCell>
                      { book.status === 'borrowed' &&
                        <ColorButton disabled>Borrow</ColorButton>
                      }
                      {
                        book.status === 'available' &&
                        <ColorButton onClick={ async () => {
                          setBook({
                            ...book,
                            borrowerId: decoded.userId, 
                          })
                          await dispatch(borrowBook({id: book._id , borrowerId: decoded.userId}))
                        }}>Borrow</ColorButton>
                      }
                    </TableCell>
                    <TableCell>
                      {
                       book.status === 'borrowed' &&
                      <ColorButton onClick={ async () => {
                        setBook({
                          ...book,
                          borrowerId: decoded.userId, 
                        })
                        await dispatch(returnBook({id: book._id , borrowerId: book.borrowerId}))
                      }}>Return</ColorButton>
                      }
                      {
                       book.status === 'available' &&
                      <ColorButton disabled>Return</ColorButton>
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </TableContainer>
          </Grid>
        </Grid>
        {/* <Container
        sx={{
            textAlign: 'center',
            padding: '50px',
            backgroundColor: 'rgba(255,255,255,0.13)',
            width: '100%',
            borderRadius: '10px',
            backdropFilter: 'blur(100px)',
            border: '2px solid rgba(255,255,255,0.1)',
            boxShadow: '0 0 40px rgba(8,7,16,0.6)',
            opacity: '0.8',
            color:'white',
          }}
      > */}
      </Box>

  )
}

export default BookTable