import { validate } from 'express-validation'
import express from 'express'

import { get, create, remove, update } from '../controllers/users'
import validation from '../controllers/users/validation'

const router = express.Router()

router.get('/users', validate(validation.get, { keyByField: true }), get)
router.post('/users', validate(validation.create, { keyByField: true }), create)
router.put('/users', validate(validation.update, { keyByField: true }), update)
router.delete('/users', validate(validation.get), remove)

export default router
