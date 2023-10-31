import { ListItemButton, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'


const NavBar = () => {

  const userToken = localStorage.getItem('userToken')

  return (
    <>
      <ListItemButton>
        <Link className="header-link" to={`/`}>
          <ListItemText>BOOKS</ListItemText>
        </Link>
      </ListItemButton>
      <ListItemButton>
        <Link className="header-link" to={`/authors`}>
          <ListItemText>AUTHORS</ListItemText>
        </Link>
      </ListItemButton>
      <ListItemButton>
        { 
          !userToken ? (
          <Link className="header-link" to={`/books/books-alert/`}>
            <ListItemText>ADD BOOK</ListItemText>
          </Link>
          ): 
          <Link className="header-link" to={`/books/new-book`}>
            <ListItemText>ADD BOOK</ListItemText>
          </Link>
        }
      </ListItemButton>
      <ListItemButton>
        { 
          !userToken ? (
          <Link className="header-link" to={`/authors/authors-alert/`}>
            <ListItemText>ADD AUTHOR</ListItemText>
          </Link>
          ): 
          <Link className="header-link" to={`/authors/new-author`}>
            <ListItemText>ADD AUTHOR</ListItemText>
          </Link>
        }
      </ListItemButton>
    </>
  )
}

export default NavBar
