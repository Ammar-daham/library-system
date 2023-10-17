import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'redux/store'
import { useNavigate } from 'react-router-dom'
import { BooksProps } from '../types'
import { useParams } from 'react-router-dom'
import { updateBook } from 'redux/slices/bookSlice'
import BookForm from './BookForm'
import { useState, useEffect } from 'react'
import { Book, initialBook } from '../types'

const EditBook : React.FC<BooksProps> = ({ books }) => {
    const [ newBook, setNewBook ] = useState<Book>(initialBook)

    const id = useParams().id

    const editedBook = books.find((book) => book.id === id)
    
    const dispatch = useDispatch<AppDispatch>()

    const navigate = useNavigate()

    useEffect(() => {
        if (editedBook) {
          setNewBook(editedBook);
        }
      }, [editedBook]);

    if(!editedBook && !newBook) {
        return null
    }

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {

        console.log("newwwbook ", newBook.id)
        e.preventDefault()

        try {
            const { id, ...restOfBook } = newBook;
            
            const response = await dispatch(updateBook({id , ...restOfBook}));
            console.log("Response:", response);
            console.log("newwwbook after ", newBook)

            // Handle success here
          } catch (error: any) {
            console.error("Error:", error);
            
            // Handle error here
          }
      
        // if (res.type === 'book/updateBook/fulfilled') {
        //   setSuccessMessage(state.message)
        //   setErrorMessage('')
        //   setTimeout(() => {
        //     setErrorMessage('')
        //     setSuccessMessage('')
        //     navigate('/login')
        //   }, 2000)
        // } else {
        //   setErrorMessage(state.message)
        //   setSuccessMessage('')
        // }
        // console.log('Button clicked!', res)
      }
    return (
        <BookForm  handleClick={handleClick} book={newBook} setBook={setNewBook} name={"EDIT"} title={"Edit and existing book"} />
    )
}

export default EditBook;