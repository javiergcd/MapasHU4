import express from 'express'
import cors from 'cors';
import { FiltersHomepageController } from './modules/filtershomepage/filtershomepage.controller.js';

const app = express()
app.use(cors());
app.use(express.json())


const filtersController = new FiltersHomepageController();
app.get('/api/filters', filtersController.getFilters);

// ✅ ENDPOINT
app.post('/api/users', (req, res) => {
  const user = req.body

  res.json({
    message: 'User created',
    user
  })
})

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
