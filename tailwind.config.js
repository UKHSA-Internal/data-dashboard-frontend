/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      sans: ['var(--font-roboto)'],
    },
    fontSize: {
      // Note: Use govuk classes for font sizes
      // https://design-system.service.gov.uk/styles/spacing/
    },
    spacing: {
      // Note: Use govuk classes for sizing where possible (padding, margins etc)
      // https://design-system.service.gov.uk/styles/spacing/
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
    // https://design-system.service.gov.uk/styles/colour/
    colors: ({ colors }) => ({
      inherit: colors.inherit,
      current: colors.current,
      transparent: colors.transparent,
      grey: {
        1: 'var(--colour-grey-1)',
        2: 'var(--colour-grey-2)',
        3: 'var(--colour-grey-3)',
        4: 'var(--colour-grey-4)',
      },
      red: 'var(--colour-red)',
      yellow: 'var(--colour-yellow)',
      green: 'var(--colour-green)',
      blue: 'var(--colour-blue)',
      'dark-blue': 'var(--colour-dark-blue)',
      'light-blue': 'var(--colour-light-blue)',
      purple: 'var(--colour-purple)',
      black: 'var(--colour-black)',
      'dark-grey': 'var(--colour-dark-grey)',
      'mid-grey': 'var(--colour-mid-grey)',
      'light-grey': 'var(--colour-light-grey)',
      white: 'var(--colour-white)',
      'light-purple': 'var(--colour-light-purple)',
      'bright-purple': 'var(--colour-bright-purple)',
      pink: 'var(--colour-pink)',
      'light-pink': 'var(--colour-light-pink)',
      orange: 'var(--colour-orange)',
      brown: 'var(--colour-brown)',
      'light-green': 'var(--colour-light-green)',
      turquoise: 'var(--colour-turquoise)',
    }),
    extend: {
      backgroundImage: {
        arrow_up_green: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='none'><path stroke='%23005A30' stroke-width='2' d='M6.864 14.364v-12M7.071 1.707.707 8.071M7.207 2.293l6.364 6.364'/><path stroke='%23005A30' stroke-width='1.02' d='m6.485.881 2.121 2.122'/></svg>")`,
        arrow_up_red: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='none'%3E%3Cpath stroke='%23AA2A16' stroke-width='2' d='M6.864 14.364v-12M7.071 1.707.707 8.071M7.207 2.293l6.364 6.364'/%3E%3Cpath stroke='%23AA2A16' stroke-width='1.02' d='m6.485.881 2.121 2.122'/%3E%3C/svg%3E")`,
        arrow_down_green: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='14' fill='none'%3E%3Cpath stroke='%23005A30' stroke-width='2' d='M8 0v12M7.793 12.657l6.364-6.364M7.657 12.071 1.293 5.707'/%3E%3Cpath stroke='%23005A30' stroke-width='1.02' d='m8.379 13.483-2.121-2.122'/%3E%3C/svg%3E")`,
        arrow_down_red: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='14' fill='none'%3E%3Cpath stroke='%23AA2A16' stroke-width='2' d='M8 0v12M7.793 12.657l6.364-6.364M7.657 12.071 1.293 5.707'/%3E%3Cpath stroke='%23AA2A16' stroke-width='1.02' d='m8.379 13.483-2.121-2.122'/%3E%3C/svg%3E")`,
        back_to_top: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='none'%3E%3Cpath stroke='%231D70B8' stroke-width='2' d='M6.864 14.364v-12m.207-.657L.707 8.071m6.5-5.778 6.364 6.364'/%3E%3Cpath stroke='%231D70B8' stroke-width='1.02' d='m6.485.881 2.121 2.122'/%3E%3C/svg%3E")`,
      },
    },
  },
  plugins: [],
}
