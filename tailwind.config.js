/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        ink: {
          950: '#071522',
          900: '#0a2a43',
          800: '#103a5c',
          700: '#185176'
        },
        saffron: '#f59e0b',
        indiaGreen: '#178a57'
      },
      boxShadow: {
        soft: '0 18px 48px rgba(9, 42, 67, 0.10)',
        panel: '0 8px 30px rgba(9, 42, 67, 0.08)'
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '1' }
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateX(-6px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        }
      },
      animation: {
        'fade-up': 'fade-up 420ms ease-out both',
        'pulse-soft': 'pulse-soft 1.35s ease-in-out infinite',
        'slide-in': 'slide-in 280ms ease-out both'
      }
    }
  },
  plugins: []
}
