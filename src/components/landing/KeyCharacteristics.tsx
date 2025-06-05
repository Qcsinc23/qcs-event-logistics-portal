import React from 'react';
import BenefitCard from './BenefitCard'; // Import the new BenefitCard component
import styles from './KeyCharacteristics.module.css'; // Import CSS Module for this section
import { MdOutlineAccessTime, MdOutlineHandyman, MdOutlineLocationCity } from 'react-icons/md'; // Import specific icons

const KeyCharacteristics = () => {
  const benefitsData = [
    {
      IconComponent: MdOutlineAccessTime,
      title: "Time-Definite Delivery",
      description: "Strict schedules are our specialty. Same-day, next-day, or specific time-slot deliveries for setup, during-event, and teardown."
    },
    {
      IconComponent: MdOutlineHandyman, // Example: using a different icon for "Specialized Handling"
      title: "Specialized Handling",
      description: "From delicate AV equipment to bulky staging, we handle diverse items with appropriate care, security, and expertise."
    },
    {
      IconComponent: MdOutlineLocationCity,
      title: "Venue Familiarity",
      description: "Experienced with common event venues, loading docks, security protocols, and internal navigation to prevent delays."
    }
    // Add more benefits here if needed, following the same structure
  ];

  return (
    <section id="about" className={styles.benefitsSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          Why Partner With Quiet Craft Solutions Inc.?
        </h2>
        <div className={styles.cardsContainer}>
          {benefitsData.map(benefit => (
            <BenefitCard
              key={benefit.title}
              IconComponent={benefit.IconComponent}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyCharacteristics;
