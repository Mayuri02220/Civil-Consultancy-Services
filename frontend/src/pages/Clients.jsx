import { useState } from 'react'
import PageTitle from '../components/PageTitle'
import { CLIENTS, TESTIMONIALS } from '../data'
import { apiRequest } from '../api'

const testimonialImages = [
  '/assets/img/person/person-f-9.webp',
  '/assets/img/person/person-m-8.webp',
  '/assets/img/person/person-f-8.webp',
]

export default function Clients() {
  const [status, setStatus] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm(currentForm => ({ ...currentForm, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      await apiRequest('/inquiries', { method: 'POST', body: form })
      setStatus('sent')
      setForm({ name: '', email: '', phone: '', service: '', message: '' })
    } catch (error) {
      setStatus('error')
      setErrorMessage(error.message)
    }
  }

  return (
    <section className="clients">
      {/* <PageTitle title="Our Clients" subtitle="Trusted by government bodies, private developers, and infrastructure leaders across India and international markets." /> */}

      <div className="container py-5">
        <h2> Welcome Clients </h2>
        <p>
          Share a few details and our consultancy team will get back to you with the right next steps.
        </p>
        <div className="row g-4">
          {CLIENTS.map((client, index) => (
            <div key={client.name} className="col-lg-3 col-md-4 col-sm-6" data-aos="fade-up" data-aos-delay={index * 50}>
              <div className="client-card h-100 text-center p-4 border rounded-4 shadow-sm bg-white">
                {/* <div className="client-logo mb-3">
                  <img src={client.badge} alt={client.name} className="img-fluid" style={{ maxHeight: 90, objectFit: 'contain' }} />
                </div> */}
                {/* <h5 className="mb-0">{client.name}</h5> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container pb-5">
        <div className="client-inquiry">
          <div className="client-inquiry-intro">
            <span className="eyebrow">Start a conversation</span>
            <h2>Tell us about your project</h2>
            <p>Share a few details and our consultancy team will get back to you with the right next step.</p>
          </div>

          <form className="client-inquiry-form" onSubmit={handleSubmit}>
            <div className="client-form-grid">
              <label className="client-form-full">
                Full Name
                <input name="name" type="text" placeholder="Your full name" value={form.name} onChange={handleChange} required />
              </label>
              <label className="client-form-full">
                Email Address
                <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
              </label>
              <label className="client-form-full">
                Phone Number
                <input name="phone" type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} required />
              </label>
              <label className="client-form-full">
                Service Required
                <select name="service" value={form.service} onChange={handleChange} required>
                  <option value="">Choose a service</option>
                  <option value="consultancy">Consultancy Services</option>
                  <option value="engineering">Engineering Services</option>
                  <option value="bim">BIM Services</option>
                  <option value="survey">Lab Testing & Survey</option>
                  <option value="cad">CAD Drafting</option>
                </select>
              </label>
              <label className="client-form-full">
                Project Requirements
                <textarea name="message" rows="5" placeholder="Tell us about your project requirements" value={form.message} onChange={handleChange} required></textarea>
              </label>
            </div>
            {status === 'sent' && <p className="client-form-success" role="status">Thank you. Our team will contact you shortly.</p>}
            {status === 'error' && <p className="client-form-error" role="alert">{errorMessage}</p>}
            <button type="submit" className="client-form-submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Submitting...' : 'Submit'} <i className="bi bi-arrow-right"></i>
            </button>
          </form>
        </div>
      </div>

      <section className="testimonials clients-testimonials section">
        <div className="container">
          <div className="section-title text-center">
            <h2>What Our Clients Say</h2>
            <p>Hear from the teams we have partnered with to deliver successful projects.</p>
          </div>
          <div className="testimonial-masonry">
            {TESTIMONIALS.slice(0, 3).map((testimonial, index) => (
              <div className="testimonial-item" key={testimonial.name}>
                <div className="testimonial-content">
                  <div className="quote-pattern"><i className="bi bi-quote"></i></div>
                  <p>“{testimonial.text}”</p>
                  <div className="client-info">
                    <div className="client-image">
                      <img src={testimonialImages[index]} alt={testimonial.name} />
                    </div>
                    <div className="client-details">
                      <h3>{testimonial.name}</h3>
                      <div className="position">{testimonial.position}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  )
}
