import React from 'react';
import styles from './IntroSection.module.css'; // Import CSS Module

const IntroSection = () => {
  return (
    <section className={styles.introSection}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Your Partner for Event Logistics</h2>
        <div className={styles.textBlock}>
          <p className={styles.paragraph}>
            Quiet Craft Solutions Inc. provides a specialized transportation and delivery service focused on the unique and often time-sensitive needs of events. We combine speed, reliability, and security with a deep understanding of event management complexities.
          </p>
          <p className={styles.paragraph}>
            Essentially, we act as a critical link in your event supply chain, ensuring all necessary materials, equipment, and documents arrive at the right place, at the right time, and in perfect condition.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
