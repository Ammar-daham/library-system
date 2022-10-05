import { Button, styled } from '@mui/material'
import { ButtonProps } from '@mui/material/Button'
import { orange } from '@mui/material/colors'


 const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(orange[500]),
    width: '80px',
    height: '30px',
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange[700],
      color: 'white'
    },
  }))

export default ColorButton