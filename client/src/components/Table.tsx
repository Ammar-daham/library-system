import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { booksFetch } from 'redux/slices/bookSlice'
import { AppDispatch, RootState } from '../redux/store'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Box,
} from '@mui/material'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'

export const BooksTable = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { books } = useSelector((state: RootState) => state)

    
    
    {/* <Link to={`/country/${country.name.common}`}> */}

    useEffect(() => {
        dispatch(booksFetch())
      }, [dispatch])

  return (
    <Box sx={{ padding: 15 }} >
      <Table stickyHeader aria-label="books">
        <TableHead>
          <TableRow>
            <TableCell >ISBN</TableCell>
            <TableCell >
              Title
            </TableCell>
            <TableCell>
              Description
            </TableCell>
            <TableCell>Published Date</TableCell>
            <TableCell>
              Borrow Date
            </TableCell>
            <TableCell>
                Return Date
            </TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {books.items.map((book) => (
            <TableRow key={book._id}>
              <TableCell sx={{ fontSize: 50 }}>
                  {book.isbn}
              </TableCell>
              <TableCell>
                  {book.title}
              </TableCell>
              <TableCell>
                {book.description}
              </TableCell>
              <TableCell>{book.publishedDate}</TableCell>
              <TableCell>
                {book.borrowDate}
              </TableCell>
              <TableCell>{book.returnDate}</TableCell>
              <TableCell>{book.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}
