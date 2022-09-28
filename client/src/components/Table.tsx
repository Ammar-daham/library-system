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
} from '@mui/material'

export const BooksTable = () => {
  const { books } = useSelector((state: RootState) => state)

  return (
    <>
      
      <Box sx={{ padding: 15 }}>
      <Container
        sx={{ backgroundColor: '#ff9800', opacity: '0.8', color:'white', textAlign: 'center', padding: '50px'}}
      >
        <Typography variant="h6">Search By</Typography>
        <Grid container>
          <Grid item xs={6}>
            <TextField
              id="title-input"
              name="title"
              label="TITLE"
              type="text"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="status-input"
              name="status"
              label="STATUS"
              type="text"
            />
          </Grid>
        </Grid>
      </Container>
        <Table stickyHeader aria-label="books">
          <TableHead>
            <TableRow>
              <TableCell>ISBN</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Published Date</TableCell>
              <TableCell>Borrow Date</TableCell>
              <TableCell>Return Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {books.bookList.map((book: any) => (
              <TableRow key={book._id}>
                <TableCell sx={{ fontSize: 50 }}>{book.isbn}</TableCell>
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
      </Box>
    </>
  )
}
