"use client";

import Link from 'next/link';
import React from 'react';
import styles from './Footer.module.css'; // Import CSS Module
// import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa'; // Example if using react-icons for social icons

interface FooterProps {
  companyName: string;
}

const Footer: React.FC<FooterProps> = ({ companyName }) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.contentGrid}>
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>{companyName}</h4>
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
            <p className={styles.contactInfo}>
              300 Beech St<br />
              Teaneck, NJ 07666<br />
              Email: <a href="mailto:sales@quietcraftsolutions.com" className={styles.contactLink}>sales@quietcraftsolutions.com</a><br />
              Phone: <a href="tel:+12012490929" className={styles.contactLink}>(201) 249-0929</a>
            </p>
          </div>
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Connect With Us</h4>
            <div className={styles.socialLinksContainer}>
              {/* Placeholder text links, replace with actual icons/links */}
              <a href="#" aria-label="Facebook" className={styles.socialLink}>FB</a>
              <a href="#" aria-label="Twitter" className={styles.socialLink}>TW</a>
              <a href="#" aria-label="LinkedIn" className={styles.socialLink}>LI</a>
              <a href="#" aria-label="Instagram" className={styles.socialLink}>IG</a>
              {/* Example with react-icons:
              <a href="#" aria-label="Facebook" className={styles.socialLink}><FaFacebookF /></a>
              <a href="#" aria-label="Twitter" className={styles.socialLink}><FaTwitter /></a>
              <a href="#" aria-label="LinkedIn" className={styles.socialLink}><FaLinkedinIn /></a>
              <a href="#" aria-label="Instagram" className={styles.socialLink}><FaInstagram /></a>
              */}
            </div>
          </div>
        </div>
        <div className={styles.bottomBar}>
          <p className={styles.copyrightText}>&copy; {currentYear} {companyName}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
