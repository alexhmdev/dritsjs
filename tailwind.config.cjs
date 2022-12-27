/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html', './src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        vsdark: '#1e1e1e',
      },
    },
  },
  plugins: [],
};
