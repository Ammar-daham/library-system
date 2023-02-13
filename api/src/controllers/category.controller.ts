import { Request, Response, NextFunction } from 'express'

import Category from '../models/category'
import categoryService from '../services/category.service'
import { BadRequestError } from '../helpers/apiError'

// POST /category
export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, books } = req.body

    const category = new Category({
      name,
      books,
    })

    await categoryService.create(category)
    res.json(category)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /category
export const findAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await categoryService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
