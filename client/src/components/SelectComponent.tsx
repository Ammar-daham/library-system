import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
} from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { SelectedProps } from 'types'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const SelectComponent: React.FC<SelectedProps> = ({
  book,
  author,
  category,
  name,
  setBook,
  setAuthor,
  setCategory,
  categories,
  authors,
  books,
  label,
}) => {
  if (!book || !author || !category || !setBook || !setAuthor || !setCategory) {
    return null
  }
  const handleCategoriesChange = (
    event: SelectChangeEvent<typeof book.categories>,
  ) => {
    const {
      target: { value },
    } = event

    setBook((prevBook) => ({
      ...prevBook,
      categories: typeof value === 'string' ? value.split(',') : value,
    }))
  }

  const handleAuthorsChange = (
    event: SelectChangeEvent<typeof book.authors>,
  ) => {
    const {
      target: { value },
    } = event

    setBook((prevBook) => ({
      ...prevBook,
      authors: typeof value === 'string' ? value.split(',') : value,
    }))
  }

  const handleBooksChange = (event: SelectChangeEvent<typeof author.books>) => {
    const {
      target: { value },
    } = event

    setAuthor((prevAuthor) => ({
      ...prevAuthor,
      books: typeof value === 'string' ? value.split(',') : value,
    }))
  }

  return (
    <FormControl fullWidth>
      <InputLabel>{name}</InputLabel>
      <Select
        multiple
        value={
          categories
            ? book.categories
            : authors
            ? book.authors
            : books
            ? author.books
            : ''
        }
        onChange={
          categories
            ? handleCategoriesChange
            : authors
            ? handleAuthorsChange
            : handleBooksChange
        }
        input={<OutlinedInput label={label} />}
        MenuProps={MenuProps}
      >
        <MenuItem value={''}>None</MenuItem>
        {categories != null &&
          !authors &&
          books &&
          categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        {authors != null &&
          !categories &&
          !books &&
          authors.map((author) => (
            <MenuItem key={author.id} value={author.id}>
              {author.name}
            </MenuItem>
          ))}
        {books != null &&
          books.map((book) => (
            <MenuItem key={book.id} value={book.id}>
              {book.title}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  )
}

export default SelectComponent
