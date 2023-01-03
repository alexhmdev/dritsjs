/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html', './src/**/*.{html,js}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        vsdark: '#0b1015',
      },
      fontFamily: {
        vscode: ['"Fira Code"', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
