"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface PortalNavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
}

const PortalNavLink: React.FC<PortalNavLinkProps> = ({
  href,
  children,
  className = "hover:text-slate-300 dark:hover:text-slate-400",
  activeClassName = "text-slate-100 dark:text-white font-semibold",
}) => {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href)); // More robust active check

  return (
    <Link href={href} className={`${className} ${isActive ? activeClassName : ''}`}>
      {children}
    </Link>
  );
};

export default PortalNavLink;