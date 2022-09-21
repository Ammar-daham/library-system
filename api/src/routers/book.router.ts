import express from 'express'

import {
  createBook,
  findByIsbn,
  deleteBook,
  findAllBooks,
  updateBook,
} from '../controllers/book.controller'

import {
  createAuthor,
  findById,
  deleteAuthor,
  findAllAuthors,
  updateAuthor,
} from '../controllers/author.controller'

const router = express.Router()

// Every path we define here will get /api/v1/movies prefix
router.get('/', findAllBooks)
router.get('/:bookId', findByIsbn)
router.put('/:bookId', updateBook)
router.delete('/:bookId', deleteBook)
router.post('/', createBook)

export default router
