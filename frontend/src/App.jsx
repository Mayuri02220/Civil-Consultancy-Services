import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollTop from './components/ScrollTop'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Clients from './pages/Clients'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import AuthPage from './pages/Auth'
// import Quote from './pages/Quote'
import ProjectDetail from './pages/ProjectDetail'
import ServiceDetail from './pages/ServiceDetail'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
// import NotFound from './pages/NotFound'

export default function App() {
  useEffect(() => {
    AOS.init({ duration: 600, easing: 'ease-in-out', once: true, mirror: false })
  }, [])

  return (
    <BrowserRouter>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/register" element={<AuthPage mode="register" />} />
          {/* <Route path="/quote" element={<Quote />} /> */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>
      <Footer />
      <ScrollTop />
    </BrowserRouter>
  )
}
