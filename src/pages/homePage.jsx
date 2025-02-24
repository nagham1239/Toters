import React from 'react';
import Navbar from '../components/Navbar';
import Offers from '../components/Offers';
import WhatWeSale from '../components/WhatWeSale';
import Footer from '../components/Footer';

const HomePage = () => (
  <div>
    <Navbar />
    <div style={{ padding: '20px' }}>
      <Offers />
      <WhatWeSale />
    </div>
    <Footer />
  </div>
);

export default HomePage;