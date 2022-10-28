
import { TextField } from "@mui/material"
import { useDispatch } from "react-redux"
import { booksFetch, fetchBookByCategory, fetchBookByIsbn, fetchBookByStatus, fetchBookByTitle } from "redux/slices/bookSlice"
import { AppDispatch } from "redux/store"


const Search = () => {
    const dispatch = useDispatch<AppDispatch>()

    const searchByIsbn = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === '') {
        dispatch(booksFetch())
      } else {
        dispatch(fetchBookByIsbn(e.target.value))
      }
    }

    const searchByTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === '') {
        dispatch(booksFetch())
      } else {
        dispatch(fetchBookByTitle(e.target.value))
      }
    }

    const searchByCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === '') {
        dispatch(booksFetch())
      } else {
        dispatch(fetchBookByCategory(e.target.value))
      }
    }

    const searchByStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === '') {
        dispatch(booksFetch())
      } else {
        dispatch(fetchBookByStatus(e.target.value))
      }
    }  

    return (
        <>
             <TextField
            id="isbn-input"
            name="isbn"
            label="ISBN"
            type="text"
            onChange={searchByIsbn}
          />
          <TextField
            id="title-input"
            name="title"
            label="TITLE"
            type="text"
            onChange={searchByTitle}
          />
          <TextField
            id="category-input"
            name="category"
            label="CATEGORY"
            type="text"
            onChange={searchByCategory}
          />
          <TextField
            id="status-input"
            name="status"
            label="STATUS"
            type="text"
            onChange={searchByStatus}
          />
        </>
    )
}

export default Search;