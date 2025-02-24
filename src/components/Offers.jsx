import React from 'react';

const Offers = () => (
  <section style={{ marginBottom: '40px', textAlign: 'center' }}>
    <h2>Special Offers</h2>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', width: '200px' }}>
        <h3>Offer 1</h3>
        <p>Get 20% off on all groceries!</p>
      </div>
      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', width: '200px' }}>
        <h3>Offer 2</h3>
        <p>Buy one get one free on select items!</p>
      </div>
    </div>
  </section>
);

export default Offers;