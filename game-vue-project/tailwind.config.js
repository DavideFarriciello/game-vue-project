/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {

      },
    },
    fontFamily: {

    },
    screens: {

    }

  },
  variants: {
    extend: {
      translate: ['hover', 'group-hover'], // Ensures translate utilities are active on hover
      textColor: ['hover', 'group-hover'],
    }
  },
  plugins: [],
}

