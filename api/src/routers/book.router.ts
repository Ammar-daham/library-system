import express from 'express'

import {
  createBook,
  findByIsbn,
  findByTitle,
  deleteBook,
  findAllBooks,
  updateBook,
  findByStatus,
} from '../controllers/book.controller'

const router = express.Router()

// Every path we define here will get /api/v1/movies prefix
router.get('/', findAllBooks)
router.get('/isbn/:isbn', findByIsbn)
router.get('/title/:title', findByTitle)
router.get('/status/:status', findByStatus)
router.put('/:bookId', updateBook)
router.delete('/:bookId', deleteBook)
router.post('/', createBook)

export default router
