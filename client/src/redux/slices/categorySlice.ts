import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Category, CustomError } from '../../types'
import { config } from './token'


const url = `http://localhost:4000/api/v1/categories`


interface categoriesState {
    categoryList: Category[]
    addCategory: string
    addError: CustomError | null
    getCategories: string
    getError: CustomError | null
    message: string
    updateError: CustomError | null
    deleteCategory: string
    deleteError: CustomError | null
    updateCategory: string
  }
  
  const initialState: categoriesState = {
    categoryList: [],
    addCategory: '',
    addError: null, 
    getCategories: '',
    getError: null, 
    message: '',
    updateError: null, 
    deleteCategory: '',
    deleteError: null,
    updateCategory: '', 
  }

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories', async (arg, { rejectWithValue }) => {
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

//   export const addAuthor = createAsyncThunk(
//     'authors/addAuthor',
//     async (author: Author, { rejectWithValue }) => {
//       try {
//         const response = await axios.post(url, author, config())
//         console.log(response.data)
//         return response.data
//       } catch (error: any) {
//         console.log(error)
//         return rejectWithValue(error.response.data)
//       }
//     },
//   );

//   export const removeAuthor = createAsyncThunk(
//     'author/removeAuthor',
//     async ({id}: any , { rejectWithValue }) => {
//       try {
//         const response = await axios.delete(url + id , config())
//         console.log(response.data)
//         return response.data
//       } catch (error: any) {
//         console.log(error)
//         return rejectWithValue(error.response.data)
//       }
//     },
//   );

//   export const updateAuthor = createAsyncThunk(
//     'author/updateAuthor',
//     async ({id, ...author}: any , { rejectWithValue }) => {
//       try {
//         const response = await axios.put(url + id , {...author}, config())
//         console.log(response.data)
//         return response.data
//       } catch (error: any) {
//         console.log(error)
//         return rejectWithValue(error.response.data)
//       }
//     },
//   );


export const categorySlice = createSlice({
name: 'categories',
initialState,
reducers: {},

extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
        return {
        ...state,
        getCategories: 'pending',
        }
    })
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
        state.getCategories = 'success'
        state.categoryList = action.payload.data
    })
    builder.addCase(fetchCategories.rejected, (state, action) => {
        state.getCategories = 'rejected'
        state.getError = action.payload as CustomError;
    })
//     builder.addCase(addAuthor.pending, (state) => {
//         return {
//           ...state,
//           addAuthor: 'pending',
//         }
//       })
//       builder.addCase(addAuthor.fulfilled, (state, action) => {
//         return {
//           ...state,
//           authorList: [...state.authorList, action.payload.data],
//           addAuthor: 'success',
//         }
//       })
//       builder.addCase(addAuthor.rejected, (state, action) => {
//         return {
//           ...state,
//           addAuthor: 'rejected',
//           addError: action.payload,
//         }
//       })
//       builder.addCase(removeAuthor.pending, (state) => {
//         return {
//           ...state,
//           deleteAuthor: 'pending'
//         }
//       })
//       builder.addCase(removeAuthor.fulfilled, (state, action) => {
//         console.log('action: ', action)
//         const {
//           arg: { id }
//         } = action.meta;
//         if(id) {
//           state.authorList = state.authorList.map((author) => author._id === id ? action.payload : author);
//           state.deleteAuthor = 'success'
//         }
//       })
//       builder.addCase(removeAuthor.rejected, (state, action) => {
//         return {
//           ...state,
//           deleteAuthor: 'rejected',
//           deleteError: action.payload,
//         }
//       })
//       builder.addCase(updateAuthor.pending, (state) => {
//         return {
//           ...state,
//           updateAuthor: 'pending',
//         }
//       })
//       builder.addCase(updateAuthor.fulfilled, (state, action) => {
//         console.log('action: ', action)
//         const {
//           arg: { id }
//         } = action.meta;
//         if(id) {
//           state.authorList = state.authorList.map((author) => author._id === id ? action.payload : author);
//           state.updateAuthor = 'success'
//         }
//       })
//       builder.addCase(updateAuthor.rejected, (state, action) => {
//         return {
//           ...state,
//           updateAuthor: 'rejected',
//           updateError: action.payload,
//         }
//       })
 }
})

export default categorySlice.reducer




