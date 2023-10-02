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

router.get('/', findAllAuthors)
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
router.post('/', createAuthor)

export default router
