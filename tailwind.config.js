/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],
        'rajdhani': ['Rajdhani', 'sans-serif'],
      },
      colors: {
        'space-dark': '#0B0D17',
        'space-deep': '#151922',
        'space-card': '#1A1D29',
        'quantum-cyan': '#00D4FF',
        'quantum-purple': '#8B5DFF',
        'quantum-magenta': '#E946CA',
      },
    },
  },
  plugins: [],
}