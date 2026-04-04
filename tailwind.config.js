/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  safelist: [
    'bg-[#fde8e8]', 'text-[#c0392b]',
    'bg-[#fef3e2]', 'text-[#b45309]',
    'bg-[#e6f4ea]', 'text-[#276749]',
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          bg:        '#f5f5f7',
          card:      '#ffffff',
          heading:   '#1d1d1f',
          secondary: '#6e6e73',
          accent:    '#0066cc',
          border:    '#d2d2d7',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      borderRadius: {
        apple:        '18px',
        'apple-sm':   '10px',
        'apple-pill': '980px',
      },
      boxShadow: {
        apple:         '0 2px 20px rgba(0,0,0,0.08)',
        'apple-modal': '0 8px 40px rgba(0,0,0,0.18)',
        'apple-toast': '0 4px 24px rgba(0,0,0,0.12)',
      },
      maxWidth: {
        page: '1200px',
      },
    },
  },
  plugins: [],
}
