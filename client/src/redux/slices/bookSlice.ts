import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Book } from '../../types'
import { config } from './token'
import { CustomError } from '../../types'


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
  updateBook: string, 
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

export const fetchBookByStatus = createAsyncThunk(
  'books/fetchBookByTitle', async (status: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(url + 'status/' + status , config())
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

export const fetchBookByCategory = createAsyncThunk(
  'books/fetchBookByCategory', async (category: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(url + 'category/' + category , config())
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

export const fetchBookByTitle = createAsyncThunk(
  'books/fetchBookByStatus', async (title: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(url + 'title/' + title , config())
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

export const fetchBookByIsbn = createAsyncThunk(
  'books/fetchBookByIsbn', async (isbn: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(url + 'isbn/' + isbn , config())
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
  async (book: Book, { rejectWithValue }) => {
    try {
      const response = await axios.post(url, book, config())
      console.log(response.data)
      return response.data
    } catch (error: any) {
      console.log(error)
      return  
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
    //console.log('updated book: ', borrowerId)
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
      console.log('pending')
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
  async ({book:any,id}: any , { rejectWithValue }) => {
    try {
      const response = await axios.delete(url + id , config())
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

    builder.addCase(booksFetch.pending, (state) => {
    state.getBooks = 'pending';
  })
  .addCase(booksFetch.fulfilled, (state, action) => {
    state.getBooks = 'success';
    state.bookList = action.payload.data;
  })
  .addCase(booksFetch.rejected, (state, action) => {
    state.getBooks = 'rejected';
    state.getError = action.payload as CustomError;
  });

    // builder.addCase(fetchBookByIsbn.pending, (state) => {
    //   return {
    //     ...state,
    //     getBooks: 'pending',
    //   }
    // })
    // builder.addCase(fetchBookByIsbn.fulfilled, (state, action) => {
    //   return {
    //     ...state,
    //     bookList: action.payload.data,
    //     getBooks: 'success',
    //   }
    // })
    // builder.addCase(fetchBookByIsbn.rejected, (state, action) => {
    //   return {
    //     ...state,
    //     getBooks: 'rejected',
    //     getError: action.payload,
    //   }
    // })

    // builder.addCase(fetchBookByStatus.pending, (state) => {
    //   return {
    //     ...state,
    //     getBooks: 'pending',
    //   }
    // })
    // builder.addCase(fetchBookByStatus.fulfilled, (state, action) => {
    //   return {
    //     ...state,
    //     bookList: action.payload.data,
    //     getBooks: 'success',
    //   }
    // })
    // builder.addCase(fetchBookByStatus.rejected, (state, action) => {
    //   return {
    //     ...state,
    //     getBooks: 'rejected',
    //     getError: action.payload,
    //   }
    // })

    // builder.addCase(fetchBookByCategory.pending, (state) => {
    //   return {
    //     ...state,
    //     getBooks: 'pending',
    //   }
    // })
    // builder.addCase(fetchBookByCategory.fulfilled, (state, action) => {
    //   return {
    //     ...state,
    //     bookList: action.payload.data,
    //     getBooks: 'success',
    //   }
    // })
    // builder.addCase(fetchBookByCategory.rejected, (state, action) => {
    //   return {
    //     ...state,
    //     getBooks: 'rejected',
    //     getError: action.payload,
    //   }
    // })

    // builder.addCase(fetchBookByTitle.pending, (state) => {
    //   return {
    //     ...state,
    //     getBooks: 'pending',
    //   }
    // })
    // builder.addCase(fetchBookByTitle.fulfilled, (state, action) => {
    //   return {
    //     ...state,
    //     bookList: action.payload.data,
    //     getBooks: 'success',
    //   }
    // })
    // builder.addCase(fetchBookByTitle.rejected, (state, action) => {
    //   return {
    //     ...state,
    //     getBooks: 'rejected',
    //     getError: action.payload,
    //   }
    // })

    // builder.addCase(addBook.pending, (state) => {
    //   return {
    //     ...state,
    //     addBook: 'pending',
    //   }
    // })
    // builder.addCase(addBook.fulfilled, (state, action) => {
    //   return {
    //     ...state,
    //     bookList: [...state.bookList, action.payload.data],
    //     addBook: 'success',
    //   }
    // })
    // builder.addCase(addBook.rejected, (state, action) => {
    //   return {
    //     ...state,
    //     addBook: 'rejected',
    //     addError: action.payload,
    //   }
    // })

    // builder.addCase(removeBook.pending, (state) => {
    //   return {
    //     ...state,
    //     deleteBook: 'pending'
    //   }
    // })
    // builder.addCase(removeBook.fulfilled, (state, action) => {
    //   console.log('action: ', action)
    //   const {
    //     arg: { id }
    //   } = action.meta;
    //   if(id) {
    //     state.bookList = state.bookList.map((book) => book.id === id ? action.payload : book);
    //     state.deleteBook = 'success'
    //   }
    // })
    // builder.addCase(removeBook.rejected, (state, action) => {
    //   return {
    //     ...state,
    //     deleteBook: 'rejected',
    //     deleteError: action.payload,
    //   }
    // })
  
}
})

export default bookSlice.reducer
