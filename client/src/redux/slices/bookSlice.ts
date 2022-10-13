import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Book } from '../../types'
import { UserToken } from './token'


const url = `http://localhost:4000/api/v1/books/`
const borrowUrl = url + `status/borrowed/`
const returnUrl = url + `status/available/`

console.log(UserToken())

const config = {
  headers: {
    Authorization: `Bearer ${UserToken()}`,
  },
}

console.log(config)


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
      const response = await axios.post(url, book, config)
      console.log(response.data)
      return response.data
    } catch (error: any) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  },
);

export const updateBook = createAsyncThunk(
  'book/updateBook',
  async ({id, ...book}:any , { rejectWithValue }) => {
    try {
      const response = await axios.put(url + id , {...book}, config)
      console.log(response.data)
      return response.data
    } catch (error: any) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  },
);

export const borrowBook = createAsyncThunk(
  'book/borrowBook',
  async ({id, borrowerId, ...book }: any , { rejectWithValue }) => {
    console.log('updated book: ', borrowerId)
    try {
      const response = await axios.put(borrowUrl + id , { borrowerId, ...book }, config)
      console.log(response.data)
      return response.data
    } catch (error: any) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  },
);

export const returnBook = createAsyncThunk(
  'book/returnBook',
  async ({id, borrowerId, ...book}: any , { rejectWithValue }) => {
    try {
      console.log('pending')
      const response = await axios.put(returnUrl + id , {borrowerId, ...book}, config)
      console.log(response.data)
      return response.data
    } catch (error: any) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  },
);


export const removeBook = createAsyncThunk(
  'book/removeBook',
  async ({book:any,id}: any , { rejectWithValue }) => {
    try {
      const response = await axios.delete(url + id , config)
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
    builder.addCase(borrowBook.pending, (state) => {
      return {
        ...state,
        updateBook: 'pending',
      }
    })
    builder.addCase(borrowBook.fulfilled, (state, action) => {
      console.log('action: ', action)
      const {
        arg: { id }
      } = action.meta;
      if(id) {
        state.bookList = state.bookList.map((book) => book._id === id ? action.payload : book);
        state.updateBook = 'success'
      }
    })
    builder.addCase(borrowBook.rejected, (state, action) => {
      return {
        ...state,
        updateBook: 'rejected',
        updateError: action.payload,
      }
    })
    builder.addCase(returnBook.pending, (state) => {
      return {
        ...state,
        updateBook: 'pending',
      }
    })
    builder.addCase(returnBook.fulfilled, (state, action) => {
      console.log('action: ', action)
      const {
        arg: { id }
      } = action.meta;
      if(id) {
        state.bookList = state.bookList.map((book) => book._id === id ? action.payload : book);
        state.updateBook = 'success'
      }
    })
    builder.addCase(returnBook.rejected, (state, action) => {
      return {
        ...state,
        updateBook: 'rejected',
        updateError: action.payload,
      }
    })

    builder.addCase(updateBook.pending, (state) => {
      return {
        ...state,
        updateBook: 'pending',
      }
    })
    builder.addCase(updateBook.fulfilled, (state, action) => {
      console.log('action: ', action)
      const {
        arg: { id }
      } = action.meta;
      if(id) {
        state.bookList = state.bookList.map((book) => book._id === id ? action.payload : book);
        state.updateBook = 'success'
      }
    })
    builder.addCase(updateBook.rejected, (state, action) => {
      return {
        ...state,
        updateBook: 'rejected',
        updateError: action.payload,
      }
    })
    

    builder.addCase(booksFetch.pending, (state) => {
      return {
        ...state,
        getBooks: 'pending',
      }
    })
    builder.addCase(booksFetch.fulfilled, (state, action) => {
      return {
        ...state,
        bookList: action.payload.data,
        getBooks: 'success',
      }
    })
    builder.addCase(booksFetch.rejected, (state, action) => {
      return {
        ...state,
        getBooks: 'rejected',
        getError: action.payload,
      }
    })

    builder.addCase(addBook.pending, (state) => {
      return {
        ...state,
        addBook: 'pending',
      }
    })
    builder.addCase(addBook.fulfilled, (state, action) => {
      return {
        ...state,
        bookList: [...state.bookList, action.payload.data],
        addBook: 'success',
      }
    })
    builder.addCase(addBook.rejected, (state, action) => {
      return {
        ...state,
        addBook: 'rejected',
        addError: action.payload,
      }
    })

    builder.addCase(removeBook.pending, (state) => {
      return {
        ...state,
        deleteBook: 'pending'
      }
    })
    builder.addCase(removeBook.fulfilled, (state, action) => {
      console.log('action: ', action)
      const {
        arg: { id }
      } = action.meta;
      if(id) {
        state.bookList = state.bookList.map((book) => book._id === id ? action.payload : book);
        state.deleteBook = 'success'
      }
    })
    builder.addCase(removeBook.rejected, (state, action) => {
      return {
        ...state,
        deleteBook: 'rejected',
        deleteError: action.payload,
      }
    })
  
}
})

export default bookSlice.reducer
