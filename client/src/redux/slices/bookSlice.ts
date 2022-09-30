import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Action } from '@remix-run/router'
import axios from 'axios'
import { Book } from '../../types'


const url = `http://localhost:4000/api/v1/books`

const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  }

export interface booksState {
  bookList: Book[]
  addBook: string
  addError: any
  getBooks: string
  getError: any
  updateBook: string
  updateError: any
  deleteBook: string
  deleteError: any
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
}

export const booksFetch = createAsyncThunk(
  'books/fetchBooks', async (arg, { rejectWithValue }) => {
    try {
      const response = await axios.get(url, config)
      console.log(response.data)
      return {
        data: response.data,
        status: response.status,
      }
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

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
      return {
        ...state,
        addBook: '',
        addError: '',
        getBooks: 'pending',
        getError: '',
        updateBook: '',
        updateError: '',
        deleteBook: '',
        deleteError: '',
      }
    })
    builder.addCase(booksFetch.fulfilled, (state, action) => {
      return {
        ...state,
        bookList: action.payload.data,
        addBook: '',
        addError: '',
        getBooks: 'success',
        getError: '',
        updateBook: '',
        updateError: '',
        deleteBook: '',
        deleteError: '',
      }
    })
    builder.addCase(booksFetch.rejected, (state, action) => {
      return {
        ...state,
        addBook: '',
        addError: '',
        getBooks: 'rejected',
        getError: action.payload,
        updateBook: '',
        updateError: '',
        deleteBook: '',
        deleteError: '',
      }
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
        bookList: [...state.bookList, action.payload.data],
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
