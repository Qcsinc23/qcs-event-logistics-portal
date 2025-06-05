import Link from 'next/link';
import React from 'react';
import styles from './Button.module.css'; // CSS Module

// Define separate props for Link and Button to avoid type conflicts
type AnchorProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string; // href is mandatory for Link
  variant?: 'primary' | 'secondary' | 'textLink';
  children: React.ReactNode;
};

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined; // href should not be present for button
  variant?: 'primary' | 'secondary' | 'textLink';
  children: React.ReactNode;
};

type ButtonProps = AnchorProps | BtnProps;

const Button: React.FC<ButtonProps> = (props) => {
  const { variant = 'primary', className = '', children } = props;
  const buttonClasses = `${styles.button} ${styles[variant]} ${className}`.trim();

  if (props.href) {
    // Destructure props specific to Link/anchor, excluding button-specific ones
    const { href, ...anchorSpecificProps } = props as AnchorProps;
    // Further refine anchorSpecificProps if necessary to exclude any button-only HTML attributes
    // For now, this is a common approach, but for strictness, one might filter out button-specific event handlers etc.
    return (
      <Link href={href} className={buttonClasses} {...anchorSpecificProps}>
        {children}
      </Link>
    );
  }
  
  // Destructure props specific to button
  const { ...buttonSpecificProps } = props as BtnProps;
  return (
    <button className={buttonClasses} {...buttonSpecificProps}>
      {children}
    </button>
  );
};

export default Button;