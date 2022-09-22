import React from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import ColorButton from 'components/Button'


const BookForm = () => {
    return (
        <form style={{padding: '50px'}}>
            <Container sx={{backgroundColor: 'white', textAlign:'center', padding: '50px'}}>
                <Typography variant="h6">Add A Book</Typography>
                <Grid container >
                    <Grid item xs={6}>
                        <TextField
                            id="isbn-input"
                            name="isbn"
                            label="ISBN"
                            type="text"
                            />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="title-input"
                            name="title"
                            label="Title"
                            type="text"
                            />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="description-input"
                            name="descriptipn"
                            label="Description"
                            type="text"
                            />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="authors-input"
                            name="authors"
                            label="Authors"
                            type="text"
                            />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="status-input"
                            name="status"
                            label="Status"
                            type="text"
                            />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="borrowerId-input"
                            name="borrowerId"
                            label="Borrower-Id"
                            type="text"
                            />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="publishedDate-input"
                            name="publishedDate"
                            label="Published-Date"
                            type="text"
                            />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="borrowDate-input"
                            name="borrowDate"
                            label="Borrow-Date"
                            type="text"
                            />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="returnDate-input"
                            name="returnDate"
                            label="return-Date"
                            type="text"
                            />
                    </Grid>
                </Grid>
                <ColorButton variant="contained">Add</ColorButton>
            </Container>
        </form>
    )
}

export default BookForm