/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7e12f0',
        secondary: '#b434b0',
        accent: '#ed5073',
        surface: '#e9d8fb',
        'primary-darker': '#6B0AC4',
        'secondary-darker': '#9B2E96',
        'accent-darker': '#D43E5F'
      },
      fontFamily: {
        'display': ['Poppins', 'sans-serif'],
        'body': ['Inter', 'sans-serif']
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #7e12f0 0%, #b434b0 100%)',
        'gradient-accent': 'linear-gradient(135deg, #ed5073 0%, #b434b0 100%)',
        'gradient-surface': 'linear-gradient(135deg, #e9d8fb 0%, #f3e8ff 100%)'
      },
      animation: {
        'bounce-subtle': 'bounce 0.6s ease-in-out',
        'pulse-soft': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}