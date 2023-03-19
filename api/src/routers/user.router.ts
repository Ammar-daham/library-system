import express from 'express'
const router = express.Router()
import { findAllUsers, createUser } from '../controllers/user.controller'
import { login } from '../controllers/login'

router.post('/login', login)
router.post('/', createUser)
router.get('/', findAllUsers)

export default router
