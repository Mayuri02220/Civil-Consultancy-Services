const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const isValidEmail = (value) => typeof value === 'string'
  && value.length <= 254
  && emailPattern.test(value.trim())

export const cleanText = (value) => typeof value === 'string' ? value.trim() : ''

export const validateInquiry = (body = {}) => {
  if (!body || typeof body !== 'object' || Array.isArray(body)) body = {}

  const inquiry = {
    name: cleanText(body.name),
    email: cleanText(body.email).toLowerCase(),
    phone: cleanText(body.phone),
    service: cleanText(body.service || body.type),
    message: cleanText(body.message),
    timeline: cleanText(body.timeline),
    budget: cleanText(body.budget),
  }

  if (!inquiry.name || inquiry.name.length > 100) return 'Name is required and must be at most 100 characters.'
  if (!isValidEmail(inquiry.email)) return 'A valid email address is required.'
  if (!inquiry.phone || inquiry.phone.length > 30) return 'Phone is required and must be at most 30 characters.'
  if (!inquiry.service || inquiry.service.length > 100) return 'Service is required and must be at most 100 characters.'
  if (!inquiry.message || inquiry.message.length > 5000) return 'Message is required and must be at most 5000 characters.'
  if (inquiry.timeline.length > 100 || inquiry.budget.length > 100) return 'Timeline and budget must be at most 100 characters.'

  return inquiry
}