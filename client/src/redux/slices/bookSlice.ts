import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Book } from '../../types'
import { config } from './token'
import { CustomError } from '../../types'


//const url = `/api/v1/books/`
const url = `http://localhost:4000/api/v1/books/`
const borrowUrl = url + `status/borrowed/`
const returnUrl = url + `status/available/`

interface BooksState {
  bookList: Book[]
  addBook: string
  addError: CustomError | null
  getBooks: string
  getError: CustomError | null
  message: string
  updateError: CustomError | null
  deleteBook: string
  deleteError: CustomError | null
  updateBook: string
}

const initialState: BooksState = {
  bookList: [],
  addBook: '',
  addError: null, 
  getBooks: '',
  getError: null, 
  message: '',
  updateError: null, 
  deleteBook: '',
  deleteError: null,
  updateBook: '', 
}

export const booksFetch = createAsyncThunk(
  'books/fetchBooks', async (arg, { rejectWithValue }) => {
    try {
      const response = await axios.get(url, config())
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
  async (book: Book, { rejectWithValue }) => {
    try {
      const response = await axios.post(url, book, config())
      return response.data
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({
          code: 500,
          message: 'An unexpected error occurred.',
        });
      }
    }
  },
);

export const updateBook = createAsyncThunk(
  'book/updateBook',
  async ({ id, ...book }: any, { rejectWithValue }) => {
    if (!id || !book) {
      throw new Error('Invalid request. Both id and book are required.');
    }
    try {
      const response = await axios.put(url + id, {...book}, config());
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({
          code: 500,
          message: 'An unexpected error occurred.',
        });
      }
    }
  }
);

export const borrowBook = createAsyncThunk(
  'book/borrowBook',
  async ({id, borrowerId }: any , { rejectWithValue }) => {
    try {
      const response = await axios.put(borrowUrl + id , {borrowerId}, config())
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
  async ({id, borrowerId }: any , { rejectWithValue }) => {
    try {
      const response = await axios.put(returnUrl + id , {borrowerId}, config())
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
  async (id: any , { rejectWithValue }) => {
    try {
      const response = await axios.delete(url + id , config())
      console.log(response.data)
      return response.data
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({
          code: 500,
          message: 'An unexpected error occurred.',
        });
      }
    }
  },
);


export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // builder.addCase(borrowBook.pending, (state) => {
    //   return {
    //     ...state,
    //     updateBook: 'pending',
    //   }
    // })
    // builder.addCase(borrowBook.fulfilled, (state, action) => {
    //   console.log('action: ', action)
    //   const {
    //     arg: { id }
    //   } = action.meta;
    //   if(id) {
    //     state.bookList = state.bookList.map((book) => book.id === id ? action.payload : book);
    //     state.message = 'Thank you, you have successfully edited the book'
    //   }
    // })
    // builder.addCase(borrowBook.rejected, (state, action) => {
    //   return {
    //     ...state,
    //     updateBook: 'rejected',
    //     updateError: action.payload,
    //   }
    // })
    // builder.addCase(returnBook.pending, (state) => {
    //   return {
    //     ...state,
    //     updateBook: 'pending',
    //   }
    // })
    // builder.addCase(returnBook.fulfilled, (state, action) => {
    //   console.log('action: ', action)
    //   const {
    //     arg: { id }
    //   } = action.meta;
    //   if(id) {
    //     state.bookList = state.bookList.map((book) => book.id === id ? action.payload : book);
    //     state.message = 'success'
    //   }
    // })
    // builder.addCase(returnBook.rejected, (state, action) => {
    //   return {
    //     ...state,
    //     updateBook: 'rejected',
    //     updateError: action.payload,
    //   }
    // })

    builder.addCase(updateBook.pending, (state) => {
      return {
        ...state,
        updateBook: 'pending',
      }
    })
    builder.addCase(updateBook.fulfilled, (state, action) => {
      const {
        arg: { id }
      } = action.meta;
      if(id) {
        state.bookList = state.bookList.map((book) => book.id === id ? action.payload : book);
        state.message = 'Thank you, you have successfully edited the book';
        state.updateBook = 'success'
      }
    })
    builder.addCase(updateBook.rejected, (state, action) => {
      state.updateError = action.payload as CustomError;
      state.updateBook = 'rejected';
    })

    builder.addCase(addBook.pending, (state) => {
      return {
        ...state,
        addBook: 'pending',
      }
    })
    builder.addCase(addBook.fulfilled, (state, action) => {
        state.bookList = [...state.bookList, action.payload.data]
        state.message = 'Thank you, you have successfully added new book'
        state.addBook = 'success'
    })
    
    builder.addCase(addBook.rejected, (state, action) => {
      state.addError = action.payload as CustomError;
      state.addBook = 'rejected'
    })

    builder.addCase(booksFetch.pending, (state) => {
      return {
        ...state,
        getBooks: 'pending'
      }
  })
  builder.addCase(booksFetch.fulfilled, (state, action) => {
    state.getBooks = 'success';
    state.bookList = action.payload.data;
  })
  builder.addCase(booksFetch.rejected, (state, action) => {
    state.getBooks = 'rejected';
    state.getError = action.payload as CustomError;
  });

   builder.addCase(removeBook.pending, (state) => {
      return {
        ...state,
        deleteBook: 'pending'
      }
    })
    builder.addCase(removeBook.fulfilled, (state, action) => {
      const {
        arg: { id }
      } = action.meta;
      if(id) {
        state.bookList = state.bookList.map((book) => book.id === id ? action.payload : book);
        state.message = 'Thank you, you have successfully deleted book';
        state.deleteBook = 'success'
      }
    })
    builder.addCase(removeBook.rejected, (state, action) => {
      state.deleteError = action.payload as CustomError;
      state.deleteBook = 'rejected';
    })
}
})

export default bookSlice.reducer
