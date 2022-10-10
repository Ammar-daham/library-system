import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Author } from '../../types'


const url = `http://localhost:4000/api/v1/authors/`



const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

const config = {
  headers: {
    Authorization: `Bearer ${userToken}`,
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

}
})

export default authorSlice.reducer




