import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Author } from '../../types'
import { UserToken } from './token'


const url = `http://localhost:4000/api/v1/authors/`


const config = {
  headers: {
    Authorization: `Bearer ${UserToken()}`,
  },
}

export interface authorsState {
    authorList: Author[]
    addAuthor: string
    addError: any
    getAuthors: string
    getError: any
    updateAuthor: string
    updateError: any
    deleteAuthor: string
    deleteError: any
  }

const initialState: authorsState = {
    authorList: [],
    addAuthor: '',
    addError: '',
    getAuthors: '',
    getError: '',
    updateAuthor: '',
    updateError: '',
    deleteAuthor: '',
    deleteError: '',
}

export const fetchAuthors = createAsyncThunk(
    'authors/fetchAuthors', async (arg, { rejectWithValue }) => {
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

  export const addAuthor = createAsyncThunk(
    'authors/addAuthor',
    async (author: unknown, { rejectWithValue }) => {
      try {
        const response = await axios.post(url, author, config)
        console.log(response.data)
        return response.data
      } catch (error: any) {
        console.log(error)
        return rejectWithValue(error.response.data)
      }
    },
  );

  export const removeAuthor = createAsyncThunk(
    'author/removeAuthor',
    async ({id}: any , { rejectWithValue }) => {
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

  export const updateAuthor = createAsyncThunk(
    'author/updateAuthor',
    async ({id, ...author}:any , { rejectWithValue }) => {
      try {
        const response = await axios.put(url + id , {...author}, config)
        console.log(response.data)
        return response.data
      } catch (error: any) {
        console.log(error)
        return rejectWithValue(error.response.data)
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
        return {
        ...state,
        authorList: action.payload.data,
        getAuthors: 'success',
        }
    })
    builder.addCase(fetchAuthors.rejected, (state, action) => {
        return {
        ...state,
        getAuthors: 'rejected',
        getError: action.payload,
        }
    })
    builder.addCase(addAuthor.pending, (state) => {
        return {
          ...state,
          addAuthor: 'pending',
        }
      })
      builder.addCase(addAuthor.fulfilled, (state, action) => {
        return {
          ...state,
          authorList: [...state.authorList, action.payload.data],
          addAuthor: 'success',
        }
      })
      builder.addCase(addAuthor.rejected, (state, action) => {
        return {
          ...state,
          addAuthor: 'rejected',
          addError: action.payload,
        }
      })
      builder.addCase(removeAuthor.pending, (state) => {
        return {
          ...state,
          deleteAuthor: 'pending'
        }
      })
      builder.addCase(removeAuthor.fulfilled, (state, action) => {
        console.log('action: ', action)
        const {
          arg: { id }
        } = action.meta;
        if(id) {
          state.authorList = state.authorList.map((author) => author._id === id ? action.payload : author);
          state.deleteAuthor = 'success'
        }
      })
      builder.addCase(removeAuthor.rejected, (state, action) => {
        return {
          ...state,
          deleteAuthor: 'rejected',
          deleteError: action.payload,
        }
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
          state.authorList = state.authorList.map((author) => author._id === id ? action.payload : author);
          state.updateAuthor = 'success'
        }
      })
      builder.addCase(updateAuthor.rejected, (state, action) => {
        return {
          ...state,
          updateAuthor: 'rejected',
          updateError: action.payload,
        }
      })
}
})

export default authorSlice.reducer




