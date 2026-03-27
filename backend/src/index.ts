import express from 'express'
import { BannersController } from './modules/banners/banners.controller.js'

const app = express()

app.use(express.json())

const bannersController = new BannersController()

// ENDPOINT DE USUARIOS
app.post('/api/users', (req, res) => {
  const user = req.body

  res.json({
    message: 'User created',
    user
  })
})

// ENDPOINT DE BANNERS
app.get('/api/banners', (req, res) => bannersController.getBanners(req, res))

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})