import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-action': '#00796B', // Deep Teal
        'secondary-action': '#FFC107', // Warm Gold
        'neutral-light-gray': '#F4F6F8',
        'neutral-white': '#FFFFFF',
        'text-dark-gray': '#333333',
        'text-medium-gray': '#555555',
        'text-white': '#FFFFFF',
        'accent-light-cool-gray': '#D0DDE8',
        // Dark mode palette (example)
        'dark-background': '#1a202c', // Example: Dark Gray
        'dark-surface': '#2d3748',    // Example: Slightly Lighter Dark Gray
        'dark-text-primary': '#e2e8f0', // Example: Light Gray for text
        'dark-text-secondary': '#a0aec0', // Example: Medium Gray for secondary text
        'dark-primary-action': '#00A99D', // Example: Brighter Teal for dark mode
        'dark-secondary-action': '#FFD700', // Example: Brighter Gold for dark mode
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '1rem', // Default padding for containers
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1140px', // Max container width
        },
      },
    },
  },
  plugins: [],
}
export default config