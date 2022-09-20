import express from 'express'

import {
  createMovie,
  findById,
  deleteMovie,
  findAll,
  updateMovie,
} from '../controllers/book.controller'

const router = express.Router()

// Every path we define here will get /api/v1/movies prefix
router.get('/', findAll)
router.get('/:bookId', findById)
router.put('/:bookId', updateMovie)
router.delete('/:bookId', deleteMovie)
router.post('/', createMovie)

export default router
