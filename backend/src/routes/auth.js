import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Client from '../models/Client.js'
import { requireAuth } from '../middleware/auth.js'
import { cleanText, isValidEmail } from '../utils/validation.js'

const router = Router()
const createToken = (clientId) => jwt.sign(
  { sub: clientId },
  process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRES_IN || '1d' },
)

router.post('/register', async (request, response, next) => {
  try {
    const body = request.body || {}
    const name = cleanText(body.name)
    const email = cleanText(body.email).toLowerCase()
    const password = body.password

    if (!name || name.length > 100) return response.status(400).json({ message: 'Name is required and must be at most 100 characters.' })
    if (!isValidEmail(email)) return response.status(400).json({ message: 'A valid email address is required.' })
    if (typeof password !== 'string' || password.length < 8 || password.length > 128) {
      return response.status(400).json({ message: 'Password must be between 8 and 128 characters.' })
    }

    const passwordHash = await bcrypt.hash(password, 12)
    const client = await Client.create({ name, email, passwordHash })
    return response.status(201).json({
      message: 'Account created.',
      data: { client: { id: client.id, name: client.name, email: client.email }, token: createToken(client.id) },
    })
  } catch (error) {
    return next(error)
  }
})

router.post('/login', async (request, response, next) => {
  try {
    const body = request.body || {}
    const email = cleanText(body.email).toLowerCase()
    const password = body.password

    if (!isValidEmail(email) || typeof password !== 'string') {
      return response.status(400).json({ message: 'A valid email and password are required.' })
    }

    const client = await Client.findOne({ email }).select('+passwordHash')
    const passwordMatches = client && await bcrypt.compare(password, client.passwordHash)

    if (!passwordMatches) return response.status(401).json({ message: 'Email or password is incorrect.' })
    await Client.updateOne(
      { _id: client._id },
      { $set: { lastLoginAt: new Date() }, $inc: { loginCount: 1 } },
    )

    return response.json({
      message: 'Login successful.',
      data: { client: { id: client.id, name: client.name, email: client.email }, token: createToken(client.id) },
    })
  } catch (error) {
    return next(error)
  }
})

router.get('/me', requireAuth, (request, response) => {
  response.json({ data: { client: request.client } })
})

export default router