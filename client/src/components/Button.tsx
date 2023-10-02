import { Button, styled } from '@mui/material'


//  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
//     color: theme.palette.getContrastText(orange[500]),
//     backgroundColor: orange[500],
//     '&:hover': {
//       backgroundColor: orange[700],
//       color: 'white',
//     },
//   }))

// export default ColorButton

import React, { CSSProperties, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode; 
  onClick: () => void; 
  style?: CSSProperties;
}

const ReusedButton: React.FC<ButtonProps> = ({ children, onClick, style }) => {
  return (
    <Button variant="contained" onClick={onClick} style={style}>
      {children}
    </Button>
  );
}

export default ReusedButton;