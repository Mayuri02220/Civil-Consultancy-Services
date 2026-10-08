import { Router } from 'express'
import Inquiry from '../models/Inquiry.js'
import { requireAdminKey } from '../middleware/adminKey.js'
import { validateInquiry } from '../utils/validation.js'

const router = Router()

router.post('/', async (request, response, next) => {
  try {
    const inquiry = validateInquiry(request.body)
    if (typeof inquiry === 'string') return response.status(400).json({ message: inquiry })

    const savedInquiry = await Inquiry.create(inquiry)
    return response.status(201).json({
      message: 'Inquiry received.',
      data: { id: savedInquiry.id, status: savedInquiry.status },
    })
  } catch (error) {
    return next(error)
  }
})

router.get('/', requireAdminKey, async (request, response, next) => {
  try {
    const page = Math.max(1, Number.parseInt(request.query.page, 10) || 1)
    const limit = Math.min(100, Math.max(1, Number.parseInt(request.query.limit, 10) || 20))
    const filter = ['new', 'in-progress', 'closed'].includes(request.query.status)
      ? { status: request.query.status }
      : {}

    const [items, total] = await Promise.all([
      Inquiry.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      Inquiry.countDocuments(filter),
    ])

    return response.json({ data: { items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } } })
  } catch (error) {
    return next(error)
  }
})

router.patch('/:id/status', requireAdminKey, async (request, response, next) => {
  try {
    const { status } = request.body
    if (!['new', 'in-progress', 'closed'].includes(status)) {
      return response.status(400).json({ message: 'Status must be new, in-progress, or closed.' })
    }

    const inquiry = await Inquiry.findByIdAndUpdate(request.params.id, { status }, { new: true, runValidators: true })
    if (!inquiry) return response.status(404).json({ message: 'Inquiry not found.' })
    return response.json({ message: 'Inquiry status updated.', data: { id: inquiry.id, status: inquiry.status } })
  } catch (error) {
    if (error.name === 'CastError') return response.status(400).json({ message: 'Inquiry id is invalid.' })
    return next(error)
  }
})

export default router