import { Link } from 'react-router-dom'
import PageTitle from '../components/PageTitle'
import { SERVICES } from '../data'

export default function Services() {
  return (
    <section className="services">
      {/* <PageTitle title="Our Services" /> */}
      <div className="container">
        <h2>Services</h2>
        <p>
          Delivering innovative civil engineering solutions for sustainable infrastructure and urban development.<br />
          Our expert team ensures precision and efficiency in every project phase.
        </p>
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
      </div>
    </section>
  )
}
