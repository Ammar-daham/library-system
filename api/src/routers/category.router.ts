import express from 'express'
import { checkAuthAdmin } from '../middlewares/checkAuth'
import {
  createCategory,
  findAllCategories,
} from '../controllers/category.controller'

const router = express.Router()

router.get(
  '/',
  (...args) => checkAuthAdmin(...args, { isAdmin: true }),
  findAllCategories
)

router.post(
  '/',
  (...args) => checkAuthAdmin(...args, { isAdmin: true }),
  createCategory
)

export default router
