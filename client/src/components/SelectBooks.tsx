import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  SelectChangeEvent,
} from '@mui/material'
import { SelectedBooksProps } from 'types'

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

const SelectBooks: React.FC<SelectedBooksProps> = ({
  name,
  author,
  category,
  setCategory,
  label,
  books,
  setAuthor,
}) => {
  const handleAuthorBooksChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event
    if (setAuthor)
      setAuthor((prevAuthor) => ({
        ...prevAuthor,
        books: typeof value === 'string' ? value.split(',') : value,
      }))
  }

  const handleCategoryBooksChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event
    if (setCategory)
      setCategory((prevCategory) => ({
        ...prevCategory,
        books: typeof value === 'string' ? value.split(',') : value,
      }))
  }

  return (
    <FormControl fullWidth>
      <InputLabel>{name}</InputLabel>
      <Select
        multiple
        value={author ? author.books : category?.books}
        onChange={author ? handleAuthorBooksChange : handleCategoryBooksChange}
        input={<OutlinedInput label={label} />}
        MenuProps={MenuProps}
      >
        <MenuItem value={''}>None</MenuItem>
        {books != null &&
          books.map((b) => (
            <MenuItem key={b.id} value={b.id}>
              {b.title}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  )
}

export default SelectBooks
