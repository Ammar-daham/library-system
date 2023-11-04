import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CredentialResponse } from '@react-oauth/google'
import axios from 'axios'
import { DecodedUser, User, loggedInUser, initialLoggedInUser, loggedUser} from '../../types'
import jwt_decode from 'jwt-decode'


//const url = `/api/v1/users/`
const url = `http://localhost:4000/api/v1/users/`


export interface authState {
  users: User[]   
  token: string
  isLoggedIn: boolean
  isLoading: boolean
  error: any
  success: boolean
  message: string
  user: loggedInUser
}

const initialState: authState = {
  users: [],  
  token: '',
  isLoggedIn: false,
  isLoading: false,
  error: null,
  success: false,
  message: '',
  user: initialLoggedInUser
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
  'user/create',
 async (user: User, { rejectWithValue }) => {
    try {
      const response = await axios.post(url, user)
      return response.data
    } catch (error: any) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const login = createAsyncThunk(
  'user/login',
 async (user: loggedUser, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}login`, user)
      localStorage.setItem('userToken', response.data.token)
      return response.data
    } catch (error: any) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)


export const auth = createAsyncThunk(
  'user/google-login',
  async (response: CredentialResponse, { rejectWithValue }) => {
    try {
      if (response.credential) {
        const res = await axios.post(
          `${url}google-login`,
          {},
          {
            headers: {
              id_token: response.credential,
            },
          },
        )
        localStorage.setItem('userToken', res.data.token)
        const decoded = jwt_decode(res.data.token) as DecodedUser
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
        message: `You have successfully signed up to our service`,
        success: true
      }
    })
    builder.addCase(createUser.rejected, (state, action) => {
      return {
        ...state,
        success: false,
        message: 'Please fill out all required fields correctly before submitting the form',
      }
    })
    builder.addCase(login.pending, (state) => {
      return {
        ...state,
        isLoading: true
      }
    })
    builder.addCase(login.fulfilled, (state, action) => {
      return {
        ...state,
        user: action.payload,
        message: `You have successfully logged in to our service`,
        success: true
      }
    })
    builder.addCase(login.rejected, (state, action) => {
      return {
        ...state,
        success: false,
        message: 'Email and password are required',
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
