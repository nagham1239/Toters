import React from 'react';
import './About.css'; // Import CSS for styling

const About = () => {
  return (
    <section className="about-page">
      <div className="about-page-header">
        <h1>About Toters</h1>
        <p>Revolutionizing the way you shop for groceries</p>
      </div>

      <div className="about-page-content">
        {/* Section 1: Our Mission */}
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            At Toters, our mission is to make premium-quality groceries accessible to everyone, 
            without the hassle of traditional shopping. We believe that grocery shopping should be 
            convenient, reliable, and enjoyable. By leveraging technology and trusted partnerships, 
            we aim to redefine the grocery shopping experience.
          </p>
        </div>

        {/* Section 2: What Sets Us Apart */}
        <div className="about-section">
          <h2>What Sets Us Apart</h2>
          <p>
            We meticulously source the freshest produce, dairy, and pantry essentials from trusted suppliers 
            to ensure that every item you receive meets the highest standards of quality. Whether you're 
            looking for organic fruits, farm-fresh vegetables, or specialty items, Toters has you covered. 
            Our commitment to excellence ensures that you always get the best products at competitive prices.
          </p>
        </div>

        {/* Section 3: Our Team */}
        <div className="about-section">
          <h2>Our Team</h2>
          <p>
            Behind every successful delivery is a dedicated team working tirelessly to provide a seamless 
            shopping experience. From our sourcing experts to our delivery personnel, each member of the 
            Toters family is committed to delivering trust, convenience, and satisfaction to our customers.
          </p>
        </div>

        {/* Section 4: Join the Toters Family */}
        <div className="about-section">
          <h2>Join the Toters Family</h2>
          <p>
            We believe in building lasting relationships with our customers by delivering not just groceries, 
            but also trust, convenience, and satisfaction. Join the Toters family today and discover the 
            difference of shopping with a partner who truly cares about your needs.
          </p>
          <button 
            className="about-page-button" 
            onClick={() => window.location.href = '/contact'}
          >
            Get in Touch
          </button>
        </div>

        {/* Image Section */}
        <div className="about-page-image-container">
          <img
            src="/toters.png"
            alt="Toters Team"
            className="about-page-image"
          />
        </div>
      </div>
    </section>
  );
};

export default About;