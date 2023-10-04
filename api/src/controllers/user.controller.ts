import { Request, Response, NextFunction } from 'express'
import User from '../models/user'
import userService from '../services/user.service'
import { BadRequestError } from '../helpers/apiError'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../util/secrets'

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

// POST /login
export const loginWithGoogle = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  (async (err, user) => {
    try {
      const user = req.body
      if (err) {
        return next(err)
      }
      if (user) {
        console.log('Google user : ', user)
        const token = await jwt.sign(
          { userId: user.id, isAdmin: user.isAdmin },
          JWT_SECRET,
          { expiresIn: '1h' }
        )
        return res
          .status(200)
          .json({ token, username: user.username, email: user.email })
      }

      const { username, password } = req.body
      console.log('req body:', req.body)
      const userFromDB = await User.findOne({ username })

      // Check if user is null
      if (!userFromDB) {
        return res.status(401).json({
          error: 'Invalid username or password',
        })
      }

      const passwordCorrect = await bcrypt.compare(
        password,
        userFromDB.passwordHash
      )
      if (!passwordCorrect) {
        return res.status(401).json({
          error: 'Invalid username or password',
        })
      }
      console.log('User authenticated: ', userFromDB)
      const token = await jwt.sign(
        { userId: userFromDB._id, isAdmin: userFromDB.isAdmin },
        JWT_SECRET,
        { expiresIn: '1h' }
      )
      return res.status(200).json({
        token,
        username: userFromDB.username,
        name: userFromDB.email,
      })
    } catch (error) {
      if (error instanceof Error && error.name == 'ValidationError') {
        next(new BadRequestError('Invalid Request', 400, error))
      } else {
        next(error)
      }
    }
  })(req, res)
}
