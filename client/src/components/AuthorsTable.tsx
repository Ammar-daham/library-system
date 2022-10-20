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
  styled,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  TextField,
  DialogActions,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { orange } from '@mui/material/colors'

import ColorButton from './Button'
import { useEffect, useState } from 'react'
import { fetchAuthors, removeAuthor, updateAuthor } from 'redux/slices/authorSlice'
import { DecodedUser } from 'types'
import '../App.css'
import { booksFetch } from 'redux/slices/bookSlice'



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    background: 'wheat',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
    background: 'wheat',
  },
}))

export interface DialogTitleProps {
  id: string
  children?: React.ReactNode
  onClose: () => void
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle
      sx={{ m: 0, p: 2, backgroundColor: orange[500], color: 'white' }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}


const AuthorTable = () => {
  const dispatch = useDispatch<AppDispatch>()
  const  authors  = useSelector((state: RootState) => state.authors.authorList)

  const { books } = useSelector((state: RootState) => state)

  const [author, setAuthor] = useState({
    _id: '',
    name: '',
    email: '',
    books: [],
  })

  const [book, setBook] = useState({
    _id: '',
  })

  const isAdmin = JSON.parse(localStorage.getItem('isAdmin') || '')
  console.log('IsAdmin: ', isAdmin)


  useEffect(() => {
    dispatch(fetchAuthors)
  }, [dispatch])

  
  const userToken = localStorage.getItem('userToken') || ''
  const decoded = jwt_decode(userToken) as DecodedUser


  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (event: SelectChangeEvent) => {
    let value = event.target.value
    setBook({...book, _id: event.target.value as string })
    setAuthor({...author, books: value.split(',') as any})
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
          
          <Grid item xs={12} className="addInput">
            <TextField
              id="name-input"
              name="name"
              label="Name"
              type="text"
              value={author.name}
              onChange={(e) => setAuthor({ ...author, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} className="addInput">
            <TextField
              id="email-input"
              name="email"
              label="Email"
              type="text"
              value={author.email}
              onChange={(e) => setAuthor({ ...author, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} className="addInput">
            <Select
              sx={{width: '200px'}}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={book._id}
              label="Title"
              onChange={handleChange}
            >
              { 
              books.bookList.map((book) => (
                <MenuItem 
                    key={book._id}
                    value={book._id}
                >
                    {book.title}
                </MenuItem>
              ))}
            </Select>
          </Grid>             
          </Grid>
        </DialogContent>
        <DialogActions>
          <ColorButton
            autoFocus
            onClick={async () => {
              await dispatch(booksFetch())
              await dispatch(updateAuthor({ id: author._id, ...author }))
              await dispatch(fetchAuthors())
              setOpen(false)
            }}
          >
            Save changes
          </ColorButton>
        </DialogActions>
      </BootstrapDialog>
      <Grid container sx={{padding: '20px 100px'}}>
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
                          <ColorButton 
                            onClick={() => {
                              setOpen(true)
                              setAuthor({ ...author })
                            }}
                          >Update</ColorButton>
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

export default AuthorTable
