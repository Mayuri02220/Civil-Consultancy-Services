import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('mobile-nav-active', mobileOpen)
  }, [mobileOpen])

  return (
    <header id="header" className={`header d-flex align-items-center fixed-top${scrolled ? ' scrolled' : ''}`}>
      <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
        <Link to="/" className="logo d-flex align-items-center">
          <img src="/assets/img/consultancy-logo.png" alt="Civil Consultancy Services" />
        </Link>

        <nav id="navmenu" className="navmenu">
          <ul>
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/services">Services</NavLink></li>
            <li><NavLink to="/projects">Projects</NavLink></li>
            <li><NavLink to="/clients" onClick={() => setMobileOpen(false)}>Clients</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
          {/* <i
            className={`mobile-nav-toggle d-xl-none bi ${mobileOpen ? 'bi-x' : 'bi-list'}`}
            onClick={() => setMobileOpen(v => !v)}
          /> */}
        </nav>

        <div className="header-auth-links">
          <Link className="header-login-link" to="/login">Log in</Link>
          <Link className="header-register-link" to="/register">Register</Link>
        </div>
      </div>
    </header>
  )
}
