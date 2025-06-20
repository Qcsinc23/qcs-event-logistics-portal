"use client";

import Link from 'next/link';
import React from 'react';
import styles from './Footer.module.css'; // Import CSS Module
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa'; // Example if using react-icons for social icons

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.contentGrid}>
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Quiet Craft Solutions Inc.</h4>
            <p className={styles.companyDescription}>Ensuring seamless delivery for your events. Your trusted partner in event logistics, dedicated to precision, reliability, and success.</p>
          </div>
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Quick Links</h4>
            <ul className={styles.quickLinksList}>
              <li><Link href="/#home" className={styles.quickLink}>Home</Link></li>
              <li><Link href="/#services" className={styles.quickLink}>Services</Link></li>
              <li><Link href="/#about" className={styles.quickLink}>Why Us</Link></li>
              <li><Link href="/#process" className={styles.quickLink}>How It Works</Link></li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Contact Us</h4>
            <address className={styles.contactInfo}>
              <strong>Quiet Craft Solutions Inc.</strong><br/>
              165 Passaic Ave #203, Fairfield, NJ 07004<br/>
              <a href="tel:+19734159532">(973) 415-9532</a>
            </address>
          </div>
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Connect With Us</h4>
            <div className={styles.socialLinksContainer}>
              <a href="https://facebook.com/quietcraftsolutions" aria-label="Facebook" className={styles.socialLink}><FaFacebookF /></a>
              <a href="https://twitter.com/quietcraftsolutions" aria-label="Twitter" className={styles.socialLink}><FaTwitter /></a>
              <a href="https://linkedin.com/company/quietcraftsolutions" aria-label="LinkedIn" className={styles.socialLink}><FaLinkedinIn /></a>
              <a href="https://instagram.com/quietcraftsolutions" aria-label="Instagram" className={styles.socialLink}><FaInstagram /></a>
            </div>
          </div>
        </div>
        <div className={styles.bottomBar}>
          <p className={styles.copyrightText}>&copy; {currentYear} Quiet Craft Solutions Inc.. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
