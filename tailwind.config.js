/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lemon: {
          50: '#ffffe5',
          100: '#fffeb3',
          200: '#fff880',
          300: '#fff24d',
          400: '#f8ed68',
          500: '#f4e85c',
          600: '#e6d73d',
          700: '#cca91a',
          800: '#a68011',
          900: '#805d0b',
        },
        peach: {
          50: '#fff8f3',
          100: '#ffe8db',
          200: '#ffd0b3',
          300: '#ffb58a',
          400: '#ff9a66',
          500: '#ffc4a3',
          600: '#ff8245',
          700: '#e05920',
          800: '#ba3c11',
          900: '#942b10',
        },
        cream: {
          50: '#ffffff',
          100: '#fffdf7',
          200: '#fff9ed',
          300: '#fdf0d5',
          400: '#f9e0b3',
          500: '#f2c98a',
          600: '#e0a961',
          700: '#c28540',
          800: '#9e6532',
          900: '#82532c',
        },
        charcoal: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6b6b6b',
          600: '#555555',
          700: '#454545',
          800: '#333333',
          900: '#171717',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(23, 23, 23, 0.05), 0 2px 6px -2px rgba(23, 23, 23, 0.02)',
        'soft-hover': '0 10px 25px -3px rgba(23, 23, 23, 0.08), 0 4px 10px -2px rgba(23, 23, 23, 0.04)',
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
