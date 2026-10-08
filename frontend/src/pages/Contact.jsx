export default function Contact() {
  return (
    <section className="contact">
      <h2>Get in Touch with Civil Consultancy Services</h2>
      <p>Have a project to discuss? Licensed civil engineers are here to help - We respond within 24 hours</p>

      <div className="container py-5">
        {/* <div className="contact-main-wrapper"> */}
          <div className="contact-content">
            <div className="contact-cards-container">
              <div className="contact-card">
                <div className="icon-box"><i className="bi bi-geo-alt-fill"></i></div>
                <div className="contact-text">
                  <h4>Office Location</h4>
                  <p>Karad, Maharashtra, India</p>
                </div>
              </div>
              <div className="contact-card">
                <div className="icon-box"><i className="bi bi-telephone-fill"></i></div>
                <div className="contact-text">
                  <h4>Phone</h4>
                  <p><a href="tel:+9176344">+91 76344 xxxxx</a></p>
                </div>
              </div>
              <div className="contact-card">
                <div className="icon-box"><i className="bi bi-envelope-fill"></i></div>
                <div className="contact-text">
                  <h4>Email</h4>
                  <p><a href="mailto:civilconsultancyservices@gmail.com">civilconsultancyservices@gmail.com</a></p>
                </div>
              </div>
              <div className="contact-card">
                <div className="icon-box"><i className="bi bi-clock-fill"></i></div>
                <div className="contact-text">
                  <h4>Working Hours</h4>
                  <p>Monday - Saturday<br />9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        {/* </div> */}
      </div>
    </section>
  )
}
