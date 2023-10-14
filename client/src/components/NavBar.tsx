import { ListItemButton, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <>
      <ListItemButton sx={{ textAlign: 'center' }}>
        <Link className="header-link" to={`/`}>
          <ListItemText>BOOKS</ListItemText>
        </Link>
      </ListItemButton>
      <ListItemButton sx={{ textAlign: 'center' }}>
        <Link className="header-link" to={`/`}>
          <ListItemText>AUTHORS</ListItemText>
        </Link>
      </ListItemButton>
      <ListItemButton sx={{ textAlign: 'center' }}>
        <Link className="header-link" to={`/`}>
          <ListItemText>ADD BOOK</ListItemText>
        </Link>
      </ListItemButton>
      <ListItemButton sx={{ textAlign: 'center' }}>
        <Link className="header-link" to={`/`}>
          <ListItemText>ADD AUTHOR</ListItemText>
        </Link>
      </ListItemButton>
    </>
  )
}

export default NavBar
