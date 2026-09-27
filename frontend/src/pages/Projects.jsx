import PageTitle from '../components/PageTitle'
import { Link } from 'react-router-dom'
import { PROJECTS } from '../data'

export default function Projects() {
  return (
    <section className="projects">
      {/* <PageTitle title="Our Projects" /> */}
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
  )
}
