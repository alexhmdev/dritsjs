/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html', './src/**/*.{html,js}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        vsdark: '#1e1e1e',
      },
      fontFamily: {
        vscode: ['"Fira Code"', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
