import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { initDB } from './src/config/database.js'
import authRoutes from './src/routes/authRoutes.js'
import financeRoutes from './src/routes/financeRoutes.js'
import moduleRoutes from './src/routes/moduleRoutes.js'
import userRoutes from './src/routes/userRoutes.js'
import quizRoutes from './src/routes/quizRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors({
  origin: '*'
}))
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'FinBear API is running 🐻' })
})
app.use('/auth', authRoutes)
app.use('/finance', financeRoutes)
app.use('/modules', moduleRoutes)
app.use('/user', userRoutes)
app.use('/kuis', quizRoutes)

// Start server
const startServer = async () => {
  try {
    await initDB()
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()