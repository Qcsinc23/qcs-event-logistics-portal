import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'], // Path to your setup file
    css: false, // If you're not testing CSS or using CSS modules in tests
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
