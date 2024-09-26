import express from 'express'

import {
  get,
  create,
  update,
  remove,
} from '../../controllers/reference/districts'
import validation from '../../controllers/reference/districts/validation'
import { validationMiddleware } from '../../utils/validation'

const router = express.Router()

router.get('/references/districts', validationMiddleware(validation.get), get)
router.post(
  '/references/districts',
  validationMiddleware(validation.create),
  create
)
router.put(
  '/references/districts',
  validationMiddleware(validation.update),
  update
)
router.delete(
  '/references/districts',
  validationMiddleware(validation.remove),
  remove
)

export default router
