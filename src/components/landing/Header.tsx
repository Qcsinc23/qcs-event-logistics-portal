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
    <header className="main-header w-full py-4 px-6 bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" passHref>
          <span className="logo text-2xl font-bold text-gray-800">{companyName}</span>
        </Link>
        <nav className="main-nav hidden md:block"> {/* Hide on small screens, show on medium and up */}
          <ul className="flex space-x-6">
            <li><Link href="/#home" passHref><span className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Home</span></Link></li>
            <li><Link href="/#services" passHref><span className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Services</span></Link></li>
            <li><Link href="/#about" passHref><span className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Why Us</span></Link></li>
            <li><Link href="/#process" passHref><span className="text-gray-600 hover:text-blue-600 transition-colors duration-200">How It Works</span></Link></li>
            <li><Link href="/#contact" passHref><span className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Contact</span></Link></li>
          </ul>
        </nav>
        <div className="header-cta flex items-center space-x-4"> {/* Use space-x-4 for consistent gap */}
          <Link href="/dashboard" passHref>
            <span className="btn btn-primary px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200">Client Portal</span>
          </Link>
          <Link href="/#quote" passHref>
            <span className="btn btn-secondary px-4 py-2 rounded-md text-blue-600 border border-blue-600 hover:bg-blue-50 transition-colors duration-200">Get a Quote</span>
          </Link>
        </div>
        {/* Mobile menu button (conceptual) */}
        {/* <div className="md:hidden">
          <button className="text-gray-600 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
        </div> */}
      </div>
    </header>
  );
};

export default Header;
