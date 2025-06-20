"use client";

import React, { useState } from 'react';
import Button from '../Button';
import Modal from '../Modal';
import QuoteForm from '../forms/QuoteForm';

const CTASection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section id="quote" className="cta-section">
        <div className="container">
          <h2>Ready for Stress-Free Event Logistics?</h2>
          <p>Let Quiet Craft Solutions Inc. handle the complexities of event deliveries so you can focus on creating an unforgettable experience.</p>
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
