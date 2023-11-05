import express from 'express'
import { checkAuthAdminUser } from '../middlewares/checkAuth'

import {
  createAuthor,
  deleteAuthor,
  findAllAuthors,
  updateAuthor,
} from '../controllers/author.controller'

const router = express.Router()

router.get('/', findAllAuthors)
router.put('/:authorId', checkAuthAdminUser, updateAuthor)
router.delete('/:authorId', checkAuthAdminUser, deleteAuthor)
router.post('/', createAuthor)

export default router
