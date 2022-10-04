import { Request, Response, NextFunction } from 'express'
import User from '../models/User'
import userService from '../services/user.service'
import { BadRequestError } from '../helpers/apiError'

export const findUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await userService.findById(req.params.userId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
