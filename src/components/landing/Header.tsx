"use client"; // Assuming client-side interactivity for nav, Link component

import Link from 'next/link';
// import { useRouter } from 'next/navigation'; // For active link styling if needed

interface HeaderProps {
  companyName: string;
}

const Header: React.FC<HeaderProps> = ({ companyName }) => {
  // const router = useRouter(); // For active link styling
  // const isActive = (pathname: string) => router.pathname === pathname; // App router uses usePathname

  return (
    <header className="w-full py-4 px-6 bg-neutral-white shadow-md font-inter">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" passHref>
          <span className="text-2xl font-semibold text-text-dark-gray">
            Quiet Craft Solutions <span className="text-xl font-normal">Inc.</span>
          </span>
        </Link>
        <nav className="main-nav hidden md:block">
          <ul className="flex space-x-8"> {/* Increased spacing to 32px (space-x-8) */}
            <li><Link href="/#home" passHref><span className="text-base text-text-dark-gray hover:text-primary-action transition-colors duration-200">Home</span></Link></li>
            <li><Link href="/#services" passHref><span className="text-base text-text-dark-gray hover:text-primary-action transition-colors duration-200">Services</span></Link></li>
            <li><Link href="/#about" passHref><span className="text-base text-text-dark-gray hover:text-primary-action transition-colors duration-200">Why Us</span></Link></li>
            <li><Link href="/#process" passHref><span className="text-base text-text-dark-gray hover:text-primary-action transition-colors duration-200">How It Works</span></Link></li>
            <li><Link href="/#contact" passHref><span className="text-base text-text-dark-gray hover:text-primary-action transition-colors duration-200">Contact</span></Link></li>
          </ul>
        </nav>
        <div className="header-cta flex items-center space-x-4">
          <Link href="/#quote" passHref>
            <span className="px-6 py-3 rounded-md font-medium text-primary-action border border-primary-action bg-neutral-white hover:bg-neutral-light-gray hover:shadow-lg transition-all duration-200 text-base">Get a Quote</span>
          </Link>
          {/* "Sign In" and "Sign Up" buttons as per plan - assuming /sign-in and /sign-up routes exist or will be handled by Clerk */}
          <Link href="/sign-in" passHref>
            <span className="text-base text-primary-action hover:underline font-medium">Sign In</span>
          </Link>
          <Link href="/sign-up" passHref>
            <span className="px-6 py-3 rounded-md font-medium text-primary-action border border-primary-action bg-neutral-white hover:bg-neutral-light-gray hover:shadow-lg transition-all duration-200 text-base">Sign Up</span>
          </Link>
           {/* Client Portal button - can be styled as primary or secondary based on final design preference */}
          <Link href="/dashboard" passHref>
            <span className="px-6 py-3 rounded-md font-medium text-text-white bg-primary-action hover:bg-opacity-90 hover:shadow-lg transition-all duration-200 text-base">Client Portal</span>
          </Link>
        </div>
        {/* Mobile menu button (conceptual) - styling would need to be added */}
        {/* <div className="md:hidden">
          <button className="text-text-dark-gray focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
        </div> */}
      </div>
    </header>
  );
};

export default Header;
