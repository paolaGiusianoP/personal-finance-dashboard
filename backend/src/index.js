const express = require('express')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/authRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const transactionRoutes = require('./routes/transactionRoutes') 

const app = express()
const PORT = process.env.PORT || 5000

// Middlewares
app.use(cors())
app.use(express.json())

// Rutas
app.use('/api/auth', authRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/transactions', transactionRoutes)  

// Ruta de prueba
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})