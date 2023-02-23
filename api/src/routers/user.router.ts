import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../util/secrets'
import { findAllUsers, createUser } from '../controllers/user.controller'
import { login } from '../controllers/login'
const router = express.Router()

router.post(
  '/login',
  passport.authenticate('google-id-token', { session: false }),
  async (req, res) => {
    const user: any = await req.user
    const token = await jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      JWT_SECRET,
      { expiresIn: '1h' }
    )
    res.json({ token })
  }
)
router.get('/', findAllUsers)
router.post('/', createUser)
router.post('/login/email', login)

export default router
