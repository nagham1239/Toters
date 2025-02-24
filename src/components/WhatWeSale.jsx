import React from 'react';

const WhatWeSale = () => (
  <section style={{ textAlign: 'center' }}>
    <h2>What We Sale</h2>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', width: '200px' }}>
        <img src="https://via.placeholder.com/150" alt="Product 1" style={{ width: '100%', height: 'auto' }} />
        <h3>Product 1</h3>
        <p>Fresh and organic.</p>
      </div>
      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', width: '200px' }}>
        <img src="https://via.placeholder.com/150" alt="Product 2" style={{ width: '100%', height: 'auto' }} />
        <h3>Product 2</h3>
        <p>Quality guaranteed.</p>
      </div>
      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', width: '200px' }}>
        <img src="https://via.placeholder.com/150" alt="Product 3" style={{ width: '100%', height: 'auto' }} />
        <h3>Product 3</h3>
        <p>Best seller item.</p>
      </div>
    </div>
  </section>
);

export default WhatWeSale;