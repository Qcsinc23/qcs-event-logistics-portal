import React from 'react';
import styles from './Testimonials.module.css';

const Testimonials = () => {
  const testimonials = [
    { quote: "Quiet Craft Solutions Inc. saved our conference! A last-minute critical shipment arrived just in time thanks to their incredible team. Highly recommend!", author: "- Sarah P., Event Manager", company: "Innovate Summit" },
    { quote: "Their specialized handling of our delicate exhibition materials was top-notch. Everything arrived in perfect condition. Professional and reliable.", author: "- John B., Marketing Director", company: "Tech Expo Solutions" },
    { quote: "The venue coordination and on-site support were invaluable. They truly understand the pressures of event setup. A true partner.", author: "- Maria L., Festival Organizer", company: "City Music Fest" },
  ];

  return (
    <section className={styles.testimonials}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>What Our Clients Say</h2>
        <div className={styles.testimonialSlider}>
          {testimonials.map((testimonial, index) => (
            <div className={styles.testimonialItem} key={index}>
              <blockquote className={styles.quote}>"{testimonial.quote}"</blockquote>
              <div>
                <p className={styles.author}>{testimonial.author}</p>
                <p className={styles.company}>{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
