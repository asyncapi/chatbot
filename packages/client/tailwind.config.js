module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: (theme) => ({
        ...theme('colors'),
        primary: '#14242f',
        100: '#e0f0fb',
        200: '#c1e1f8',
        300: '#a1d1f4',
        400: '#82c2f1',
        500: '#63b3ed',
        600: '#4f8fbe',
        700: '#3b6b8e',
        800: '#28485f',
        900: '#14242f',
        lightGray: '#f5f5f5',
        darkGray: '#66778c',
      }),
      // eslint-disable-next-line no-unused-vars
      backgroundImage: (theme) => ({
        huey:
          "url('/src/assets/lukasz.jpg')",
      }),
      height: {
        '10v': '10vh',
        '12v': '12vh',
        '20v': '20vh',
        '30v': '30vh',
        '40v': '40vh',
        '50v': '50vh',
        '60v': '60vh',
        '70v': '70vh',
        '78v': '78vh',
        '80v': '80vh',
        '90v': '90vh',
        '95v': '95vh',
        '100v': '100vh',
        '110v': '105vh',
      },
      width: {
        10: '10%',
        30: '30%',
        90: '90%',
        100: '100%',
      },
    },
  },
  variants: {
    animation: ['responsive', 'motion-safe', 'motion-reduce'],
  },
  plugins: [],
};
