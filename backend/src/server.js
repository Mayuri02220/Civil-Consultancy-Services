import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import inquiryRoutes from './routes/inquiries.js'

const app = express()
const port = Number(process.env.PORT) || 5000
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(helmet())
app.use(cors({ origin: allowedOrigins }))
app.use(express.json({ limit: '10kb' }))

app.get('/api/health', (_request, response) => {
  const databaseConnected = mongoose.connection.readyState === 1

  response.status(databaseConnected ? 200 : 503).json({
    status: databaseConnected ? 'ok' : 'unavailable',
    database: databaseConnected ? 'connected' : 'disconnected',
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/inquiries', inquiryRoutes)

app.use((_request, response) => {
  response.status(404).json({ message: 'Route not found.' })
})

app.use((error, _request, response, _next) => {
  if (error.type === 'entity.parse.failed') {
    return response.status(400).json({ message: 'Request body must contain valid JSON.' })
  }

  if (error.code === 11000) {
    return response.status(409).json({ message: 'An account with this email already exists.' })
  }

  console.error(error)
  return response.status(500).json({ message: 'An unexpected server error occurred.' })
})

const start = async () => {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is required.')
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters long.')
  }

  await mongoose.connect(process.env.MONGODB_URI)
  app.listen(port, () => console.log(`API listening on http://localhost:${port}`))
}

start().catch((error) => {
  console.error(`Unable to start API: ${error.message}`)
  process.exit(1)
})