import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
//import { Country } from '../../types'

export interface countriesState {
  items: []
  isLoading: boolean
  
}

const initialState: countriesState = { 
  items: [],
  isLoading: false
}

export const booksFetch = createAsyncThunk(
  'books/fetchBooks',
  async () => {
    const url = `http://localhost:4000/api/v1/books`
    const response = await axios.get(url)
    return {
      data: response.data,
      status: response.status,
    }
  }
)

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(booksFetch.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(booksFetch.fulfilled, (state, action) => {
      state.items = action.payload.data
      state.isLoading = false
      console.log(state.items)
    })
    builder.addCase(booksFetch.rejected, (state) => {
      console.log('Something went wrong')
      state.isLoading = false
    })
  },
})


export default bookSlice.reducer
