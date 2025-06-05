"use client"; // If Link or other client-side hooks are used

import Link from 'next/link';

const Hero = () => {
  return (
    <section
      id="home"
      className="hero bg-cover bg-center text-center py-24 px-6 font-inter"
      style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/placeholder-hero-bg.jpg')" }} // Placeholder image
    >
      <div className="container mx-auto">
        <h1 className="text-5xl font-semibold text-text-white mb-6">Event Logistics Courier Service</h1>
        <p className="text-xl text-neutral-light-gray mb-8 max-w-2xl mx-auto leading-relaxed">
          From Quiet Craft Solutions Inc. - Ensuring seamless delivery for your events. We act as a critical link in your event supply chain.
        </p>
        <Link href="/#quote" passHref>
          <span className="px-8 py-4 rounded-md font-medium text-text-white bg-primary-action hover:bg-opacity-90 hover:shadow-lg transition-all duration-200 text-lg mt-8 inline-block">
            Request Your Free Quote Today
          </span>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
