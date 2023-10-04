import express from 'express'
const router = express.Router()
import { findAllUsers, createUser } from '../controllers/user.controller'
import { login, loginWithGoogle } from '../controllers/loginController'

router.post('/login', login)
router.post('/google-login', loginWithGoogle)
router.post('/', createUser)
router.get('/', findAllUsers)

export default router
