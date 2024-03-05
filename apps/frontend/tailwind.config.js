/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  darkMode: 'media',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "../../../node_modules/flowbite/**/*.{js,ts}"
  ],
  theme: {
    extend: {
      // colors: {
      //   stone: colors.warmGray,
      //   sky: colors.lightBlue,
      //   neutral: colors.trueGray,
      //   gray: colors.coolGray,
      //   slate: colors.blueGray,
      //   green: colors.green,
      // }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

