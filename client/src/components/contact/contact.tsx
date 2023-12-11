import React from 'react';
import pic1 from '../../assets/AshPic.png'
import pic2 from '../../assets/MatPic.png'
import pic3 from '../../assets/YuPic.png'

import { CiLinkedin } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";

import { Footer } from '../shared/Footer';

const ContactSection: React.FC = () => {
  const handleContactClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };
  return (
    <div>
      <section>
        <div className="about-section">
          <h1 id='contact-us'>Contact Us</h1>

          <div className="row">
            <div className="column">
              <div className="card">
                <img src={pic1} alt="Image of Ash Wei" style={{ width: '100%' }} />
                <div className="container">
                  <h2>Ash Wei</h2>
                  <p className="title">Innovator, Designer</p>

                  <button className="button-link"><a href="https://www.instagram.com/yu.x.w/" target="_blank"> <CiInstagram /> Instagram</a></button>
                  <button className="button" onClick={() => handleContactClick('yuxwater@gmail.com')}>
                    Email
                  </button>
                </div>
              </div>
            </div>

            <div className="column">
              <div className="card">
                <img src={pic3} alt="Image of Yu Zeng" style={{ width: '100%' }} />
                <div className="container">
                  <h2>William Zeng</h2>
                  <p className="title">Technical Developer</p>

                  <button className="button-link"><a href="https://www.linkedin.com/in/yu-zeng-08829a213/" target="_blank"><CiLinkedin /> LinkedIn</a></button>
                  <button className="button" onClick={() => handleContactClick('yuzeng@bu.edu')}>
                    Email
                  </button>
                </div>
              </div>
            </div>

            <div className="column">
              <div className="card">
                <img src={pic2} alt="Image of Matthew iwane" style={{ width: '100%' }} />
                <div className="container">
                  <h2>Matthew Iwane </h2>
                  <p className="title">Technical Developer</p>
                  <button className="button-link"><a href="https://www.linkedin.com/in/matthew-iwane/" target="_blank"><CiLinkedin /> LinkedIn</a></button>
                  <button className="button" onClick={() => handleContactClick('mattiwane@gmail.com')}>
                    Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactSection;
