import express from 'express'

import {
  createBook,
  deleteBook,
  findAllBooks,
  updateBook,
  bookBorrowed,
  bookReturned,
} from '../controllers/book.controller'
import { checkAuthAdmin, checkAuthAdminUser } from '../middlewares/checkAuth'
const router = express.Router()

// Every path we define here will get /api/v1/books prefix
router.get('/', findAllBooks)
router.put('/status/borrowed/:bookId', checkAuthAdminUser, bookBorrowed)
router.put('/status/available/:bookId', checkAuthAdminUser, bookReturned)
router.put(
  '/:bookId',
  // (...args) => checkAuthAdmin(...args, { isAdmin: true }),
  updateBook
)
router.delete('/:bookId', checkAuthAdminUser, deleteBook)
router.post('/', checkAuthAdminUser, createBook)

export default router
