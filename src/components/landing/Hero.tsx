"use client";

import React from 'react';
// Link is not directly used here if Button handles href
import Button from '../Button'; // Import the Button component
import styles from './Hero.module.css'; // Import CSS Module

const Hero = () => {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h1 className={styles.headline}>Event Logistics Courier Service</h1>
          <p className={styles.subHeadline}>
            From Quiet Craft Solutions Inc. - Ensuring seamless delivery for your events. We act as a critical link in your event supply chain.
          </p>
          <Button href="/#quote" variant="primary" className={styles.ctaButton}>
            Request Your Free Quote Today
          </Button>
        </div>
        <div className={styles.imageContainer}>
        </div>
      </div>
    </section>
  );
};

export default Hero;
