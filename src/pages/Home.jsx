import React from 'react';
import { FaShoppingCart, FaTruck, FaHeadset, FaQuoteRight, FaUserCircle } from 'react-icons/fa';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero-content">
          <h1>Welcome to Toters</h1>
          <p>Your trusted partner for premium groceries delivered fresh to your doorstep. Lorem ipsum dolor sit amet consectetur adipisicing elit. A aspernatur ab, non exercitationem sequi animi porro! Tempora distinctio recusandae molestias aspernatur, aperiam impedit? Magni temporibus velit eos a ex expedita.</p>
          <button onClick={() => window.location.href = "/products"} className="home-hero-button">
            <FaShoppingCart /> Shop Now
          </button>
        </div>
        <img
          src="/hero.webp"
          alt="Fresh Groceries"
          className="home-hero-image"
        />
      </section>

      <section className="home-about">
        <div className="home-about-content">
          <div className="home-about-text">
            <h2>About Toters</h2>
            <p>
              At Toters, we are committed to revolutionizing the way you shop for groceries. 
              Our journey began with a simple idea: to make premium-quality groceries accessible to everyone, 
              without the hassle of traditional shopping. We meticulously source the freshest produce, 
              dairy, and pantry essentials from trusted suppliers to ensure that every item you receive 
              meets the highest standards of quality. Whether you're looking for organic fruits, 
              farm-fresh vegetables, or specialty items, Toters has you covered. 
              Our dedicated team works tirelessly to provide a seamless shopping experience, 
              from browsing our extensive catalog to receiving your order at your doorstep. 
              We believe in building lasting relationships with our customers by delivering not just groceries, 
              but also trust, convenience, and satisfaction. Join the Toters family today and discover 
              the difference of shopping with a partner who truly cares about your needs.
            </p>
            <button 
              className="home-about-button" 
              onClick={() => window.location.href = '/about'}
            >
              Learn More About Us
            </button>
          </div>
          <img
            src="/toters.png"
            alt="About Us"
            className="home-about-image"
          />
        </div>
      </section>

      <section className="home-services">
        <div className="home-services-content">
          <h2>Our Services</h2>
          <ul>
            <li style={{ border: '2px solid #FF5733', padding: '10px', marginBottom: '10px' }}>
              <FaTruck style={{ color: '#FF5733' }} /> Same-day delivery for all orders placed before noon.
              <p style={{ marginTop: '5px' }}>Get your groceries delivered to your doorstep on the same day for ultimate convenience.</p>
            </li>
            <li style={{ border: '2px solid #33C3FF', padding: '10px', marginBottom: '10px' }}>
              <FaShoppingCart style={{ color: '#33C3FF' }} /> Wide selection of fresh fruits, vegetables, and pantry staples.
              <p style={{ marginTop: '5px' }}>Choose from a vast range of high-quality products to meet all your grocery needs.</p>
            </li>
            <li style={{ border: '2px solid #28A745', padding: '10px', marginBottom: '10px' }}>
              <FaHeadset style={{ color: '#28A745' }} /> 24/7 customer support via chat or email.
              <p style={{ marginTop: '5px' }}>Our friendly support team is always available to assist you with any questions or concerns.</p>
            </li>
          </ul>
        </div>
      </section>
      <section className="home-testimonial">
        <div className="home-testimonial-content">
          <h2>What Our Customers Say</h2>
          <blockquote>
            <FaQuoteRight /> "Toters has transformed my grocery shopping experience. The freshness of their products is unmatched!"
          </blockquote>
          <cite>
            <FaUserCircle /> - Sarah J., Happy Customer
          </cite>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="home-faqs">
        <div className="home-faqs-content">
          <h2>Frequently Asked Questions</h2>
          <details>
            <summary>How do I place an order?</summary>
            <p>
              Browse our catalog, add items to your cart, and proceed to checkout securely.
            </p>
          </details>
          <details>
            <summary>What are your delivery charges?</summary>
            <p>
              Delivery is free for orders above $50. For orders below $50, a flat fee of $5 applies.
            </p>
          </details>
          <details>
            <summary>Can I cancel my order?</summary>
            <p>
              Yes, you can cancel your order anytime before it is dispatched.
            </p>
          </details>
        </div>
      </section>
    </>
  );
};

export default Home;