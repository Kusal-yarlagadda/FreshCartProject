import React from 'react';
import './Home.css';

function Home() {
  const categories = [
    { name: 'Veg', img: '/images/veg.jpg' },
    { name: 'Non-Veg', img: '/images/nonveg.jpg' },
    { name: 'Fruits', img: '/images/fruits.jpg' },
    { name: 'Dairy Products', img: '/images/dairy.jpg' },
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Welcome to  FreshCart</h1>
          <p>Your one-stop destination for fresh groceries, quality dairy, and everyday essentials—delivered right to your doorstep!</p>
          <button className="cta-button">Shop Now</button>
        </div>
      </header>

      {/* Categories Grid */}
      <section className="categories-section">
        <h2>Our Categories</h2>
        <div className="categories-grid">
          {categories.map((cat, index) => (
            <div className="category-card" key={index}>
              <img src={cat.img} alt={cat.name} />
              <h3>{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <p>Contact us: support@FreshCart.com</p>
      </footer>
    </div>
  );
}

export default Home;
