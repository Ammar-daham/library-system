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
      
      <Box sx={{ padding: 10 }}>
      <Container
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
        <Table stickyHeader aria-label="books" sx={{backgroundColor: 'rgba(255,255,255,0.13)'}}>
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
