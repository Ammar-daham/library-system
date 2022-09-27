import express from 'express'
import passport from 'passport'
const router = express.Router()

router.post(
  '/login',
  passport.authenticate('google-id-token', { session: false }),
  (req, res) => {
    console.log('req: ', req.user)
    res.json({ msg: 'done', user: req.user })
  }
)

export default router
