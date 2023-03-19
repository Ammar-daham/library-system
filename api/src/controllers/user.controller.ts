import { Request, Response, NextFunction } from 'express'
import User from '../models/user'
import userService from '../services/user.service'
import { BadRequestError } from '../helpers/apiError'
import bcrypt from 'bcrypt'

export const findAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.json(await userService.findAllUsers())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// POST /user
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, first_name, last_name, email, password } = req.body

    if (!password || password.length < 3) {
      res
        .status(400)
        .json({ error: 'Password required must have at least 3 characters' })
        .end()
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      first_name,
      last_name,
      email,
      passwordHash,
    })

    await userService.create(user)
    res.json(user)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
