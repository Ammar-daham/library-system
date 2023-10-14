import React from 'react'
import { styled } from "@mui/material"
import { Dialog, DialogTitle, IconButton } from "@mui/material"
import { orange } from "@mui/material/colors"
import CloseIcon from '@mui/icons-material/Close'



export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
      background: 'wheat',
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
      background: 'wheat',
    },
  }))
  
  export interface DialogTitleProps {
    id: string
    children?: React.ReactNode
    onClose: () => void
  }
  
  export const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props
  
    return (
      <DialogTitle
        sx={{ m: 0, p: 2, backgroundColor: orange[500], color: 'white' }}
        {...other}
      >
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    )
  }
  