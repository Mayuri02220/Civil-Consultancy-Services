import mongoose from 'mongoose'

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },

  email: { type: String, required: true, lowercase: true, trim: true, maxlength: 254 },

  phone: { type: String, required: true, trim: true, maxlength: 30 },

  service: { type: String, required: true, trim: true, maxlength: 100 },

  message: { type: String, required: true, trim: true, maxlength: 5000 },

  timeline: { type: String, trim: true, maxlength: 100 },

  budget: { type: String, trim: true, maxlength: 100 },

  status: { type: String, enum: ['new', 'in-progress', 'closed'], default: 'new' },
},

{ timestamps: true })

inquirySchema.index({ createdAt: -1 })

export default mongoose.model('Inquiry', inquirySchema)