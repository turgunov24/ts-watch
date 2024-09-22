import express from 'express'

import referenceMainRoutes from './reference/main'
import usersRoutes from './users'
import authRoutes from './auth'

const router = express.Router()

router.use(authRoutes)
router.use(usersRoutes)
router.use(referenceMainRoutes)

export default router
