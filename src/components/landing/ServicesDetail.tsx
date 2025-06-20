import React from 'react';
import styles from './ServicesDetail.module.css';
import { FaShippingFast, FaShieldAlt, FaBuilding, FaPeopleCarry, FaWarehouse, FaGlobeAmericas, FaTruck, FaHeadset } from 'react-icons/fa';

const ServicesDetail = () => {
  const services = [
    { Icon: FaShippingFast, title: "Time-Critical Deliveries", text: "Precision timing for conferences, trade shows, product launches, and festivals." },
    { Icon: FaShieldAlt, title: "High-Value & Delicate Goods", text: "Secure transport for AV equipment, exhibition booths, marketing collateral, and sensitive items." },
    { Icon: FaBuilding, title: "Venue Coordination", text: "Liaising with venues for smooth loading/unloading, storage, and on-site logistics." },
    { Icon: FaPeopleCarry, title: "On-Site Support", text: "Optional unpacking, setup assistance, dismantling, and repacking services." },
    { Icon: FaWarehouse, title: "Temporary Storage", text: "Secure warehousing solutions for your event materials before or after the event." },
    { Icon: FaGlobeAmericas, title: "Customs & Documentation", text: "Expert handling of paperwork and customs clearance for international events." },
    { Icon: FaTruck, title: "Dedicated Fleet & Staff", text: "Specialized vehicles and experienced personnel trained for event environments." },
    { Icon: FaHeadset, title: "24/7 Support", text: "Always available to address last-minute changes and logistical challenges effectively." },
  ];

  return (
    <section id="services" className={styles.servicesDetail}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Our Comprehensive Event Logistics Services</h2>
        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <div className={styles.serviceCard} key={index}>
              <h3 className={styles.serviceTitle}><service.Icon className={styles.serviceIcon} /> {service.title}</h3>
              <p className={styles.serviceText}>{service.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesDetail;
