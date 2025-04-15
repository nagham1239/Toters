import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section about">
          <h3>About Toters</h3>
          <p>
            Toters is your one-stop online grocery shop offering fresh produce,
            quality products, and unbeatable offers.
          </p>
        </div>

      
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
          </ul>
        </div>

      
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Email: info@Toters.com</p>
          <p>Phone: +961 81 995 679</p>
          <p>Address: 123 Main St, Mechref, Lebanon</p>
        </div>

      
        <div className="footer-section newsletter">
          <h3>Newsletter</h3>
          <p>Subscribe for the latest updates and offers.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your Email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p className='copyRight'>&copy; {new Date().getFullYear()} Toters. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;