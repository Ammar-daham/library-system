import { TextField } from "@mui/material"
import { useDispatch } from "react-redux"
import { booksFetch, fetchBookByCategory, fetchBookByIsbn, fetchBookByStatus, fetchBookByTitle } from "redux/slices/bookSlice"
import { AppDispatch } from "redux/store"


const Search = () => {
    const dispatch = useDispatch<AppDispatch>()

    return (
        <>
             <TextField
            id="isbn-input"
            name="isbn"
            label="ISBN"
            type="text"
            onChange={(e) => {
              if (e.target.value === '') {
                dispatch(booksFetch())
              } else {
                dispatch(fetchBookByIsbn(e.target.value))
              }
            }}
          />
          <TextField
            id="title-input"
            name="title"
            label="TITLE"
            type="text"
            onChange={(e) => {
              if (e.target.value === '') {
                dispatch(booksFetch())
              } else {
                dispatch(fetchBookByTitle(e.target.value))
              }
            }}
          />
          <TextField
            id="category-input"
            name="category"
            label="CATEGORY"
            type="text"
            onChange={(e) => {
              if (e.target.value === '') {
                dispatch(booksFetch())
              } else {
                dispatch(fetchBookByCategory(e.target.value))
              }
            }}
          />
          <TextField
            id="status-input"
            name="status"
            label="STATUS"
            type="text"
            onChange={(e) => {
              if (e.target.value === '') {
                dispatch(booksFetch())
              } else {
                dispatch(fetchBookByStatus(e.target.value))
              }
            }}
          />
        </>
    )
}

export default Search;