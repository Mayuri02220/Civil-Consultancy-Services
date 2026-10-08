import { timingSafeEqual } from 'node:crypto'

export const requireAdminKey = (request, response, next) => {
  const configuredKey = process.env.ADMIN_API_KEY
  const suppliedKey = request.get('x-admin-key') || ''

  if (!configuredKey) {
    return response.status(503).json({ message: 'Admin API key is not configured.' })
  }

  const configuredBuffer = Buffer.from(configuredKey)
  const suppliedBuffer = Buffer.from(suppliedKey)
  const matches = configuredBuffer.length === suppliedBuffer.length
    && timingSafeEqual(configuredBuffer, suppliedBuffer)

  if (!matches) return response.status(401).json({ message: 'A valid X-Admin-Key is required.' })
  return next()
}