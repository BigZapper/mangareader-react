/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#16151d',
        'bg-secondary': '#1d1b26',
        'bg-card': '#222',
        'accent': '#366ad3',
        'accent-hover': '#2856b8',
        'text-primary': '#b8b8b8',
        'text-muted': '#888',
        'border-dark': '#333',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
