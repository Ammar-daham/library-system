import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../util/secrets'
import { ForbiddenError } from '../helpers/apiError'
import { Role } from '../types'

export function checkAuthAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
  role: Role
) {
  try {
    console.log('role: ', role)
    const authorizationHeader = req.headers.authorization
    if (authorizationHeader) {
      console.log('authorizationHeader: ', authorizationHeader)
      const token = authorizationHeader.split(' ')[1]
      const decodedUser = jwt.verify(token, JWT_SECRET) as any
      console.log('decodedUser: ', decodedUser)

      if (role.isAdmin !== decodedUser.isAdmin) {
        throw new ForbiddenError()
      }

      req.user = decodedUser
      return next()
    }
    throw new ForbiddenError()
  } catch (error) {
    throw new ForbiddenError()
  }
}

export function checkAuthAdminUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader = req.headers.authorization
    if (authorizationHeader) {
      console.log('authorizationHeader: ', authorizationHeader)
      const token = authorizationHeader.split(' ')[1]
      const decodedUser = jwt.verify(token, JWT_SECRET) as any
      console.log('decodedUser: ', decodedUser)

      req.user = decodedUser
      return next()
    }
    throw new ForbiddenError()
  } catch (error) {
    throw new ForbiddenError()
  }
}
