import express from 'express'

import {
  get,
  create,
  update,
  remove,
} from '../../controllers/reference/countries'
import validation from '../../controllers/reference/countries/validation'
import { validationMiddleware } from '../../utils/validation'

const router = express.Router()

router.get('/references/countries', validationMiddleware(validation.get), get)
router.post(
  '/references/countries',
  validationMiddleware(validation.create),
  create
)
router.put(
  '/references/countries',
  validationMiddleware(validation.update),
  update
)
router.delete(
  '/references/countries',
  validationMiddleware(validation.remove),
  remove
)

export default router
