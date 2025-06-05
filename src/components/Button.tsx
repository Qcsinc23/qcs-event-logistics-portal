import Link from 'next/link';
import React from 'react';
import styles from './Button.module.css'; // CSS Module

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'textLink';
  // Allow all other button attributes like onClick, type, etc.
}

const Button: React.FC<ButtonProps> = ({
  href,
  children,
  variant = 'primary',
  className = '', // Provide a default value for className
  ...props
}) => {
  const buttonClasses = `${styles.button} ${styles[variant]} ${className}`.trim(); // Use trim to clean up potential extra spaces

  if (href) {
    return (
      <Link href={href} className={buttonClasses} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;