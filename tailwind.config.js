/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'chat-wallpaper': "url('/assets/img/wallpaper.jpg')"
      }
    }
  },
  plugins: []
}
