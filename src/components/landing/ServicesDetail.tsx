import React from 'react';

const ServicesDetail = () => {
  const services = [
    { icon: "fa-shipping-fast", title: "Time-Critical Deliveries", text: "Precision timing for conferences, trade shows, product launches, and festivals." },
    { icon: "fa-shield-alt", title: "High-Value & Delicate Goods", text: "Secure transport for AV equipment, exhibition booths, marketing collateral, and sensitive items." },
    { icon: "fa-building", title: "Venue Coordination", text: "Liaising with venues for smooth loading/unloading, storage, and on-site logistics." },
    { icon: "fa-people-carry", title: "On-Site Support", text: "Optional unpacking, setup assistance, dismantling, and repacking services." },
    { icon: "fa-warehouse", title: "Temporary Storage", text: "Secure warehousing solutions for your event materials before or after the event." },
    { icon: "fa-globe-americas", title: "Customs & Documentation", text: "Expert handling of paperwork and customs clearance for international events." },
    { icon: "fa-truck", title: "Dedicated Fleet & Staff", text: "Specialized vehicles and experienced personnel trained for event environments." },
    { icon: "fa-headset", title: "24/7 Support", text: "Always available to address last-minute changes and logistical challenges effectively." },
  ];

  return (
    <section id="services" className="services-detail">
      <div className="container">
        <h2>Our Comprehensive Event Logistics Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <h3><i className={`fas ${service.icon}`}></i> {service.title}</h3>
              <p>{service.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesDetail;
