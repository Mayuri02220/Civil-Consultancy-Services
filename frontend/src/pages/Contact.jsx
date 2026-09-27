import { useState } from 'react'
import PageTitle from '../components/PageTitle'

const initialForm = { name: '', email: '', phone: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm(currentForm => ({ ...currentForm, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus('sent')
    setForm(initialForm)
  }

  return (
    <section className="contact">
      {/* <PageTitle title="Contact Us" subtitle="Have a project in mind? Connect with Civil Consultancy Services and let us help you plan the next step." /> */}
  
  <h2>Get in Touch with Civil Consultancy Services</h2>
  <p>Have a project to discuss? Licensed civil engineers are here to help - We respond within 24 hours</p>
      <div className="container py-5">
        <div className="contact-main-wrapper">
          <div className="contact-content">
            <div className="contact-cards-container">
              <div className="contact-card">
                <div className="icon-box"><i className="bi bi-geo-alt-fill"></i></div>
                <div className="contact-text">
                  <h4>Office Location</h4>
                  <p>Karad, Maharashtra, India</p>
                </div>
              </div>
              <div className="contact-card">
                <div className="icon-box"><i className="bi bi-telephone-fill"></i></div>
                <div className="contact-text">
                  <h4>Phone</h4>
                  <p><a href="tel:+9176344">+91 76344 xxxxx</a></p>
                </div>
              </div>
              <div className="contact-card">
                <div className="icon-box"><i className="bi bi-envelope-fill"></i></div>
                <div className="contact-text">
                  <h4>Email</h4>
                  <p><a href="mailto:civilconsultancyservices@gmail.com">civilconsultancyservices@gmail.com</a></p>
                </div>
              </div>
              <div className="contact-card">
                <div className="icon-box"><i className="bi bi-clock-fill"></i></div>
                <div className="contact-text">
                  <h4>Working Hours</h4>
                  <p>Monday - Saturday<br />9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
              <h3>Send us a message</h3>
              <p>Tell us what you need and our team will get back to you shortly.</p>
              <form className="php-email-form" onSubmit={handleSubmit}>
                <div className="row gy-3">
                  <div className="col-md-6">
                    <input className="form-control" name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <input className="form-control" name="email" type="email" placeholder="Your email" value={form.email} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <input className="form-control" name="phone" type="tel" placeholder="Your phone number" value={form.phone} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <input className="form-control" name="subject" type="text" placeholder="Subject" value={form.subject} onChange={handleChange} required />
                  </div>
                  <div className="col-12">
                    <textarea className="form-control" name="message" rows="5" placeholder="How can we help you?" value={form.message} onChange={handleChange} required></textarea>
                  </div>
                  <div className="col-12 form-submit">
                    {status === 'sent' && <p className="client-form-success" role="status">Thank you. Our team will contact you shortly.</p>}
                    <button type="submit">Submit</button>
                  </div>
                </div>
              </form>
            </div>
        </div>
      </div>
    </section>
  )
}
