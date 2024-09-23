import { validate } from 'express-validation'
import express from 'express'

import validation from '../controllers/auth/validation'
import loginController from '../controllers/auth/login'

const router = express.Router()

router.post(
  '/login',
  validate(validation, { keyByField: true }),
  loginController
)

export default router
