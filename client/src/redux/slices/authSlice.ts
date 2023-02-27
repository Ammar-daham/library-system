import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CredentialResponse } from '@react-oauth/google'
import axios from 'axios'
import { DecodedUser, User } from '../../types'
import jwt_decode from 'jwt-decode'



const url = `http://localhost:4000/api/v1/users/login`
const userUrl = `http://localhost:4000/api/v1/users/`

export interface authState {
  users: User[]   
  token: string
  isLoggedIn: boolean
  isLoading: boolean
  error: any
  success: boolean
  addUser: string
  addError: string
}

const initialState: authState = {
  users: [],  
  token: '',
  isLoggedIn: false,
  isLoading: false,
  error: null,
  success: false,
  addUser: '',
  addError: ''
}



// export const userFetch = createAsyncThunk(
//   'user/fetchUser', async (arg, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(userUrl)
//       console.log(response.data)
//       return {
//         data: response.data,
//         status: response.status,
//       }
//     } catch (error: any) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message)
//       } else {
//         return rejectWithValue(error.message)
//       }
//     }
//   }
// )

export const createUser = createAsyncThunk(
  'users/create',
 async (user: User, { rejectWithValue }) => {
    try {
      const response = await axios.post(userUrl, user)
      console.log(response.data)
      return response.data
    } catch (error: any) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)



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
        console.log('userToken: ', res.data.token)
        localStorage.setItem('userToken', res.data.token)
        const decoded = jwt_decode(res.data.token) as DecodedUser
        console.log('decoded: ',decoded)
        localStorage.setItem('isAdmin', JSON.stringify(decoded.isAdmin))
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
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(auth.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(auth.fulfilled, (state, action) => {
      state.token = action.payload
      state.isLoading = false
      state.isLoggedIn = true
      state.success = true
    })
    builder.addCase(auth.rejected, (state, action) => {
      state.error = action.payload
      state.isLoading = false
    })
    builder.addCase(createUser.pending, (state) => {
      return {
        ...state,
        isLoading: true
      }
    })
    builder.addCase(createUser.fulfilled, (state, action) => {
      return {
        ...state,
        users: [...state.users, action.payload.data],
        addUser: 'success'
      }
    })
    builder.addCase(createUser.rejected, (state, action) => {
      return {
        ...state,
        addUser: 'rejected',
        addError: 'error'
      }
    })
    // builder.addCase(userFetch.pending, (state) => {
    //   return {
    //     ...state,
    //     isLoading: true
    //   }
    // })
    // builder.addCase(userFetch.fulfilled, (state, action) => {
    //   return {
    //     ...state,
    //     users: [action.payload.data],
    //     isLoading: false
    //   }
    // })
    // builder.addCase(userFetch.rejected, (state, action) => {
    //   return {
    //     ...state,
    //     isLoading: false,
    //     error: action.payload
    //   }
    // })
  },
})

export default authSlice.reducer
