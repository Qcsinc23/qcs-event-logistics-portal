import React from 'react';

const KeyCharacteristics = () => {
  const characteristics = [
    { icon: "fa-clock", title: "Time-Definite Delivery", text: "Strict schedules are our specialty. Same-day, next-day, or specific time-slot deliveries for setup, during-event, and teardown." },
    { icon: "fa-box-open", title: "Specialized Handling", text: "From delicate AV equipment to bulky staging, we handle diverse items with appropriate care, security, and expertise." },
    { icon: "fa-map-marked-alt", title: "Venue Familiarity", text: "Experienced with common event venues, loading docks, security protocols, and internal navigation to prevent delays." },
    { icon: "fa-cogs", title: "Flexibility & Adaptability", text: "The event industry is dynamic. We adapt to shifting requirements, urgent requests, and unexpected challenges seamlessly." },
    { icon: "fa-satellite-dish", title: "Tracking & Communication", text: "Real-time shipment tracking and clear, proactive communication for peace of mind and efficient coordination." },
    { icon: "fa-undo-alt", title: "Reverse Logistics", text: "Efficient pickup and return of equipment, leftover materials, or rentals after your event concludes." },
  ];

  return (
    <section id="about" className="key-characteristics">
      <div className="container">
        <h2>Why Partner With Quiet Craft Solutions Inc.?</h2>
        <div className="characteristics-grid">
          {characteristics.map((char, index) => (
            <div className="characteristic-item" key={index}>
              <div className="icon"><i className={`fas ${char.icon}`}></i></div>
              <h3>{char.title}</h3>
              <p>{char.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyCharacteristics;
