// As per Tailwind CSS 4 error message, explicitly use @tailwindcss/postcss
const config = {
  plugins: {
    "@tailwindcss/postcss": {}, // Use the specific package for Tailwind CSS 4+ PostCSS plugin
    "autoprefixer": {},
  },
};

export default config;
