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
        background: {
          DEFAULT: '#000000',
          light: '#1a1a1a',
          lighter: '#2a2a2a',
        },
        accent: {
          orange: '#FF6B00',
          yellow: '#FFC300',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'Roboto', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.75rem',
      },
      boxShadow: {
        'glow-orange': '0 0 15px rgba(255, 107, 0, 0.3)',
        'glow-yellow': '0 0 15px rgba(255, 195, 0, 0.3)',
      },
    },
  },
  plugins: [],
} 