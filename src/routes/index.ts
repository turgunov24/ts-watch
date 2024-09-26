import express from 'express'

import referencesCountries from './reference/countries'
import referencesRegions from './reference/regions'
import referencesDistricts from './reference/districts'
import usersRoutes from './users'
import authRoutes from './auth'

const router = express.Router()

router.use(authRoutes)
router.use(usersRoutes)
router.use(referencesCountries)
router.use(referencesRegions)
router.use(referencesDistricts)

export default router
