"use client"; // Assuming client-side interactivity for nav, Link component

import Link from 'next/link';

interface FooterProps {
  companyName: string;
}

const Footer: React.FC<FooterProps> = ({ companyName }) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer id="contact" className="main-footer"> {/* Added ID for nav link */}
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h4>{companyName}</h4>
            <p>Ensuring seamless delivery for your events. Your trusted partner in event logistics, dedicated to precision, reliability, and success.</p>
          </div>
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/#home" passHref><span>Home</span></Link></li>
              <li><Link href="/#services" passHref><span>Services</span></Link></li>
              <li><Link href="/#about" passHref><span>Why Us</span></Link></li>
              <li><Link href="/#process" passHref><span>How It Works</span></Link></li>
              {/* Example of actual pages */}
              {/* <li><Link href="/privacy-policy" passHref><a>Privacy Policy</a></Link></li> */}
              {/* <li><Link href="/terms-of-service" passHref><a>Terms of Service</a></Link></li> */}
            </ul>
          </div>
          <div className="footer-column">
            <h4>Contact Us</h4>
            <p>
              300 Beech St<br />
              Teaneck, NJ 07666<br />
              Email: <a href="mailto:sales@quietcraftsolutions.com">sales@quietcraftsolutions.com</a><br />
              Phone: <a href="tel:+12012490929">(201) 249-0929</a>
            </p>
          </div>
          <div className="footer-column">
            <h4>Connect With Us</h4>
            <div className="social-links">
              {/* Ensure these have actual links if they are to be functional */}
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} {companyName}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
