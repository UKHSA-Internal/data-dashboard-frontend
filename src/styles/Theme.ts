/**
 * Custom colours that aren't in the 'govuk-colours' package
 */
export const COLOURS = {
  WHITE: '#ffffff',
  BLUE_DARK: '#003078',
  BUTTON_GREY: '#D9D9D9',
} as const

export const chartSizes = {
  narrow: {
    width: 435,
    height: 220,
  },
  wide: {
    width: 930,
    height: 220,
  },
} as const

export const chartFormat = 'svg' as const

export const chartDownloadButtonWidth = '122px'
