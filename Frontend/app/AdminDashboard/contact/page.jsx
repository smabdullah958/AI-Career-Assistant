export default function ContactPage() {
  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Contact</h1>
        <p>Manage communication and support information for your users.</p>
      </header>

      <section className="admin-contact-grid">
        <div className="admin-card">
          <h3>Email Support</h3>
          <p>support@aicareerassistant.com</p>
        </div>
        <div className="admin-card">
          <h3>Phone</h3>
          <p>+1 (555) 123-4567</p>
        </div>
        <div className="admin-card">
          <h3>Office</h3>
          <p>123 Career Avenue, New York, NY</p>
        </div>
      </section>

      <section className="admin-panel">
        <h2>Contact Form</h2>
        <div className="admin-list">
          <div className="admin-list-item">
            <strong>Response time</strong>
            <span>
              Average reply time is under 2 hours during business days.
            </span>
          </div>
          <div className="admin-list-item">
            <strong>Support team</strong>
            <span>
              Customer success and engineering teams are available for help.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
