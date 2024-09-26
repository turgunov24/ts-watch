import express from 'express'

import {
  get,
  create,
  update,
  remove,
} from '../../controllers/reference/regions'
import validation from '../../controllers/reference/regions/validation'
import { validationMiddleware } from '../../utils/validation'

const router = express.Router()

router.get('/references/regions', validationMiddleware(validation.get), get)
router.post(
  '/references/regions',
  validationMiddleware(validation.create),
  create
)
router.put(
  '/references/regions',
  validationMiddleware(validation.update),
  update
)
router.delete(
  '/references/regions',
  validationMiddleware(validation.remove),
  remove
)

export default router
