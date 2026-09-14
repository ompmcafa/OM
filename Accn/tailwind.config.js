/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  safelist: [
    'grid-cols-4', 'grid-cols-5', 'grid-cols-6',
    'bg-red-600', 'bg-brass-600', 'bg-mess-800',
    'opacity-50', 'pointer-events-none',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Oswald', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        mess: {
          50: '#eef3fb', 100: '#d7e3f5', 200: '#b0c7ec', 300: '#7fa3de', 400: '#4d7dce',
          500: '#2f5fb8', 600: '#1f4694', 700: '#173a7a', 800: '#122d5e', 900: '#0c1f42',
        },
        brass: {
          50: '#eaf6fd', 100: '#cceaf9', 200: '#99d5f3', 300: '#5bb9ea', 400: '#2ea1de',
          500: '#1c8cc9', 600: '#156fa1', 700: '#125a83', 800: '#0f4868', 900: '#0a3147',
        },
        gold: {
          50: '#faf5ea', 100: '#f3e8cc', 200: '#e6cf99', 300: '#d3ac5c',
          400: '#bd8f3c', 500: '#a9762f', 600: '#8c6026', 700: '#6f4c1f',
        },
        status: { livingin: '#7C5CBF', td: '#0891B2', leave: '#3F9A63', guest: '#D9932A', vip: '#B3542E' }
      },
      boxShadow: { tab: '0 -1px 0 rgba(12,31,66,0.08), 0 -6px 16px -8px rgba(12,31,66,0.18)' }
    }
  },
  plugins: [],
};
