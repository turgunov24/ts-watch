import express from 'express'

import { get, create, update, remove } from '../../controllers/reference/main'
import validation from '../../controllers/reference/main/validation'
import { validationMiddleware } from '../../utils/validation'

const router = express.Router()

router.get('/reference-main', validationMiddleware(validation.get), get)
router.post('/reference-main', validationMiddleware(validation.create), create)
router.put('/reference-main', validationMiddleware(validation.update), update)
router.delete(
  '/reference-main',
  validationMiddleware(validation.remove),
  remove
)

export default router
