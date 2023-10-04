import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { BadRequestError } from '../helpers/apiError'
import { Request, Response, NextFunction } from 'express'
import User from '../models/user'
import { JWT_SECRET } from '../util/secrets'
import passport from 'passport'

// POST /google-login
export const loginWithGoogle = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  passport.authenticate(
    'google-id-token',
    { session: false },
    async (err, user) => {
      try {
        if (err) {
          return next(err)
        }
        if (user) {
          console.log('Google user authenticated: ', user)
          const token = await jwt.sign(
            { userId: user._id, isAdmin: user.isAdmin },
            JWT_SECRET,
            { expiresIn: '1h' }
          )
          return res
            .status(200)
            .json({ token, username: user.username, name: user.email })
        }

        const { email, password } = req.body
        console.log('req body:', req.body)
        const userFromDB = await User.findOne({ email })

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
    }
  )(req, res, next)
}

// POST /login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  (async (err, user) => {
    try {
      const { username, password } = req.body
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
