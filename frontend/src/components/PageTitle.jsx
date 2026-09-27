import { Link } from 'react-router-dom'

export default function PageTitle({ title, subtitle, breadcrumbs, bg }) {
  return (
    <div
      className="page-title dark-background"
      style={{ backgroundImage: `url(${bg || '/assets/img/construction/showcase-2.webp'})` }}
    >
      <div className="container position-relative">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        <nav className="breadcrumbs">
          <ol>
            <li><Link to="/">Home</Link></li>
            {breadcrumbs?.map((b, i) => (
              <li key={i} className={i === breadcrumbs.length - 1 ? 'current' : ''}>
                {b.href ? <Link to={b.href}>{b.label}</Link> : b.label}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  )
}
