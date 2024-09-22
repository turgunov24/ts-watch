import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import { connect } from '../config/db'
import routes from './routes'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(port, async () => {
  try {
    connect()
  } catch (error: unknown) {
    console.log(error)
  }
})
