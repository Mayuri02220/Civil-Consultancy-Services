import { useParams } from 'react-router-dom'
import PageTitle from '../components/PageTitle'

export default function ProjectDetail() {
  const { slug } = useParams()

  return (
    <section className="project-detail">
      <PageTitle title="Project Details" />
      <div className="container">
        <p>Project detail page for: {slug}</p>
      </div>
    </section>
  )
}
