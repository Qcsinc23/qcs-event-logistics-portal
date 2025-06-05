import type { Config } from 'tailwindcss'

const config: Config = {
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