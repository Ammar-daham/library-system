import express from 'express'
import {
  createCategory,
  findAllCategories,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controller'
import { checkAuthAdminUser } from '../middlewares/checkAuth'

const router = express.Router()

router.get('/', findAllCategories)
router.post('/', checkAuthAdminUser, createCategory)
router.put('/:categoryId', checkAuthAdminUser, updateCategory)
router.delete('/:categoryId', checkAuthAdminUser, deleteCategory)

export default router
