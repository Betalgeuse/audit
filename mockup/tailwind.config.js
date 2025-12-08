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
        // BamSEC Design System
        bamsec: {
          burgundy: '#8B1538',
          'burgundy-dark': '#6d102c',
          'burgundy-light': '#f0e6e9',
          'burgundy-hover': '#a91d45',
        },
        // Semantic Colors
        primary: {
          DEFAULT: '#8B1538',
          dark: '#6d102c',
          light: '#f0e6e9',
          hover: '#a91d45',
        },
        surface: {
          DEFAULT: '#ffffff',
          secondary: '#fafafa',
          tertiary: '#f5f5f5',
        },
        border: {
          DEFAULT: '#e0e0e0',
          light: '#eeeeee',
          dark: '#cccccc',
        },
        text: {
          primary: '#333333',
          secondary: '#666666',
          muted: '#888888',
          inverse: '#ffffff',
        },
        // Data Visualization
        positive: '#00C853',
        negative: '#FF5252',
        warning: '#FFB300',
        info: '#2196F3',
        // Highlight
        highlight: {
          DEFAULT: '#FFF3CD',
          border: '#FFD93D',
          dark: '#FFE69C',
        },
        // Legacy FactSet (for gradual migration)
        factset: {
          blue: '#0066CC',
          dark: '#1a1a2e',
          light: '#f8f9fa',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Roboto Mono', 'SF Mono', 'Consolas', 'Liberation Mono', 'monospace'],
      },
      fontSize: {
        '2xs': ['10px', { lineHeight: '14px' }],
        xs: ['11px', { lineHeight: '16px' }],
        sm: ['12px', { lineHeight: '18px' }],
        base: ['13px', { lineHeight: '20px' }],
        md: ['14px', { lineHeight: '22px' }],
        lg: ['16px', { lineHeight: '24px' }],
        xl: ['18px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      animation: {
        'pulse-highlight': 'pulseHighlight 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.2s ease-out',
        'slide-down': 'slideDown 0.2s ease-out',
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
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'modal': '0 4px 24px rgba(0, 0, 0, 0.15)',
        'popup': '0 2px 12px rgba(0, 0, 0, 0.12)',
        'card': '0 1px 4px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}
