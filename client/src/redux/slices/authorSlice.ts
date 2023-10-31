import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Author, CustomError } from '../../types'
import { config } from './token'


const url = `http://localhost:4000/api/v1/authors/`


export interface authorsState {
    authorList: Author[]
    addAuthor: string
    addError: CustomError | null
    getAuthors: string
    getError: CustomError | null
    updateAuthor: string
    updateError: CustomError | null
    deleteAuthor: string
    deleteError: CustomError | null
    message: string
  }

const initialState: authorsState = {
    authorList: [],
    addAuthor: '',
    addError: null,
    getAuthors: '',
    getError: null,
    updateAuthor: '',
    updateError: null,
    deleteAuthor: '',
    deleteError: null,
    message: '',
}


export const fetchAuthors = createAsyncThunk(
    'authors/fetchAuthors', async (arg, { rejectWithValue }) => {
      try {
        const response = await axios.get(url, config())
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

  export const addAuthor = createAsyncThunk(
    'authors/addAuthor',
    async (author: Author, { rejectWithValue }) => {
      try {
        const response = await axios.post(url, author, config())
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

  export const removeAuthor = createAsyncThunk(
    'author/removeAuthor',
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

  export const updateAuthor = createAsyncThunk(
    'author/updateAuthor',
    async ({id, ...author}: any , { rejectWithValue }) => {
      try {
        const response = await axios.put(url + id , {...author}, config())
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


export const authorSlice = createSlice({
name: 'authors',
initialState,
reducers: {},

extraReducers: (builder) => {
    builder.addCase(fetchAuthors.pending, (state) => {
        return {
        ...state,
        getAuthors: 'pending',
        }
    })
    builder.addCase(fetchAuthors.fulfilled, (state, action) => {
        state.getAuthors = 'success';
        state.authorList = action.payload.data;
    })
    builder.addCase(fetchAuthors.rejected, (state, action) => {
        state.getAuthors = 'rejected';
        state.getError = action.payload as CustomError;
    })

    builder.addCase(addAuthor.pending, (state) => {
        return {
          ...state,
          addAuthor: 'pending',
        }
    })
    builder.addCase(addAuthor.fulfilled, (state, action) => {
      state.authorList = [...state.authorList, action.payload.data]
      state.message = 'Thank you, you have successfully added author'
      state.addAuthor = 'success'
    })
    builder.addCase(addAuthor.rejected, (state, action) => {
      state.addError = action.payload as CustomError;
      state.addAuthor = 'rejected'
    })
    builder.addCase(removeAuthor.pending, (state) => {
      return {
        ...state,
        deleteAuthor: 'pending'
      }
    })   
    builder.addCase(removeAuthor.fulfilled, (state, action) => {
      const {
        arg: { id }
      } = action.meta;
      if(id) {
        state.authorList = state.authorList.map((author) => author.id === id ? action.payload : author);
        state.message = 'Thank you, you have successfully deleted author';
        state.deleteAuthor = 'success'
      }
    })
    builder.addCase(removeAuthor.rejected, (state, action) => {
      state.deleteError = action.payload as CustomError;
      state.deleteAuthor = 'rejected';
    })


    builder.addCase(updateAuthor.pending, (state) => {
      return {
        ...state,
        updateAuthor: 'pending',
      }
    })
    builder.addCase(updateAuthor.fulfilled, (state, action) => {
      console.log('action: ', action)
      const {
        arg: { id }
      } = action.meta;
      if(id) {
        state.authorList = state.authorList.map((author) => author.id === id ? action.payload : author);
        state.updateAuthor = 'success'
        state.message = "Thank you, you have successfully updated author's information"
      }
    })
    builder.addCase(updateAuthor.rejected, (state, action) => {
      state.updateError = action.payload as CustomError;
      state.updateAuthor = 'rejected';
    })
}
})

export default authorSlice.reducer




