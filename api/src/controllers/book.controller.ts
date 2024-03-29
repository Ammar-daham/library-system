import { Request, Response, NextFunction } from 'express'
import Book from '../models/book'
import bookService from '../services/book.service'
import { BadRequestError } from '../helpers/apiError'

const date = new Date()
// POST /books
export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      isbn,
      title,
      description,
      publisher,
      authors,
      status,
      cover,
      categories,
      publishedDate,
      url,
      language,
      pages,
    } = req.body

    const book = new Book({
      isbn,
      title,
      description,
      publisher,
      authors,
      status,
      cover,
      categories,
      publishedDate,
      url,
      language,
      pages,
    })

    await bookService.create(book)
    res.json(book)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /books/:bookId
export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const bookId = req.params.bookId
    const updatedBook = await bookService.update(bookId, update)
    res.json(updatedBook)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /books/status/borrowed/:bookId
export const bookBorrowed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = req.params.bookId
    req.body.status = 'borrowed'
    req.body.borrowDate =
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    req.body.returnDate = ''

    const updatedBook = await bookService.bookBorrowed(bookId, req.body)
    res.json(updatedBook)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /books/status/available/:bookId
export const bookReturned = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = req.params.bookId
    req.body.status = 'available'
    req.body.borrowDate = ''
    req.body.returnDate =
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()

    const updatedBook = await bookService.bookReturned(bookId, req.body)
    res.json(updatedBook)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// DELETE /books/:bookId
export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await bookService.deleteBook(req.params.bookId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /books
export const findAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await bookService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
