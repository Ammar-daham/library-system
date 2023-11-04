import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Category, CustomError } from '../../types'
import { config } from './token'


//const url = `/api/v1/categories/`
const url = `http://localhost:4000/api/v1/categories/`


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

  export const addCategory = createAsyncThunk(
    'categories/addCategory',
    async (category: Category, { rejectWithValue }) => {
      try {
        const response = await axios.post(url, category, config())
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

  export const removeCategory = createAsyncThunk(
    'category/removeCategory',
    async (id: any , { rejectWithValue }) => {
      try {
        const response = await axios.delete(url + id , config())
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

  export const updateCategory = createAsyncThunk(
    'category/updateCategory',
    async ({id, ...category}: any , { rejectWithValue }) => {
      try {
        const response = await axios.put(url + id , {...category}, config())
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
    builder.addCase(addCategory.pending, (state) => {
      return {
        ...state,
        addCategory: 'pending',
      }
    })
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.categoryList = [...state.categoryList, action.payload.data]
      state.message = 'Thank you, you have successfully added new category'
      state.addCategory = 'success'
    })
    builder.addCase(addCategory.rejected, (state, action) => {
      state.addError = action.payload as CustomError;
      state.addCategory = 'rejected'
    })
    builder.addCase(removeCategory.pending, (state) => {
      return {
        ...state,
        deleteCategory: 'pending'
      }
    })   
    builder.addCase(removeCategory.fulfilled, (state, action) => {
      const {
        arg: { id }
      } = action.meta;
      if(id) {
        state.categoryList = state.categoryList.map((author) => author.id === id ? action.payload : author);
        state.message = 'Thank you, you have successfully deleted category';
        state.deleteCategory = 'success'
      }
    })
    builder.addCase(removeCategory.rejected, (state, action) => {
      state.deleteError = action.payload as CustomError;
      state.deleteCategory = 'rejected';
    })


    builder.addCase(updateCategory.pending, (state) => {
      return {
        ...state,
        updateCategory: 'pending',
      }
    })
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      console.log('action: ', action)
      const {
        arg: { id }
      } = action.meta;
      if(id) {
        state.categoryList = state.categoryList.map((category) => category.id === id ? action.payload : category);
        state.updateCategory = 'success'
        state.message = "Thank you, you have successfully updated category"
      }
    })
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.updateError = action.payload as CustomError;
      state.updateCategory = 'rejected';
    })
 }
})

export default categorySlice.reducer




