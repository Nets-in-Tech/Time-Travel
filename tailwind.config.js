/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#1a1f3a',
        'medium-blue': '#2a3f5f',
        'light-blue': '#4a7ba7',
        'lighter-blue': '#6ba3d1',
        'brown-orange': '#8b6f47',
        'brown-orange-light': '#a6896b',
      },
      animation: {
        'twinkle': 'twinkle 3s ease-in-out infinite alternate',
      },
      keyframes: {
        twinkle: {
          '0%': { opacity: '0.5' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
