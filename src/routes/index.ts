import express, { Request, Response } from 'express'
import { ValidationError } from 'express-validation'

import referenceMainRoutes from './reference/main'
import usersRoutes from './users'
import authRoutes from './auth'

const router = express.Router()

router.use(authRoutes)
router.use(usersRoutes)
router.use(referenceMainRoutes)

router.use((err: ValidationError | Error, req: Request, res: Response) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err)
  }

  return res.status(500).json({ message: err.message })
})

export default router
