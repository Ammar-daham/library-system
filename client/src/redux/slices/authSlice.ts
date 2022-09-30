import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CredentialResponse } from '@react-oauth/google'
import axios from 'axios'
import { User } from 'types'

const url = `http://localhost:4000/api/v1/users/login`

export interface authState {
  users: User[]   
  token: string
  isLoading: boolean
  error: any
  success: boolean
}

const initialState: authState = {
  users: [],  
  token: '',
  isLoading: false,
  error: null,
  success: false
}


export const auth = createAsyncThunk(
  'user/register',
  async (response: CredentialResponse, { rejectWithValue }) => {
    console.log('response: ', response)
    try {
      if (response.credential) {
        console.log('credential: ', response.credential)

        const res = await axios.post(
          url,
          {},
          {
            headers: {
              id_token: response.credential,
            },
          },
        )
        console.log(res.data.token)
        localStorage.setItem('userToken', res.data.token)
        return res.data.token
      }
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  },
)

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(auth.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(auth.fulfilled, (state, action) => {
      state.token = action.payload
      state.isLoading = false
      state.success = true
    })
    builder.addCase(auth.rejected, (state, action) => {
      state.error = action.payload
      state.isLoading = false
    })
  },
})

export default authSlice.reducer
