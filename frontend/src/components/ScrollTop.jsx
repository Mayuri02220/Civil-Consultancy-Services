import { useState, useEffect } from 'react'

export default function ScrollTop() {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const onScroll = () => setActive(window.scrollY > 100)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href="#"
      id="scroll-top"
      className={`scroll-top d-flex align-items-center justify-content-center${active ? ' active' : ''}`}
      onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
    >
      <i className="bi bi-arrow-up-short"></i>
    </a>
  )
}
