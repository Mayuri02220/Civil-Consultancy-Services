import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer id="footer" className="footer dark-background">
      <div className="container">
        <div className="row gy-5">
          <div className="col-lg-4 footer-brand-column">
            <div className="footer-brand">
              <Link to="/" className="logo d-flex align-items-center mb-3">
                <img src="/assets/img/consultancy-logo.png" alt="Civil Consultancy Services" />
              </Link>
              <p className="tagline">Engineering Expertise. Digital Precision.</p>
              <div className="social-links mt-4">
                <a href="#" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
                <a href="#" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
                <a href="#" aria-label="LinkedIn"><i className="bi bi-linkedin"></i></a>
                <a href="#" aria-label="Twitter"><i className="bi bi-twitter-x"></i></a>
              </div>
            </div>
          </div>

          <div className="col-lg-2 footer-links-grid">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/projects">Projects</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 footer-links-grid">
            <h5>Services</h5>
            <ul className="list-unstyled">
              <li><Link to="/services">All Services</Link></li>
              <li><Link to="/services/bim">BIM Services</Link></li>
              <li><Link to="/services/consultancy">Consultancy</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 footer-contact-column">
            <h5>Contact</h5>
            <ul className="footer-contact-links">
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
            <div className="footer-cta">
              <Link to="/contact" className="btn btn-outline">Get in Touch</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p className="mb-0">© <span className="sitename">Civil Consultancy Services</span>. All rights reserved.</p>
            <div className="credits">Designed by Civil Consultancy Services</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
