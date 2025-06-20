import React from 'react';

const HowItWorks = () => {
  const steps = [
    { number: 1, title: "Request a Quote", text: "Tell us about your event needs, timeline, and items. Get a transparent, competitive quote quickly from Quiet Craft Solutions Inc." },
    { number: 2, title: "Plan & Schedule", text: "We coordinate pickup, delivery times, venue specifics, and any special handling requirements with you." },
    { number: 3, title: "Flawless Execution", text: "Our team ensures on-time delivery, provides on-site support if needed, and manages returns post-event." },
    { number: 4, title: "Receive & Enjoy", text: "We deliver, set up, and monitor your event items—zero hassle." },
  ];

  return (
    <section id="process" className="how-it-works">
      <div className="container">
        <h2>Our Simple Process</h2>
        <div className="steps-container">
          {steps.map((step) => (
            <div className="step-item" key={step.number}>
              <div className="step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
