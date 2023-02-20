import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { BadRequestError } from '../helpers/apiError'
import { Request, Response, NextFunction } from 'express'
import User from '../models/user'
import { JWT_SECRET } from '../util/secrets'

// POST /login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash)
    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: 'invalid username or password',
      })
    }
    const userForToken = {
      email: user.email,
      id: user._id,
    }
    const token = jwt.sign(userForToken, JWT_SECRET, {
      expiresIn: 60 * 60,
    })
    res.status(200).send({ token, username: user.username, name: user.email })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
