/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      sans: ['var(--font-roboto)'],
    },
    // https://design-system.service.gov.uk/styles/spacing/
    spacing: {
      0: '0',
      1: '5px',
      2: '10px',
      3: '15px',
      4: '20px',
      5: '25px',
      6: '30px',
      7: '40px',
      8: '50px',
      9: '60px',
    },
    colors: {
      grey: {
        1: '#6f777b',
        2: '#bfc1c3',
        3: '#f3f2f1',
        4: '#f8f8f8',
      },
      blue: '#1d70b8',
    },
    extend: {},
  },
  plugins: [],
}
