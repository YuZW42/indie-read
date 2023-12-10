import React from 'react';

const ContactSection: React.FC = () => {
  const handleContactClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };
  return (
    <div>
      <section>
        <div className="about-section">
          <h1>Contact Us Page</h1>
          <p>Some text about who we are and what we do.</p>
          <p>Resize the browser window to see that this page is responsive by the way.</p>
        </div>

        <h2 style={{ textAlign: 'center' }}>Our Team</h2>
        <div className="row">
          <div className="column">
            <div className="card">
              <img src="/w3images/team1.jpg" alt="Jane" style={{ width: '100%' }} />
              <div className="container">
                <h2>Ash Wei</h2>
                <p className="title">Project Leader & UI Designer</p>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                <p>jane@example.com</p>
                <button className="button" onClick={() => handleContactClick('email3@example.com')}>
          Contact Email 3
        </button>
              </div>
            </div>
          </div>

          <div className="column">
            <div className="card">
              <img src="/w3images/team2.jpg" alt="Mike" style={{ width: '100%' }} />
              <div className="container">
                <h2>William Zeng</h2>
                <p className="title">Technical Developer</p>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                <p>yuzeng@bu.edu</p>
                <button className="button" onClick={() => handleContactClick('mattiwane@gmail.com')}>
          Contact Email 3
        </button>
              </div>
            </div>
          </div>

          <div className="column">
            <div className="card">
              <img src="/w3images/team3.jpg" alt="John" style={{ width: '100%' }} />
              <div className="container">
                <h2>Matthew Iwane </h2>
                <p className="title">Technical Developer</p>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                <p>john@example.com</p>
                <p>          
                  <button className="button" onClick={() => handleContactClick('email3@example.com')}>
          Contact Email 3
        </button></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactSection;
