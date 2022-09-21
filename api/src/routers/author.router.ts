import express from 'express'

import {
  createAuthor,
  findById,
  deleteAuthor,
  findAllAuthors,
  updateAuthor,
} from '../controllers/author.controller'

const router = express.Router()

router.get('/', findAllAuthors)
router.get('/:authorId', findById)
router.put('/:authorId', updateAuthor)
router.delete('/:authorId', deleteAuthor)
router.post('/', createAuthor)

export default router
