import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  TableContainer,
} from '@mui/material'

import '../App.css'
import { orange } from '@mui/material/colors'

 const BookTable = () => {
  const { books } = useSelector((state: RootState) => state)

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
                  <TableCell sx={{backgroundColor: orange[500], color: 'white'}}>Published Date</TableCell>
                  <TableCell sx={{backgroundColor: orange[500], color: 'white'}}>Borrow Date</TableCell>
                  <TableCell sx={{backgroundColor: orange[500], color: 'white'}}>Return Date</TableCell>
                  <TableCell sx={{backgroundColor: orange[500], color: 'white'}}>Status</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {books.bookList.map((book: any) => (
                  <TableRow key={book._id}>
                    <TableCell >{book.isbn}</TableCell>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.description}</TableCell>
                    <TableCell>{book.publishedDate}</TableCell>
                    <TableCell>{book.borrowDate}</TableCell>
                    <TableCell>{book.returnDate}</TableCell>
                    <TableCell>{book.status}</TableCell>
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