import { Box, Grid } from '@mui/material'
import Header from 'components/Header'
import BookTable from 'components/BooksTable'
import Books from 'components/Books'

const ClientPage = () => {
    return (
        
        <Box className='mainBox'>
            <Grid container >
                <Grid xs={12}>
                    <Header />
                    <Books />
                </Grid>
                <Grid  sx={{padding: '50px 150px'}}>
                    <BookTable /> 
                </Grid>

            </Grid>
        </Box>
        
        
    )
}

export default ClientPage