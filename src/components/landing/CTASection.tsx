"use client";

import React, { useState } from 'react';
import Button from '../Button';
import Modal from '../Modal';
import QuoteForm from '../forms/QuoteForm';
import styles from './CTASection.module.css';

const CTASection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section id="quote" className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.title}>Ready for Stress-Free Event Logistics?</h2>
          <p className={styles.subtitle}>Let Quiet Craft Solutions Inc. handle the complexities of event deliveries so you can focus on creating an unforgettable experience.</p>
          <Button onClick={() => setIsModalOpen(true)} variant="primary" className="btn-lg">
            Get an Instant Estimate
          </Button>
        </div>
      </section>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Request a Quote">
        <QuoteForm closeModal={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default CTASection;
