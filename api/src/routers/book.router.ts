import express from 'express'

import {
  createBook,
  findByIsbn,
  findByTitle,
  findByCategory,
  deleteBook,
  findAllBooks,
  updateBook,
  findByStatus,
  bookBorrowed,
  bookReturned,
} from '../controllers/book.controller'
import checkAuth from '../middlewares/checkAuth'
const router = express.Router()

// Every path we define here will get /api/v1/movies prefix
router.get(
  '/',
  (...args) => checkAuth(...args, { isAdmin: true }),
  findAllBooks
)
router.get('/isbn/:isbn', findByIsbn)
router.get('/title/:title', findByTitle)
router.get('/status/:status', findByStatus)
router.get('/category/:category', findByCategory)
router.put('/:bookId', updateBook)
router.put('/status/borrowed/:bookId', bookBorrowed)
router.put('/status/available/:bookId', bookReturned)
router.delete('/:bookId', deleteBook)
router.post('/', createBook)

export default router
