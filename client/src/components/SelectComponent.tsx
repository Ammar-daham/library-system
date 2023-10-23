import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
} from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { Theme, useTheme } from '@mui/material/styles'
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



const SelectComponent : React.FC<SelectedProps> = ({
    book,
    name,
    setBook,
    categories,
    authors,
    label
  }) => {


    const handleChange = (event: SelectChangeEvent<typeof book.categories>) => {
        const {
          target: { value },
        } = event
        if (value.length === 0) {
          setBook((prevBook) => ({
            ...prevBook,
            categories: [], 
          }));
        } else {
          setBook((prevBook) => ({
            ...prevBook,
            categories: typeof value === 'string' ? value.split(',') : value,
          }));
        }
      }

  return (
    <FormControl fullWidth>
      <InputLabel>{name}</InputLabel>
      <Select
        multiple
        value={book.categories || ''}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        MenuProps={MenuProps}
      >
        <MenuItem value={''}>None</MenuItem>
        {categories != null && !authors &&
          categories.map((category) => (
            <MenuItem
              key={category.id}
              value={category.id}
            >
              {category.name}
            </MenuItem>
          ))}
          {authors != null && !categories &&
          authors.map((author) => (
            <MenuItem
              key={author.id}
              value={author.id}
            >
              {author.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  )
}

export default SelectComponent
