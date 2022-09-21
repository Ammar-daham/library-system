import { Request, Response, NextFunction } from 'express'

import Author from '../models/Author'
import authorService from '../services/author.service'
import { BadRequestError } from '../helpers/apiError'

// POST /movies
export const createAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, books } = req.body

    const author = new Author({
      name,
      email,
      books,
    })

    await authorService.create(author)
    res.json(author)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /movies/:movieId
export const updateAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const authorId = req.params.authorId
    const updatedAuthor = await authorService.update(authorId, update)
    res.json(updatedAuthor)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// DELETE /movies/:movieId
export const deleteAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await authorService.deleteAuthor(req.params.authorId)
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
    res.json(await authorService.findById(req.params.authorId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /movies
export const findAllAuthors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await authorService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
