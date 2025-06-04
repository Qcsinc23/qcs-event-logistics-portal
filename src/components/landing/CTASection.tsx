"use client"; // If Link or other client-side hooks are used

import Link from 'next/link';
import React from 'react';

const CTASection = () => {
  return (
    <section id="quote" className="cta-section">
      <div className="container">
        <h2>Ready for Stress-Free Event Logistics?</h2>
        <p>Let Quiet Craft Solutions Inc. handle the complexities of event deliveries so you can focus on creating an unforgettable experience.</p>
        <a href="tel:+1234567890" className="btn btn-primary btn-lg">Call Us: (123) 456-7890</a>
        <a href="mailto:quote@quietcraftsolutions.com" className="btn btn-dark btn-lg" style={{ backgroundColor: '#333', color: '#fff', marginLeft: '10px' }}>
          Email for a Quote
        </a>
        {/* Or a link to a more detailed quote form page */}
        {/* <Link href="/request-quote" passHref>
          <span className="btn btn-primary btn-lg">Get Your Detailed Quote</span>
        </Link> */}
      </div>
    </section>
  );
};

export default CTASection;
