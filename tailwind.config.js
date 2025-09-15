// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      sans: ['var(--font-primary)'],
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
      offwhite: 'var(--colour-offwhite)',
      red: 'var(--colour-red)',
      'red-dark': 'var(--colour-red-dark)',
      yellow: 'var(--colour-yellow)',
      custard: 'var(--colour-custard)',
      green: 'var(--colour-green)',
      'green-dark': 'var(--colour-green-dark)',
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
      'dark-purple': 'var(--colour-dark-purple)',
      pink: 'var(--colour-pink)',
      'light-pink': 'var(--colour-light-pink)',
      orange: 'var(--colour-orange)',
      brown: 'var(--colour-brown)',
      'light-green': 'var(--colour-light-green)',
      turquoise: 'var(--colour-turquoise)',
      'green-opaque': 'var(--colour-green-opaque)',
      'yellow-opaque': 'var(--colour-yellow-opaque)',
      'orange-opaque': 'var(--colour-orange-opaque)',
      'red-opaque': 'var(--colour-red-opaque)',
      'delay-blue': 'var(--colour-delay-blue)',
      'delay-blue-opaque': 'var(--colour-delay-blue-opaque)',
      'colour-5-dark-blue': 'var(--colour-map-dark-blue)',
      'colour-3-turquoise': 'var(--colour-map-turquoise)',
      'colour-4-blue': 'var(--colour-map-blue)',
      'colour-2-light-green': 'var(--colour-map-light-green)',
      'colour-1-light-yellow': 'var(--colour-map-light-yellow)',
    }),
    extend: {
      backgroundImage: {
        arrow_up_green: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='none'><path stroke='%23005A30' stroke-width='2' d='M6.864 14.364v-12M7.071 1.707.707 8.071M7.207 2.293l6.364 6.364'/><path stroke='%23005A30' stroke-width='1.02' d='m6.485.881 2.121 2.122'/></svg>")`,
        arrow_up_red: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='none'%3E%3Cpath stroke='%23AA2A16' stroke-width='2' d='M6.864 14.364v-12M7.071 1.707.707 8.071M7.207 2.293l6.364 6.364'/%3E%3Cpath stroke='%23AA2A16' stroke-width='1.02' d='m6.485.881 2.121 2.122'/%3E%3C/svg%3E")`,
        arrow_up_blue: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='none'%3E%3Cpath stroke='%231D70B8' stroke-width='2' d='M6.864 14.364v-12M7.071 1.707.707 8.071M7.207 2.293l6.364 6.364'/%3E%3Cpath stroke='%23AA2A16' stroke-width='1.02' d='m6.485.881 2.121 2.122'/%3E%3C/svg%3E")`,
        arrow_down_green: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='14' fill='none'%3E%3Cpath stroke='%23005A30' stroke-width='2' d='M8 0v12M7.793 12.657l6.364-6.364M7.657 12.071 1.293 5.707'/%3E%3Cpath stroke='%23005A30' stroke-width='1.02' d='m8.379 13.483-2.121-2.122'/%3E%3C/svg%3E")`,
        arrow_down_red: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='14' fill='none'%3E%3Cpath stroke='%23AA2A16' stroke-width='2' d='M8 0v12M7.793 12.657l6.364-6.364M7.657 12.071 1.293 5.707'/%3E%3Cpath stroke='%23AA2A16' stroke-width='1.02' d='m8.379 13.483-2.121-2.122'/%3E%3C/svg%3E")`,
        fill_arrow_right_blue: `url("data:image/svg+xml,<svg fill='%231D70B8' xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='14 7.052557945251465 24 37.94808578491211'><path d='M14,43.7V8.3c0-1,1.3-1.7,2.2-0.9l21.2,17.3c0.8,0.6,0.8,1.9,0,2.5L16.2,44.7C15.3,45.4,14,44.8,14,43.7z'/></svg>")`,
        fill_arrow_up_blue: `url("data:image/svg+xml,<svg fill='%231D70B8' xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='7.052557945251465 13.999998092651367 37.94808578491211 24.000001907348633' enable-background='0 0 52 52' xml:space='preserve'><path d='M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z'/></svg>")`,
        alt_arrow_up_green: `url("data:image/svg+xml,%3Csvg width='19' height='18' viewBox='0 0 19 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 18.5L9.87201 1.60558M17.9331 9.85048L9.87201 1.60758L1.63867 10.6095' stroke='%2300703C' stroke-width='2'/%3E%3C/svg%3E%0A")`,
        alt_arrow_up_red: `url("data:image/svg+xml,%3Csvg width='19' height='18' viewBox='0 0 19 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 18.5L9.87201 1.60558M17.9331 9.85048L9.87201 1.60758L1.63867 10.6095' stroke='%23AB2B17' stroke-width='2'/%3E%3C/svg%3E%0A")`,
        alt_arrow_down_green: `url("data:image/svg+xml,%3Csvg width='19' height='19' viewBox='0 0 19 19' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.93359 0.46875L9.06159 17.3632M1.00052 9.11827L9.06159 17.3612L17.2949 8.35926' stroke='%2300703C' stroke-width='2'/%3E%3C/svg%3E%0A")`,
        alt_arrow_down_red: `url("data:image/svg+xml,%3Csvg width='19' height='19' viewBox='0 0 19 19' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.93359 0.46875L9.06159 17.3632M1.00052 9.11827L9.06159 17.3612L17.2949 8.35926' stroke='%23AA2A16' stroke-width='2'/%3E%3C/svg%3E%0A")`,
        back_to_top: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='none'%3E%3Cpath stroke='%231D70B8' stroke-width='2' d='M6.864 14.364v-12m.207-.657L.707 8.071m6.5-5.778 6.364 6.364'/%3E%3Cpath stroke='%231D70B8' stroke-width='1.02' d='m6.485.881 2.121 2.122'/%3E%3C/svg%3E")`,
        dash: `url("data:image/svg+xml,%3Csvg class='nhsuk-icon nhsuk-icon__emdash' xmlns='http://www.w3.org/2000/svg' fill='%23aeb7bd' width='19' height='1' aria-hidden='true'%3E%3Cpath d='M0 0h19v1H0z'%3E%3C/path%3E%3C/svg%3E")`,
        download: `url("data:image/svg+xml,%3Csvg width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23ffffff' d='M7 0h2v11H7zM0 16v-2h16v2z'/%3E%3Cpath fill='%23ffffff' d='M8.414 12.11 7 10.698 11.696 6l1.414 1.414z'/%3E%3Cpath fill='%23ffffff' d='M9 11H7V1h2z'/%3E%3Cpath fill='%23ffffff' d='M3 7.414 4.414 6l4.696 4.696-1.414 1.414z'/%3E%3Cpath fill='%23ffffff' d='M7.168 11.574 7.742 11l.889.889-.574.574z'/%3E%3C/svg%3E")`,
        download_dark: `url("data:image/svg+xml,%3Csvg width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23003078' d='M7 0h2v11H7zM0 16v-2h16v2z'/%3E%3Cpath fill='%23003078' d='M8.414 12.11 7 10.698 11.696 6l1.414 1.414z'/%3E%3Cpath fill='%23003078' d='M9 11H7V1h2z'/%3E%3Cpath fill='%23003078' d='M3 7.414 4.414 6l4.696 4.696-1.414 1.414z'/%3E%3Cpath fill='%231d70b8' d='M7.168 11.574 7.742 11l.889.889-.574.574z'/%3E%3C/svg%3E")`,
        list_item_arrow: `url("data:image/svg+xml, %3Csvg width='11' height='17' viewBox='0 0 11 17' fill='none' xmlns='http://www.w3.org/2000/svg' %3E%3Crect x='2.22192' width='11.6773' height='3.14219' rx='1.5711' transform='rotate(45 2.22192 0)' fill='%231D70B8'/%3E%3Crect x='0.440186' y='14.7781' width='11.6773' height='3.14219' rx='1.5711' transform='rotate(-45 0.440186 14.7781)' fill='%231D70B8'/%3E%3C/svg%3E")`,
        list_item_arrow_hover: `url("data:image/svg+xml,%3Csvg className='absolute inset-y-1/2 right-0 -mt-2' width='11' height='17' viewBox='0 0 11 17' fill='none' xmlns='http://www.w3.org/2000/svg' %3E%3Crect x='2.22192' width='11.6773' height='3.14219' rx='1.5711' transform='rotate(45 2.22192 0)' fill='%23003078'/%3E%3Crect x='0.440186' y='14.7781' width='11.6773' height='3.14219' rx='1.5711' transform='rotate(-45 0.440186 14.7781)' fill='%23003078'/%3E%3C/svg%3E")`,
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    plugin(function ({ addVariant, addComponents, addUtilities, matchUtilities, theme }) {
      addVariant('js', 'body.js-enabled &')
      addVariant('no-js', 'body:not(.js-enabled) &')
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
      addUtilities({
        // UKHSA Focus utility
        '.ukhsa-focus': {
          '&:focus': {
            'box-shadow': 'none',
          },
          '&:focus:after': {
            '@apply absolute inset-0 pointer-events-none z-[1000] content-[""]': {},
            'box-shadow': `0px 0px 0px 0px #fff, inset 0px 0px 0px 1px #0b0c0c, 0px 0px 0px 2px #0b0c0c, 0px 0px 0px 5px #fd0`,
            outline: '3px solid rgba(0, 0, 0, 0)',
          },
          '&--button': {
            '@apply ukhsa-focus': {},
            '&:focus:after': {
              'box-shadow': `0px 0px 0px 2px #fff, inset 0px 0px 0px 0px #0b0c0c, 0px 0px 0px 5px #0b0c0c, 0px 0px 0px 8px #fd0`,
            },
          },
        },
      })
      addComponents({
        // UKHSA Map component
        '.ukhsa-map': {
          // Button variant
          '&__button': {
            '@apply ukhsa-focus--button flex mb-0 !important': {},

            '&:not(:hover)': {
              '@apply bg-white': {},
            },

            '&:focus': {
              '@apply shadow-none bg-white !important': {},

              '&:after': {
                '@apply absolute inset-[2px]': {},
              },
            },
          },
        },
      })
    }),
  ],
}
