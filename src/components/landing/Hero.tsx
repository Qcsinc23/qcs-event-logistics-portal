"use client"; // If Link or other client-side hooks are used

import Link from 'next/link';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <h1>Event Logistics Courier Service</h1>
        <p>From Quiet Craft Solutions Inc. - Ensuring seamless delivery for your events. We act as a critical link in your event supply chain.</p>
        <Link href="/#quote" passHref>
          <span className="btn btn-primary btn-lg">Request Your Free Quote Today</span>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
