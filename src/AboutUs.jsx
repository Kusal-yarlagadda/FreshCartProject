import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <h1 className="hero-title">Welcome to FreshCart</h1>
        <p className="hero-description">
          Delivering the freshest Veg, Non-Veg, Dairy Products, and Fruits to your doorstep. Quality and freshness guaranteed!
        </p>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2 className="section-title">Who We Are</h2>
        <p className="section-description">
          At FreshCart, we are revolutionizing grocery shopping by providing high-quality, fresh products with unmatched convenience. Our commitment is to deliver excellence in every order.
        </p>
      </section>

      {/* Mission, Vision, and Why Choose Us */}
      <section className="mission-vision-choose">
        <div className="card">
          <img src="/images/mission.jpg" alt="Mission" className="card-image" />
          <h3 className="card-title">Our Mission</h3>
          <p className="card-text">
            To provide high-quality fresh products with convenience and trust, making your shopping experience effortless and enjoyable.
          </p>
        </div>
        <div className="card">
          <img src="/images/vision.jpg" alt="Vision" className="card-image" />
          <h3 className="card-title">Our Vision</h3>
          <p className="card-text">
            To be the leading online grocery platform, delivering freshness and satisfaction to every household.
          </p>
        </div>
        <div className="card">
          <img src="/images/choose.jpg" alt="Why Choose Us" className="card-image" />
          <h3 className="card-title">Why Choose Us</h3>
          <p className="card-text">
            Freshness you can trust, timely delivery, competitive prices, and a seamless shopping experience. At FreshCart, your convenience is our priority.
          </p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="about-footer">
        <p>&copy; 2025 FreshCart. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AboutUs;
