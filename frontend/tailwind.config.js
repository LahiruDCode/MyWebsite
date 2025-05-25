/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
        dark: '#111827',
        light: '#F9FAFB',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
  safelist: [
    'bg-primary', 'bg-secondary', 'text-primary', 'text-secondary',
    'dark:bg-dark', 'dark:text-white', 'dark:bg-gray-800', 'dark:bg-gray-700',
    'dark:text-gray-300', 'dark:text-blue-400', 'dark:hover:bg-gray-700',
    'dark:border-gray-700', 'dark:hover:text-secondary'
  ]
}
