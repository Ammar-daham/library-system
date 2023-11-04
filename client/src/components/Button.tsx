import { Button } from '@mui/material'

import React, { CSSProperties, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode; 
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; 
  style?: CSSProperties;
}

const ReusedButton: React.FC<ButtonProps> = ({ children, onClick, style }) => {
  return (
    <Button variant="contained" onClick={onClick} style={{width: '100%'}}>
      {children}
    </Button>
  );
}

export default ReusedButton;