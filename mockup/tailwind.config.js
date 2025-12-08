/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        factset: {
          blue: '#0066CC',
          dark: '#1a1a2e',
          light: '#f8f9fa',
          highlight: '#FFF3CD',
          highlightBorder: '#FFD93D',
        },
      },
      animation: {
        'pulse-highlight': 'pulseHighlight 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        pulseHighlight: {
          '0%, 100%': { backgroundColor: '#FFF3CD' },
          '50%': { backgroundColor: '#FFE69C' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
