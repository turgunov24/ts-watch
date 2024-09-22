import { create, get, update, remove } from '../../controllers/reference/main'
import { authenticateToken } from '../../middlewares/authentificateToken'
import express from 'express'

const router = express.Router()

router.get('/reference-main', get)
router.post('/reference-main', create)
router.put('/reference-main', update)
router.delete('/reference-main', remove)

export default router
