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
        'th-bg':       'var(--th-bg)',
        'th-surface':  'var(--th-surface)',
        'th-card':     'var(--th-card)',
        'th-input':    'var(--th-input)',
        'th-border':   'var(--th-border)',
        'th-border-s': 'var(--th-border-s)',
        'th-text':     'var(--th-text)',
        'th-muted':    'var(--th-muted)',
        'th-dim':      'var(--th-dim)',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    ({ addVariant }) => addVariant('light', 'body.lightmode &'),
  ],
}
