import jwt from 'jsonwebtoken'
import Client from '../models/Client.js'

export const requireAuth = async (request, response, next) => {
  const authorization = request.get('authorization') || ''
  const [scheme, token] = authorization.split(' ')

  if (scheme !== 'Bearer' || !token) {
    return response.status(401).json({ message: 'A bearer token is required.' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const client = await Client.findById(payload.sub).select('name email')

    if (!client) return response.status(401).json({ message: 'Client account no longer exists.' })
    request.client = client
    return next()
  } catch {
    return response.status(401).json({ message: 'Token is invalid or expired.' })
  }
}