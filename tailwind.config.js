/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#0f1419',
        card: '#1a1f29',
        elevated: '#242933',
        border: '#2d3540',
        success: '#00d084',
        error: '#ff4757',
        warning: '#ffa502',
        info: '#1e90ff',
        deploy: '#a55eea',
      },
    },
  },
  plugins: [],
}
