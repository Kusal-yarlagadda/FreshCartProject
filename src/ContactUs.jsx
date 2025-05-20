import React from 'react';
import './ContactUs.css';

function ContactUs() {
  return (
    <div className="contact-page">
      <h1 className="main-heading">Keep in Touch</h1>
      
      {/* Contact Info and Message Form Side by Side */}
      <div className="contact-form-wrapper">
        <div className="contact-details">
          <h2>Contact Information</h2>
          <p><strong>Email:</strong> kusalyarlagadda@gmail.com</p>
          <p><strong>Phone:</strong> 9959146226</p>
          <p><strong>Address:</strong> Sulthanagaram, Machilipatnam</p>
        </div>

        <div className="message-form">
          <h2>Send Us a Message</h2>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
      
      {/* Social Media Section */}
      <div className="social-section">
        <h2>Follow Us On</h2>
        <div className="social-links">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Instagram" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" />
          </a>
        </div>
      </div>

      {/* Updated Map Section */}
      <div className="map-section">
        <h2>Our Location</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3803.173156351393!2d81.1108471748178!3d16.199939555927562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3751a3e04c3a4d%3A0xc49f276a0173bf0c!2sSulthanagaram%2C%20Machilipatnam%2C%20Andhra%20Pradesh%20521901!5e0!3m2!1sen!2sin!4v1688959892376!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0, borderRadius: '8px' }}
          allowFullScreen=""
          loading="lazy"
          title="Location Map"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default ContactUs;
