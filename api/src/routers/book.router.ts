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

// Every path we define here will get /api/v1/books prefix
router.get('/', findAllBooks)
router.get('/isbn/:isbn', checkAuthAdminUser, findByIsbn)
router.get('/title/:title', checkAuthAdminUser, findByTitle)
router.get('/status/:status', checkAuthAdminUser, findByStatus)
router.get('/category/:category', checkAuthAdminUser, findByCategory)
router.put('/status/borrowed/:bookId', checkAuthAdminUser, bookBorrowed)
router.put('/status/available/:bookId', checkAuthAdminUser, bookReturned)
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

router.post('/', createBook)

export default router
