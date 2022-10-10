import { Box, Grid } from '@mui/material'
import Header from 'components/Header'
import BookTable from 'components/BooksTable'

const ClientPage = () => {
    return (
        <Box className='mainBox'>
            <Grid container className='mainGrid'>
                <Grid xs={12}>
                    <Header />
                </Grid>
                <Grid  sx={{padding: '50px'}}>
                    <BookTable /> 
                </Grid>

            </Grid>
        </Box>
    )
}

export default ClientPage