// import { TextField } from "@mui/material"
// import { useDispatch } from "react-redux"
// import { booksFetch, fetchBookByCategory, fetchBookByIsbn, fetchBookByStatus, fetchBookByTitle } from "redux/slices/bookSlice"
// import { AppDispatch } from "redux/store"
import React from 'react'

import InputBase from '@mui/material/InputBase'
import { styled, alpha } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    border: '1px solid',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

const SearchInput = () => {
  //     const dispatch = useDispatch<AppDispatch>()

  //     const searchByIsbn = (e: React.ChangeEvent<HTMLInputElement>) => {
  //       if (e.target.value === '') {
  //         dispatch(booksFetch())
  //       } else {
  //         dispatch(fetchBookByIsbn(e.target.value))
  //       }
  //     }

  //     const searchByTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
  //       if (e.target.value === '') {
  //         dispatch(booksFetch())
  //       } else {
  //         dispatch(fetchBookByTitle(e.target.value))
  //       }
  //     }

  //     const searchByCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
  //       if (e.target.value === '') {
  //         dispatch(booksFetch())
  //       } else {
  //         dispatch(fetchBookByCategory(e.target.value))
  //       }
  //     }

  //     const searchByStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
  //       if (e.target.value === '') {
  //         dispatch(booksFetch())
  //       } else {
  //         dispatch(fetchBookByStatus(e.target.value))
  //       }
  //     }

  return (
    //         <>
    //              <TextField
    //             id="isbn-input"
    //             name="isbn"
    //             label="ISBN"
    //             type="text"
    //             onChange={searchByIsbn}
    //           />
    //           <TextField
    //             id="title-input"
    //             name="title"
    //             label="TITLE"
    //             type="text"
    //             onChange={searchByTitle}
    //           />
    //           <TextField
    //             id="category-input"
    //             name="category"
    //             label="CATEGORY"
    //             type="text"
    //             onChange={searchByCategory}
    //           />
    //           <TextField
    //             id="status-input"
    //             name="status"
    //             label="STATUS"
    //             type="text"
    //             onChange={searchByStatus}
    //           />
    //         </>

    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  )
}

export default SearchInput;
