/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        industrial: {
          950: '#070b14',
          900: '#0f172a',
          850: '#131e35',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
          500: '#64748b',
          400: '#94a3b8',
          300: '#cbd5e1',
          200: '#e2e8f0',
          100: '#f1f5f9',
          50: '#f8fafc',
        },
        accent: {
          blue: '#1d4ed8',
          cyan: '#0284c7',
          sky: '#0ea5e9',
          teal: '#0d9488',
        }
      }
    },
  },
  plugins: [],
}
