import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
} from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
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
  setAuthor,
  setCategory,
  label,
  author,
  category,
  books
}) => {
  
  if(!author || !setAuthor ) {
    return null
  }

  const handleAuthorBooksChange = (event: SelectChangeEvent<typeof author.books>) => {
    const { target: { value } } = event;

    setAuthor((prevAuthor) => ({
      ...prevAuthor,
      books: typeof value === 'string' ? value.split(',') : value,
    }));
  }

  // const handleCategoryBooksChange = (event: SelectChangeEvent<typeof category.books>) => {
  //   const { target: { value } } = event;

  //   setCategory((prevCategory) => ({
  //     ...prevCategory,
  //     books: typeof value === 'string' ? value.split(',') : value,
  //   }));
  // }


  return (
    <FormControl fullWidth>
      <InputLabel>{name}</InputLabel>
      <Select
        multiple
        value={author.books}
        onChange={handleAuthorBooksChange}
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

export default SelectBooks;