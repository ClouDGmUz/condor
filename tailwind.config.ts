/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Light mode - keeping the same
        light: {
          primary: '#ddd8c4',    // Warm Beige
          secondary: '#a3c9a8',  // Sage Green
          accent: '#84b59f',     // Soft Green
          surface: '#69a297',    // Teal
          muted: '#50808e',      // Blue Gray
        },
        // Dark mode - adjusted for better harmony
        dark: {
          primary: '#1a1d1a',    // Softer black background
          secondary: '#2d3a3a',  // Muted teal-gray
          accent: '#84b59f',     // Same as light accent for consistency
          surface: '#374151',    // Slate gray for cards/sections
          text: '#f2f4f3',       // Off white
          muted: '#9ca3af',      // Muted gray for secondary text
        },
      },
      fontFamily: {
        sans: ['Geist Sans', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}