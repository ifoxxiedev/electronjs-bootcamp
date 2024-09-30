/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      },
      animation: {
        slideIn: 'slideIn 0.28s ease-out',
        slideOut: 'slideOut 0.28s ease-out'
      },
      keyframes: {
        slideIn: {
          from: {
            width: '0'
          },
          to: {
            width: 'var(--radix-collapsible-content-width)'
          }
        },
        slideOut: {
          from: {
            width: 'var(--radix-collapsible-content-width)'
          },
          to: {
            width: '0'
          }
        }
      }
    }
  },
  plugins: []
}
