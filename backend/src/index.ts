import * as dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(__dirname, '../.env') })

import express from 'express'
import cors from 'cors'
import { propertiesController } from './modules/properties/properties.controller.js'

const app = express()

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json())

app.post('/api/users', (req, res) => {
  const user = req.body
  res.json({ message: 'User created', user })
})

app.get('/api/inmuebles', propertiesController.getAll)

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
