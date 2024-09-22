import express, { Request, Response } from 'express'

import referenceMainRoutes from './reference/main'
import usersRoutes from './users'
import authRoutes from './auth'

const router = express.Router()

router.use(authRoutes)
router.use(usersRoutes)
router.use(referenceMainRoutes)
router.use('/validation', (req: Request, res: Response) => {
  res.json({ s: 1 })
})

export default router
