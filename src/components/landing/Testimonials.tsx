import React from 'react';

const Testimonials = () => {
  const testimonials = [
    { quote: "Quiet Craft Solutions Inc. saved our conference! A last-minute critical shipment arrived just in time thanks to their incredible team. Highly recommend!", author: "- Sarah P., Event Manager", company: "Innovate Summit" },
    { quote: "Their specialized handling of our delicate exhibition materials was top-notch. Everything arrived in perfect condition. Professional and reliable.", author: "- John B., Marketing Director", company: "Tech Expo Solutions" },
    { quote: "The venue coordination and on-site support were invaluable. They truly understand the pressures of event setup. A true partner.", author: "- Maria L., Festival Organizer", company: "City Music Fest" },
  ];

  return (
    <section className="testimonials">
      <div className="container">
        <h2>What Our Clients Say</h2>
        <div className="testimonial-slider">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-item" key={index}>
              <blockquote>{testimonial.quote}</blockquote>
              <p className="author">{testimonial.author}</p>
              <p className="company">{testimonial.company}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
