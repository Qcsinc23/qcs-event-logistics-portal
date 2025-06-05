import React from 'react';

// Helper component for Material Symbols
const MaterialSymbol = ({ name, className }: { name: string; className?: string }) => (
  <span className={`material-symbols-outlined ${className || ''}`}>{name}</span>
);

const KeyCharacteristics = () => {
  const characteristics = [
    {
      icon: "schedule", // Material Symbol name for time/schedule
      title: "Time-Definite Delivery",
      text: "Strict schedules are our specialty. Same-day, next-day, or specific time-slot deliveries for setup, during-event, and teardown."
    },
    {
      icon: "inventory_2", // Material Symbol name for handling/boxes
      title: "Specialized Handling",
      text: "From delicate AV equipment to bulky staging, we handle diverse items with appropriate care, security, and expertise."
    },
    {
      icon: "meeting_room", // Material Symbol name for venue/location
      title: "Venue Familiarity",
      text: "Experienced with common event venues, loading docks, security protocols, and internal navigation to prevent delays."
    },
    // The plan focuses on the first three, other items can be added later if needed.
    // { icon: "fa-cogs", title: "Flexibility & Adaptability", text: "The event industry is dynamic. We adapt to shifting requirements, urgent requests, and unexpected challenges seamlessly." },
    // { icon: "fa-satellite-dish", title: "Tracking & Communication", text: "Real-time shipment tracking and clear, proactive communication for peace of mind and efficient coordination." },
    // { icon: "fa-undo-alt", title: "Reverse Logistics", text: "Efficient pickup and return of equipment, leftover materials, or rentals after your event concludes." },
  ];

  // We will only render the first 3 characteristics as per the plan
  const characteristicsToDisplay = characteristics.slice(0, 3);

  return (
    <section id="about" className="py-16 md:py-20 bg-neutral-light-gray font-inter">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold text-text-dark-gray mb-12">
          Why Partner With Quiet Craft Solutions Inc.?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {characteristicsToDisplay.map((char, index) => (
            <div
              className="bg-neutral-white p-6 rounded-lg shadow-lg text-left flex flex-col items-start" // items-start for icon above title
              key={index}
            >
              <MaterialSymbol name={char.icon} className="text-4xl text-primary-action mb-4" /> {/* Icon size 32px = text-4xl, margin below */}
              <h3 className="text-xl font-semibold text-text-dark-gray mb-2">
                {char.title}
              </h3>
              <p className="text-base text-text-medium-gray leading-relaxed">
                {char.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyCharacteristics;
