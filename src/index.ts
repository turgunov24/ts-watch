import { Joi, validate, ValidationError } from 'express-validation'
import express, { Request, Response } from 'express'
import cors from 'cors'
import 'dotenv/config'

import { connect } from '../config/db'
import routes from './routes'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(routes)

const loginValidation = {
  query: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
  }).options({ abortEarly: false }),
}
app.post(
  '/validation',
  validate(loginValidation, { keyByField: true }, {}),
  (req: Request, res: Response) => {
    res.json({ s: 'success' })
  }
)

app.use(function (err: any, req: any, res: any, next: any) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err)
  }

  return res.status(500).json(err)
})

app.listen(port, async () => {
  try {
    connect()
  } catch (error: unknown) {
    console.log(error)
  }
})
