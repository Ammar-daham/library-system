import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'redux/store'
import background from '../books.jpg'

const BookCard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const booksState = useSelector((state: RootState) => state.books)
  const authors = useSelector((state: RootState) => state.authors.authorList)

  return (
    <>
      {booksState.bookList.map((book: any) => (
      <Card sx={{ maxWidth: 345, margin: '10px' }}>
        <CardMedia
          component="img"
          height="200"
          image={background}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {book.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
      ) )}
    </>
  )
}

export default BookCard
