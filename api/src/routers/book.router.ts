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
import { checkAuthAdmin, checkAuthAdminUser } from '../middlewares/checkAuth'
const router = express.Router()

// Every path we define here will get /api/v1/movies prefix
router.get('/', checkAuthAdminUser, findAllBooks)
router.get('/isbn/:isbn', checkAuthAdminUser, findByIsbn)
router.get('/title/:title', checkAuthAdminUser, findByTitle)
router.get('/status/:status', checkAuthAdminUser, findByStatus)
router.get('/category/:category', checkAuthAdminUser, findByCategory)
router.put(
  '/status/borrowed/:bookId',
  (...args) => checkAuthAdmin(...args, { isAdmin: true }),
  bookBorrowed
)
router.put(
  '/status/available/:bookId',
  (...args) => checkAuthAdmin(...args, { isAdmin: true }),
  bookReturned
)
router.put(
  '/:bookId',
  (...args) => checkAuthAdmin(...args, { isAdmin: true }),
  updateBook
)

router.delete(
  '/:bookId',
  (...args) => checkAuthAdmin(...args, { isAdmin: true }),
  deleteBook
)

router.post(
  '/',
  (...args) => checkAuthAdmin(...args, { isAdmin: true }),
  createBook
)

export default router
