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
  name,
  setBook,
  categories,
  authors,
  label,
}) => {
  const handleCategoriesChange = (event: SelectChangeEvent<typeof book.categories>) => {
    const { target: { value } } = event;

    setBook((prevBook) => ({
      ...prevBook,
      categories: typeof value === 'string' ? value.split(',') : value,
    }));
  }

  const handleAuthorsChange = (event: SelectChangeEvent<typeof book.authors>) => {
    const { target: { value } } = event;

    setBook((prevBook) => ({
      ...prevBook,
      authors: typeof value === 'string' ? value.split(',') : value,
    }));
  }


  return (
    <FormControl fullWidth>
      <InputLabel>{name}</InputLabel>
      <Select
        multiple
        value={categories ? book.categories : book.authors}
        onChange={categories ? handleCategoriesChange : handleAuthorsChange}
        input={<OutlinedInput label={label} />}
        MenuProps={MenuProps}
      >
        <MenuItem value={''}>None</MenuItem>
        {categories != null &&
          !authors &&
          categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        {authors != null &&
          !categories &&
          authors.map((author) => (
            <MenuItem key={author.id} value={author.id}>
              {author.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  )
}

export default SelectComponent
