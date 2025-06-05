import React from 'react';
import styles from './BenefitCard.module.css';
import { IconType } from 'react-icons'; // To type the IconComponent prop

interface BenefitCardProps {
  IconComponent: IconType;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ IconComponent, title, description }) => {
  return (
    <div className="group"> {/* Add a group class for hover effects */}
      <div className={`${styles.card} group-hover:shadow-xl group-hover:scale-105 transition-all duration-300`}>
        <IconComponent size={32} className={styles.icon} aria-hidden="true" />
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default BenefitCard;