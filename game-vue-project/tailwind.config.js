/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'transform': 'transform'
      },
      colors: {

      },
    },
    fontFamily: {

    },
    screens: {
      'xs':'340px',
      'lg':'1024px',
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

