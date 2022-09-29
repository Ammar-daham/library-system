import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CredentialResponse } from '@react-oauth/google'
import axios from 'axios'

const url = `http://localhost:4000/api/v1/users/login`

export interface authState {
  token: string
  isLoading: boolean
  error: any
  success: boolean
}

const initialState: authState = {
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
  name: 'auth',
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
