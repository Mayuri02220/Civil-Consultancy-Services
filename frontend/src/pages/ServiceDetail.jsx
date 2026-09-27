import { useParams } from 'react-router-dom'
import PageTitle from '../components/PageTitle'

export default function ServiceDetail() {
  const { slug } = useParams()

  return (
    <section className="service-detail">
      <PageTitle title="Service Details" />
      <div className="container">
        
        <p><strong>Service detail then contact to team of civil consulancy services.<br />We are here to help you with your civil engineering needs. Please reach out to us for more information about our services.</strong></p>
      </div>
    </section>
    
  )
}
