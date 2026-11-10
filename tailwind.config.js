/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        parota: {
          50: '#F9F6F0',
          100: '#F2ECE1',
          200: '#E5DAC6',
          300: '#D3C0A1',
          400: '#BDA076',
          500: '#A68354',
          600: '#8C693E',
          700: '#715232',
          800: '#5D432B',
          900: '#4D3826',
        },
        copal: {
          50: '#FCF4F0',
          100: '#F9E6DC',
          200: '#F2CBB8',
          300: '#E9A789',
          400: '#DF7E56',
          500: '#D15B2E',
          600: '#B84620',
          700: '#98371C',
          800: '#7C2F1C',
          900: '#66291A',
        },
        oyamel: {
          50: '#F2F6F4',
          100: '#DFEAE4',
          200: '#C1D6CC',
          300: '#97BAAA',
          400: '#6B9985',
          500: '#4B7D68',
          600: '#396352',
          700: '#2E4F42',
          800: '#264036',
          900: '#1A2D26',
          950: '#0E1915',
        }
      }
    },
  },
  plugins: [],
};
