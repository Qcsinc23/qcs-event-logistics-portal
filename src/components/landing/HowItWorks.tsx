import React from 'react';
import styles from './HowItWorks.module.css';

const HowItWorks = () => {
  const steps = [
    { number: 1, title: "Request a Quote", text: "Tell us about your event needs, timeline, and items. Get a transparent, competitive quote quickly from Quiet Craft Solutions Inc." },
    { number: 2, title: "Plan & Schedule", text: "We coordinate pickup, delivery times, venue specifics, and any special handling requirements with you." },
    { number: 3, title: "Flawless Execution", text: "Our team ensures on-time delivery, provides on-site support if needed, and manages returns post-event." },
    { number: 4, title: "Receive & Enjoy", text: "We deliver, set up, and monitor your event items—zero hassle." },
  ];

  return (
    <section id="process" className={styles.howItWorks}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Our Simple Process</h2>
        <div className={styles.stepsContainer}>
          {steps.map((step) => (
            <div className={styles.stepItem} key={step.number}>
              <div className={styles.stepNumber}>{step.number}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
