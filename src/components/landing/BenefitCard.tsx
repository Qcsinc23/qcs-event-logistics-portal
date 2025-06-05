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
    <div className={styles.card}>
      <IconComponent size={32} className={styles.icon} />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default BenefitCard;