import { validate } from 'express-validation'
import express from 'express'

import validation from '../../controllers/reference/main/validation'
import { get, create } from '../../controllers/reference/main'

const router = express.Router()

router.get(
  '/reference-main',
  validate(validation.get, { keyByField: true }),
  get
)
router.post(
  '/reference-main',
  // validate(validation.create, { keyByField: true }),
  validation.createValidation,
  create
)

export default router
