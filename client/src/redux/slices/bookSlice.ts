import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Book } from '../../types'

const url = `http://localhost:4000/api/v1/books`

export interface booksState {
  bookList: Book[]
  addBook: string
  addError: string
  getBooks: string
  getError: string
  updateBook: string
  updateError: string
  deleteBook: string
  deleteError: string

  isLoading: boolean
}

const initialState: booksState = {
  bookList: [],
  addBook: '',
  addError: '',
  getBooks: '',
  getError: '',
  updateBook: '',
  updateError: '',
  deleteBook: '',
  deleteError: '',

  isLoading: false,
}

export const booksFetch = createAsyncThunk('books/fetchBooks', async () => {
  const response = await axios.get(url)
  console.log(response.data)
  return {
    data: response.data,
    status: response.status,
  }
})

export const addBook = createAsyncThunk(
  'books/bookAdd',
  async (book: unknown, { rejectWithValue }) => {
    try {
      const response = await axios.post(url, book)
      console.log(response.data)
      return response.data
    } catch (error: any) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  },
);


export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(booksFetch.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(booksFetch.fulfilled, (state, action) => {
      state.bookList = action.payload.data
      state.isLoading = false
    })
    builder.addCase(booksFetch.rejected, (state) => {
      console.log('Something went wrong')
      state.isLoading = false
    })

    builder.addCase(addBook.pending, (state) => {
      return {
        ...state,
        addBook: 'pending',
        addError: '',
        getBooks: '',
        getError: '',
        updateBook: '',
        updateError: '',
        deleteBook: '',
        deleteError: '',
      }
    })
    builder.addCase(addBook.fulfilled, (state, action) => {
      return {
        ...state,
        books: [...state.bookList, action.payload.data],
        addBook: 'success',
        addError: '',
        getBooks: '',
        getError: '',
        updateBook: '',
        updateError: '',
        deleteBook: '',
        deleteError: '',
      }
    })
    builder.addCase(addBook.rejected, (state, action) => {
      return {
        ...state,
        addBook: 'rejected',
        addError: 'action.payload',
        getBooks: '',
        getError: '',
        updateBook: '',
        updateError: '',
        deleteBook: '',
        deleteError: '',
      }
    })
  },
})

export default bookSlice.reducer
