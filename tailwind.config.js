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
      // Note: Use govuk classes for sizing (padding, margins etc)
      // https://design-system.service.gov.uk/styles/spacing/
    },
    // https://design-system.service.gov.uk/styles/colour/
    colors: {
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
    },
    extend: {},
  },
  plugins: [],
}
