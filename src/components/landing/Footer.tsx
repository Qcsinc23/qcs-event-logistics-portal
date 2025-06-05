"use client"; // Assuming client-side interactivity for nav, Link component

import Link from 'next/link';

interface FooterProps {
  companyName: string;
}

const Footer: React.FC<FooterProps> = ({ companyName }) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer id="contact" className="bg-text-dark-gray text-neutral-light-gray py-12 md:py-16 font-inter">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="footer-column">
            <h4 className="text-xl font-semibold text-neutral-white mb-4">{companyName}</h4>
            <p className="text-sm leading-relaxed">Ensuring seamless delivery for your events. Your trusted partner in event logistics, dedicated to precision, reliability, and success.</p>
          </div>
          <div className="footer-column">
            <h4 className="text-lg font-semibold text-neutral-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/#home" passHref><span className="hover:text-secondary-action transition-colors duration-200">Home</span></Link></li>
              <li><Link href="/#services" passHref><span className="hover:text-secondary-action transition-colors duration-200">Services</span></Link></li>
              <li><Link href="/#about" passHref><span className="hover:text-secondary-action transition-colors duration-200">Why Us</span></Link></li>
              <li><Link href="/#process" passHref><span className="hover:text-secondary-action transition-colors duration-200">How It Works</span></Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4 className="text-lg font-semibold text-neutral-white mb-4">Contact Us</h4>
            <p className="text-sm leading-relaxed">
              300 Beech St<br />
              Teaneck, NJ 07666<br />
              Email: <a href="mailto:sales@quietcraftsolutions.com" className="hover:text-secondary-action transition-colors duration-200">sales@quietcraftsolutions.com</a><br />
              Phone: <a href="tel:+12012490929" className="hover:text-secondary-action transition-colors duration-200">(201) 249-0929</a>
            </p>
          </div>
          <div className="footer-column">
            <h4 className="text-lg font-semibold text-neutral-white mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              {/* Replace with actual social media links and Material Symbols if desired */}
              <a href="#" aria-label="Facebook" className="hover:text-secondary-action transition-colors duration-200">FB</a>
              <a href="#" aria-label="Twitter" className="hover:text-secondary-action transition-colors duration-200">TW</a>
              <a href="#" aria-label="LinkedIn" className="hover:text-secondary-action transition-colors duration-200">LI</a>
              <a href="#" aria-label="Instagram" className="hover:text-secondary-action transition-colors duration-200">IG</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom text-center border-t border-gray-700 pt-8">
          <p className="text-sm">&copy; {currentYear} {companyName}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
