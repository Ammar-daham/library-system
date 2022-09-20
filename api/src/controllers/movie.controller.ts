import { Request, Response, NextFunction } from 'express'

import Book from '../models/Book'
import movieService from '../services/movie.service'
import { BadRequestError } from '../helpers/apiError'

// POST /movies
export const createMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      ISBN,
      title,
      description,
      publisher,
      authors,
      status,
      borrowerId,
      publishedDate,
      borrowDate,
      returnDate,
    } = req.body

    const book = new Book({
      ISBN,
      title,
      description,
      publisher,
      authors,
      status,
      borrowerId,
      publishedDate,
      borrowDate,
      returnDate,
    })

    await movieService.create(book)
    res.json(book)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /movies/:movieId
export const updateMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const movieId = req.params.movieId
    const updatedMovie = await movieService.update(movieId, update)
    res.json(updatedMovie)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// DELETE /movies/:movieId
export const deleteMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await movieService.deleteBook(req.params.movieId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /movies/:movieId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await movieService.findById(req.params.movieId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /movies
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await movieService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
