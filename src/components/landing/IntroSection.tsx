import React from 'react';

const IntroSection = () => {
  return (
    <section className="py-16 md:py-20 bg-neutral-white font-inter"> {/* Consistent padding: 60px = py-16, 80px = py-20 */}
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold text-text-dark-gray mb-4">Your Partner for Event Logistics</h2>
        <div className="max-w-3xl mx-auto text-left"> {/* max-w-3xl is approx 768px, good for readability */}
          <p className="text-lg text-text-medium-gray mb-6 leading-relaxed">
            Quiet Craft Solutions Inc. provides a specialized transportation and delivery service focused on the unique and often time-sensitive needs of events. We combine speed, reliability, and security with a deep understanding of event management complexities.
          </p>
          <p className="text-lg text-text-medium-gray leading-relaxed">
            Essentially, we act as a critical link in your event supply chain, ensuring all necessary materials, equipment, and documents arrive at the right place, at the right time, and in perfect condition.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
