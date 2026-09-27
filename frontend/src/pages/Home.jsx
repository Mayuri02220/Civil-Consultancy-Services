import { Link } from 'react-router-dom'
import { SERVICES, PROJECTS, CLIENTS , TESTIMONIALS } from '../data'

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero */}
      <section id="hero" className="hero section dark-background">
        <div className="hero-video-container">
          <video autoPlay muted loop>
            <source src="/assets/img/construction/video-2.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay"></div>
        </div>
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <div className="hero-content">
                <h1 data-aos="fade-up" data-aos-delay="200">Engineering Expertise. Digital Precision.</h1>
                <p data-aos="fade-up" data-aos-delay="300">
                  We deliver comprehensive Civil Consultancy Services and Building Information Modeling (BIM) services with unwavering commitment to quality, safety, and One Time completion.
                </p>
                <div className="hero-actions" data-aos="fade-up" data-aos-delay="400">
                  <Link to="/projects" className="btn btn-secondary">View Projects</Link>
                </div>
                <div className="hero-stats" data-aos="fade-up" data-aos-delay="500">
                  <div className="row">
                    {[['350+', 'Projects Completed'], ['3+', 'Years Experience'], ['99%', 'Client Satisfaction'], ['18', 'Expert Team Members']].map(([num, label]) => (
                      <div key={label} className="col-lg-3 col-md-6">
                        <div className="stat-item">
                          <span className="stat-number">{num}</span>
                          <span className="stat-label">{label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="about section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row align-items-center">
            <div className="col-lg-6 order-2 order-lg-1" data-aos="fade-right" data-aos-delay="200">
              <div className="content">
                <h2 className="section-heading mb-4">Built on Excellence, Driven by Vision</h2>
                <p className="lead-text mb-4">
                  At Civil Consultancy Services, we deliver comprehensive Civil Consultancy Services and Building Information Modeling (BIM) services for clients in India. Based in Karad, Maharashtra, we bring together a team of experienced engineers.
                </p>
                <p className="description-text mb-5">
                  Our expertise lies in civil engineering consultancy, project execution, and advanced BIM solutions. We serve infrastructure needs locally while also offering BIM outsourcing services.
                </p>
                <div className="stats-grid">
                  {[['3+', 'Years Experience'], ['350+', 'Projects Completed'], ['99%', 'Client Satisfaction']].map(([num, label]) => (
                    <div key={label} className="stat-item" data-aos="fade-up">
                      <div className="stat-number">{num}</div>
                      <div className="stat-label">{label}</div>
                    </div>
                  ))}
                </div>
                <div className="cta-section" data-aos="fade-up" data-aos-delay="450">
                  <Link to="/services" className="cta-link">Explore Our Services <i className="bi bi-arrow-right ms-2"></i></Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="200">
              <div className="image-section">
                <div className="main-image">
                  <img src="/assets/img/img-aboutus.png" alt="Civil Consultancy Services" className="img-fluid" />
                </div>
                <div className="floating-badge" data-aos="zoom-in" data-aos-delay="500">
                  <div className="badge-content">
                    <i className="bi bi-award"></i>
                    <div className="badge-text">
                      {/* <span className="badge-title">Quality Certified</span>
                      <span className="badge-subtitle">Since 2018</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="civil-services" className="services section light-background">
        <div className="container section-title" data-aos="fade-up">
          <h2>Services</h2>
          <p>Delivering innovative civil engineering solutions for sustainable infrastructure and development.<br />Our expert team ensures precision and efficiency in every project phase.</p>
        </div>
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <div key={s.slug} className={`service-item${s.featured ? ' featured' : ''}`} data-aos="fade-up" data-aos-delay={150 + i * 50}>
                {s.featured && <div className="featured-badge">Premium</div>}
                <div className="service-number">{s.number}</div>
                <div className="service-icon"><i className={`bi ${s.icon}`}></i></div>
                <h3>{s.title}</h3>
                <p>{s.short}</p>
                <Link to={`/services/${s.slug}`} className="service-cta">
                  <span>Explore Service</span><i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="projects section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Projects</h2>
          <p>A showcase of our completed and ongoing civil engineering and infrastructure projects across India.</p>
        </div>
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4">
            {PROJECTS.map((p, i) => (
              <div key={p.slug} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={100 + (i % 3) * 100}>
                <div className="project-card">
                  <div className="project-image">
                    <img src={p.image} alt={p.title} className="img-fluid" />
                    <div className="project-overlay">
                      <div className={`project-status ${p.status}`}>{p.status === 'in-progress' ? 'In Progress' : p.status.charAt(0).toUpperCase() + p.status.slice(1)}</div>
                      <div className="project-actions">
                        <Link to={`/projects/${p.slug}`} className="btn-project">View Details</Link>
                      </div>
                    </div>
                  </div>
                  <div className="project-info">
                    <div className="project-category">{p.category}</div>
                    <h4 className="project-title">{p.title}</h4>
                    <p className="project-description">{p.description}</p>
                    <div className="project-meta">
                      <span><i className="bi bi-geo-alt"></i> {p.location}</span>
                      <span><i className="bi bi-calendar"></i> {p.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote CTA */}
      <section id="quote" className="quote section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row justify-content-center">
            <div className="col-lg-11">
              <div className="quote-container">
                <div className="row">
                  <div className="col-lg-5" data-aos="fade-right" data-aos-delay="200">
                    <div className="quote-content">
                      <h2>Transform Your Vision Into Reality</h2>
                      <p>Experience construction excellence with our dedicated team. We bring precision, innovation, and uncompromising quality to every project.</p>
                      <div className="quote-benefits">
                        {[['bi-graph-up-arrow', 'Expert Planning', 'Comprehensive project analysis and strategic planning'],
                          ['bi-shield-fill-check', 'Quality Assurance', 'Rigorous quality control at every construction phase'],
                          ['bi-hourglass-split', 'Timely Delivery', 'Commitment to deadlines with efficient project management']].map(([icon, title, desc]) => (
                          <div key={title} className="benefit-item">
                            <div className="benefit-icon"><i className={`bi ${icon}`}></i></div>
                            <div className="benefit-content"><h4>{title}</h4><p>{desc}</p></div>
                          </div>
                        ))}
                      </div>
                      <div className="contact-info">
                        <div className="contact-detail"><i className="bi bi-telephone-fill"></i><span>+91 76344 xxxxx</span></div>
                        <div className="contact-detail"><i className="bi bi-envelope-fill"></i><span>civilconsultancyservices@gmail.com</span></div>
                      </div>
                    </div>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function QuoteFormInline() {
  const [status, setStatus] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: '', timeline: '', budget: '', message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setTimeout(() => setStatus('sent'), 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="php-email-form">
      <div className="form-grid">
        {[['text','name','Full Name','Enter your full name'],['email','email','Email Address','your.email@example.com'],['tel','phone','Phone Number','+91 XXXXX XXXXX']].map(([type, name, label, ph]) => (
          <div key={name} className="form-field">
            <label>{label}</label>
            <input type={type} name={name} placeholder={ph} required value={form[name]} onChange={e => setForm(f => ({...f, [name]: e.target.value}))} />
          </div>
        ))}
        <div className="form-field">
          <label>Project Category</label>
          <select name="type" required value={form.type} onChange={e => setForm(f => ({...f, type: e.target.value}))}>
            <option value="">Choose project type</option>
            <option value="consultancy">Civil Consultancy Services</option>
            <option value="bim">BIM Services</option>
            <option value="engineering">Engineering Services</option>
            <option value="lab">Lab Testing & Survey</option>
            <option value="cad">CAD Drafting</option>
          </select>
        </div>
        <div className="form-field">
          <label>Expected Timeline</label>
          <select name="timeline" required value={form.timeline} onChange={e => setForm(f => ({...f, timeline: e.target.value}))}>
            <option value="">Select timeline</option>
            <option value="immediate">Immediate Start</option>
            <option value="1-3months">1-3 Months</option>
            <option value="3-6months">3-6 Months</option>
            <option value="6months+">6+ Months</option>
          </select>
        </div>
        <div className="form-field">
          <label>Project Budget</label>
          <input type="text" name="budget" placeholder="Budget range (optional)" value={form.budget} onChange={e => setForm(f => ({...f, budget: e.target.value}))} />
        </div>
      </div>
      <div className="form-field full-width">
        <label>Project Description</label>
        <textarea name="message" rows="4" placeholder="Describe your project vision and requirements..." required value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))}></textarea>
      </div>
      {status === 'loading' && <div className="loading">Loading</div>}
      {status === 'sent' && <div className="sent-message" style={{display:'block'}}>Thank you! Your quote request has been received. Our team will contact you within 24 hours.</div>}
      <button type="submit" className="submit-btn"><span>Request Detailed Quote</span><i className="bi bi-arrow-right"></i></button>
    </form>
  )
}

import { useState } from 'react'
