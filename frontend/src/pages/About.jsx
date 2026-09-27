import { Link } from 'react-router-dom'
import PageTitle from '../components/PageTitle'

const principles = [
  { icon: 'bi-bullseye', title: 'Mission', text: 'To deliver reliable, innovative civil engineering solutions that prioritize safety, quality, and sustainability.' },
  { icon: 'bi-eye', title: 'Vision', text: 'To be a trusted leader in civil consultancy, shaping resilient infrastructure for generations to come.' },
  { icon: 'bi-hand-thumbs-up', title: 'Values', text: 'Integrity, safety, collaboration, excellence, and sustainability guide every project we undertake.' },
]

const team = [
  { image: '/assets/img/construction/team-1.webp', name: 'Civil Engineering Team', role: 'Technical Excellence', text: 'Experienced professionals dedicated to practical, dependable project delivery.' },
  { image: '/assets/img/construction/team-2.webp', name: 'Design & Analysis Team', role: 'Design & Analysis', text: 'Focused on accurate engineering, coordination, and constructible solutions.' },
  { image: '/assets/img/construction/team-3.webp', name: 'Project Delivery Team', role: 'Construction Delivery', text: 'Keeping every project aligned with quality, safety, and schedule.' },
]

export default function About() {
  return (
    <section className="about">
      {/* <PageTitle title="About Us" subtitle="Building infrastructure with integrity, precision, and expertise." /> */}

      <div className="about-hero">
        <img src="/assets/img/construction/showcase-2.webp" alt="Construction site with cranes" />
        <div className="about-hero-overlay">
          <div className="container">
            <p className="about-kicker">Civil Consultancy Services</p>
            <h1>Building infrastructure<br />with purpose</h1>
            <a href="#our-story" className="about-hero-link">Our Story <i className="bi bi-arrow-down"></i></a>
          </div>
        </div>
      </div>

      <div id="our-story" className="container about-story py-5">
        <div className="about-story-heading">
          <span className="about-kicker">           </span>
          <h2>Engineering better places to live, work, and grow.</h2>
        </div>
        <div className="about-story-grid">
          <div className="about-story-copy">
            <h3>Our Story</h3>
            <p>Founded with a commitment to dependable engineering, Civil Consultancy Services delivers safe, sustainable, and practical solutions for communities and industry.</p>
            <p>From detailed project reports and structural design to BIM coordination, surveys, and quality control, our team brings technical clarity to every stage of a project.</p>
            <div className="about-stats">
              <div><strong>350+</strong><span>Projects Completed</span></div>
              <div><strong>3+</strong><span>Years Experience</span></div>
              <div><strong>99%</strong><span>Client Satisfaction</span></div>
            </div>
          </div>
          <div className="about-story-image">
            <img src="/assets/img/construction/BIM-3D-Modeling-1024x683 (1) 1.png" alt="Civil engineering plans and construction work" />
          </div>
        </div>
      </div>

      <section className="about-principles">
        <div className="container">
          <div className="section-title text-center">
            <h2>Mission · Vision · Values</h2>
          </div>
          <div className="about-principles-grid">
            {principles.map(principle => (
              <article className="about-principle" key={principle.title}>
                <div className="about-principle-icon"><i className={`bi ${principle.icon}`}></i></div>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="team about-team">
        <div className="container">
          <div className="section-title text-center">
            <h2>Meet Our Team</h2>
            <p>Experienced professionals dedicated to engineering excellence.</p>
          </div>
          <div className="row gy-4">
            {team.map(member => (
              <div className="col-lg-4 col-md-6" key={member.name}>
                <article className="team-member">
                  <div className="member-img"><img src={member.image} alt={member.name} /></div>
                  <div className="member-info">
                    <h4>{member.name}</h4>
                    <span>{member.role}</span>
                    <p>{member.text}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
          <div className="text-center about-team-cta">
            <Link to="/contact" className="btn btn-primary">Work with our team</Link>
          </div>
        </div>
      </section>
    </section>
  )
}
