"use client";

import Link from 'next/link';
import Button from '../Button'; // Import the new Button component
import styles from './Header.module.css'; // Import CSS Module

interface HeaderProps {
  companyName: string; // This prop might become redundant if the name is hardcoded as per design
}

const Header: React.FC<HeaderProps> = ({ companyName }) => {
  // For mobile menu state, if implemented
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" passHref className={styles.logoLink}>
          <span className={styles.logoText}>
            Quiet Craft Solutions <span className={styles.logoTextInc}>Inc.</span>
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className={styles.nav} aria-label="Main navigation">
          <ul className={styles.navList}>
            <li><Link href="/#home" className={styles.navLink}>Home</Link></li>
            <li><Link href="/#services" className={styles.navLink}>Services</Link></li>
            <li><Link href="/#about" className={styles.navLink}>Why Us</Link></li>
            <li><Link href="/#process" className={styles.navLink}>How It Works</Link></li>
            <li><Link href="/#contact" className={styles.navLink}>Contact</Link></li>
          </ul>
        </nav>

        <div className={styles.ctaContainer}>
          <Button href="/#quote" variant="secondary">Get a Quote</Button>
          {/* Assuming /sign-in and /sign-up are handled by Clerk or dedicated pages */}
          <Button href="/sign-in" variant="textLink" className={styles.signInLink}>Sign In</Button>
          <Button href="/sign-up" variant="secondary">Sign Up</Button>
          <Button href="/dashboard" variant="primary">Client Portal</Button>
        </div>

        {/* Mobile Menu Button (conceptual) */}
        {/*
        <button
          className={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Open navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          ICON_SVG_HERE
        </button>
        */}
      </div>
      {/* Mobile Menu Panel (conceptual) */}
      {/*
      {isMobileMenuOpen && (
        <div className={styles.mobileMenuPanel}>
          <nav>
            <ul className={styles.mobileNavList}>
              <li><Link href="/#home" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
              ... other links
            </ul>
          </nav>
        </div>
      )}
      */}
    </header>
  );
};

export default Header;
