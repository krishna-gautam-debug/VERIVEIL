/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        'surface-warm': '#F3F2EF',
        'surface-subtle': '#F7F7F5',
        'surface-soft': '#FAFAF9',
        border: '#EAEAEA',
        'border-stone': '#E7E5E1',
        text: {
          primary: '#171717',
          secondary: '#737373',
          muted: '#A3A3A3',
        },
        primary: {
          DEFAULT: '#111111',
          hover: '#262626',
          foreground: '#FFFFFF',
        },
        accent: {
          green: '#10B981',
          'green-light': '#ECFDF5',
          'green-border': '#A7F3D0',
          red: '#EF4444',
          'red-light': '#FEF2F2',
          'red-border': '#FECACA',
        }
      },
      fontFamily: {
        serif: ['Newsreader', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.02)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
        'floating': '0 20px 40px -15px rgba(0, 0, 0, 0.07), 0 0 1px 1px rgba(0, 0, 0, 0.04)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
