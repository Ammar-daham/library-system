import express from 'express'
import { checkAuthAdmin, checkAuthAdminUser } from '../middlewares/checkAuth'

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
router.put('/:authorId', checkAuthAdminUser, updateAuthor)
router.delete('/:authorId', checkAuthAdminUser, deleteAuthor)
router.post('/', createAuthor)

export default router
