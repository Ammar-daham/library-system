import express from 'express'
import { checkAuthAdmin } from '../middlewares/checkAuth'

import {
  createAuthor,
  findById,
  deleteAuthor,
  findAllAuthors,
  updateAuthor,
} from '../controllers/author.controller'

const router = express.Router()

router.get(
  '/',
  (...args) => checkAuthAdmin(...args, { isAdmin: true }),
  findAllAuthors
)
router.get(
  '/:authorId',
  (...args) => checkAuthAdmin(...args, { isAdmin: true }),
  findById
)
router.put(
  '/:authorId',
  (...args) => checkAuthAdmin(...args, { isAdmin: true }),
  updateAuthor
)
router.delete(
  '/:authorId',
  (...args) => checkAuthAdmin(...args, { isAdmin: true }),
  deleteAuthor
)
router.post(
  '/',
  (...args) => checkAuthAdmin(...args, { isAdmin: true }),
  createAuthor
)

export default router
