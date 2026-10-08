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
               <div className="project-grid">
                 {PROJECTS.map((p, i) => (
                   <div key={p.slug} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={100 + (i % 3) * 100}>
                     <div className="project-card">
                      <div className="project-image">
                         <img src={p.image} alt={p.title} className="img-fluid" />
                         <div className={`project-status ${p.status}`}>
                           {p.status === 'in-progress' ? 'Ongoing' : p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                         </div>
                       </div>
                       <div className="project-info">
                         <h4 className="project-title">{p.title}</h4>
                         <div className="project-meta">
                           <span><i className="bi bi-geo-alt"></i> {p.location}</span>
                           <span><i className="bi bi-calendar"></i> {p.duration}</span>
                         </div>
                         <Link to={`/projects/${p.slug}`} className="project-category">{p.category}</Link>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           </section>
  )
}
