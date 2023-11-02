import React from 'react'
import { Container, Grid, TextField } from '@mui/material'
import { GenreFormProps } from '../types'
import SelectBooks from './SelectBooks'
import Notification from './Notifications'
import ReusedButton from './Button'
import '../App.css'

const GenreForm: React.FC<GenreFormProps> = ({
	handleClick,
	category,
	name,
	title,
	setCategory,
	successMessage,
	errorMessage,
	books,
}) => {
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target
		setCategory((prevCategory) => ({
			...prevCategory,
			[name]: value,
		}))
	}

	return (
		<Container className="main-container">
			<h2>{title}</h2>
			<p>Refine an existing genre or introduce a new genre</p>
			<form>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12}>
						<TextField
							required
							fullWidth
							className="input"
							name="name"
							label="Name"
							type="text"
							value={category.name}
							onChange={handleInputChange}
						/>
					</Grid>
					<Grid item xs={12} sm={12}>
						{category !== null} {

						<SelectBooks
							category={category}
							setCategory={setCategory}
							name={'Books'}
							label={'Books'}
							books={books}
							author={null}
							setAuthor={null}
						/>
						}
					</Grid>
					<Grid item xs={12}>
						<ReusedButton onClick={handleClick}>{name}</ReusedButton>
					</Grid>
					<Grid item xs={12}>
						<Notification
							successMessage={successMessage}
							errorMessage={errorMessage}
						/>
					</Grid>
				</Grid>
			</form>
		</Container>
	)
}

export default GenreForm
