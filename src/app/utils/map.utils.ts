/**
 * This is a temporary solution for extracting the health alert type from the slug.
 * TODO: Remove this once the link is converted to a CMS internal button in CDD-1977
 */

import { HealthAlertStatus } from '@/api/models/Alerts'

/**
 * Util for return a GOV.UK Tag component style variant based on Weather Health Alert statuses
 */
export const getTagVariantFromStatus = (status: HealthAlertStatus) => {
  if (status === 'Amber') return 'govuk-tag--orange'
  return `govuk-tag--${status.toLowerCase()}`
}

/**
 * Utils for mapping health alert statues to GOV.UK compatible colours
 * Note: the dark & darkest variations are bespoke and can be modified in globals.scss.
 */

export enum MapFeatureColour {
  Green = 'Green',
  Amber = 'Amber',
  Yellow = 'Yellow',
  Red = 'Red',
  COLOUR_1_DARK_BLUE = 'COLOUR_1_DARK_BLUE',
  COLOUR_2_TURQUOISE = 'COLOUR_2_TURQUOISE',
  COLOUR_3_DARK_PINK = 'COLOUR_3_DARK_PINK',
  COLOUR_4_ORANGE = 'COLOUR_4_ORANGE',
  COLOUR_5_DARK_GREY = 'COLOUR_5_DARK_GREY',
  COLOUR_6_LIGHT_PURPLE = 'COLOUR_6_LIGHT_PURPLE',
  COLOUR_7_BURGUNDY = 'COLOUR_7_BURGUNDY',
  COLOUR_8_MUSTARD = 'COLOUR_8_MUSTARD',
  COLOUR_9_DEEP_PLUM = 'COLOUR_9_DEEP_PLUM',
  COLOUR_10_PINK = 'COLOUR_10_PINK',
  COLOUR_11_KHAKI = 'COLOUR_11_KHAKI',
  COLOUR_12_BLUE = 'COLOUR_12_BLUE',
}

export enum ColourVariableMap {
  Green = 'var(--colour-green)',
  Amber = 'var(--colour-orange)',
  Yellow = 'var(--colour-custard)',
  Red = 'var(--colour-red)',
  COLOUR_1_DARK_BLUE = 'var(--colour-map-dark-blue-semi)',
  COLOUR_2_TURQUOISE = 'var(--colour-map-turquoise-semi)',
  COLOUR_3_DARK_PINK = 'var(--colour-map-dark-pink-semi)',
  COLOUR_4_ORANGE = 'var(--colour-map-orange-semi)',
  COLOUR_5_DARK_GREY = 'var(--colour-map-dark-grey-semi)',
  COLOUR_6_LIGHT_PURPLE = 'var(--colour-map-light-purple-semi)',
  COLOUR_7_BURGUNDY = 'var(--colour-map-burgundy-semi)',
  COLOUR_8_MUSTARD = 'var(--colour-map-mustard-semi)',
  COLOUR_9_DEEP_PLUM = 'var(--colour-map-deep-plum-semi)',
  COLOUR_10_PINK = 'var(--colour-map-pink-semi)',
  COLOUR_11_KHAKI = 'var(--colour-map-khaki-semi)',
  COLOUR_12_BLUE = 'var(--colour-map-blue-semi)',
}

export enum ColourBackgroundMap {
  Green = 'bg-green',
  Amber = 'bg-orange',
  Yellow = 'bg-custard',
  Red = 'bg-red',
  COLOUR_1_DARK_BLUE = 'bg-colour-1-dark-blue',
  COLOUR_2_TURQUOISE = 'bg-colour-2-turquoise',
  COLOUR_3_DARK_PINK = 'bg-colour-3-dark-pink',
  COLOUR_4_ORANGE = 'bg-colour-4-orange',
  COLOUR_5_DARK_GREY = 'bg-colour-5-dark-grey',
  COLOUR_6_LIGHT_PURPLE = 'bg-colour-6-light-purple',
  COLOUR_7_BURGUNDY = 'bg-colour-7-burgundy',
  COLOUR_8_MUSTARD = 'bg-colour-8-mustard',
  COLOUR_9_DEEP_PLUM = 'bg-colour-9-deep-plum',
  COLOUR_10_PINK = 'bg-colour-10-pink',
  COLOUR_11_KHAKI = 'bg-colour-11-khaki',
  COLOUR_12_BLUE = 'bg-colour-12-blue',
}

export enum HoverColourVariableMap {
  Green = 'var(--colour-green-dark)',
  Amber = 'var(--colour-orange-dark)',
  Yellow = 'var(--colour-custard-dark)',
  Red = 'var(--colour-red-dark)',
  COLOUR_1_DARK_BLUE = 'var(--colour-map-dark-blue-hover)',
  COLOUR_2_TURQUOISE = 'var(--colour-map-turquoise-hover)',
  COLOUR_3_DARK_PINK = 'var(--colour-map-dark-pink-hover)',
  COLOUR_4_ORANGE = 'var(--colour-map-orange-hover)',
  COLOUR_5_DARK_GREY = 'var(--colour-map-dark-grey-hover)',
  COLOUR_6_LIGHT_PURPLE = 'var(--colour-map-light-purple-hover)',
  COLOUR_7_BURGUNDY = 'var(--colour-map-burgundy-hover)',
  COLOUR_8_MUSTARD = 'var(--colour-map-mustard-hover)',
  COLOUR_9_DEEP_PLUM = 'var(--colour-map-deep-plum-hover)',
  COLOUR_10_PINK = 'var(--colour-map-pink-hover)',
  COLOUR_11_KHAKI = 'var(--colour-map-khaki-hover)',
  COLOUR_12_BLUE = 'var(--colour-map-blue-hover)',
}

export enum ActiveColourVariableMap {
  Green = 'var(--colour-green-darkest)',
  Amber = 'var(--colour-orange-darkest)',
  Yellow = 'var(--colour-custard-darkest)',
  Red = 'var(--colour-red-darkest)',
  COLOUR_1_DARK_BLUE = 'var(--colour-map-dark-blue)',
  COLOUR_2_TURQUOISE = 'var(--colour-map-turquoise)',
  COLOUR_3_DARK_PINK = 'var(--colour-map-dark-pink)',
  COLOUR_4_ORANGE = 'var(--colour-map-orange)',
  COLOUR_5_DARK_GREY = 'var(--colour-map-dark-grey)',
  COLOUR_6_LIGHT_PURPLE = 'var(--colour-map-light-purple)',
  COLOUR_7_BURGUNDY = 'var(--colour-map-burgundy)',
  COLOUR_8_MUSTARD = 'var(--colour-map-mustard)',
  COLOUR_9_DEEP_PLUM = 'var(--colour-map-deep-plum)',
  COLOUR_10_PINK = 'var(--colour-map-pink)',
  COLOUR_11_KHAKI = 'var(--colour-map-khaki)',
  COLOUR_12_BLUE = 'var(--colour-map-blue)',
}

export function getCssVariableFromColour(color: keyof typeof ColourVariableMap) {
  return ColourVariableMap[color]
}

export function getTailwindBackgroundFromColour(color: keyof typeof ColourBackgroundMap) {
  return ColourBackgroundMap[color]
}

export function getTextColourCssFromColour(colour: string) {
  if (colour == 'Yellow') {
    return 'text-black'
  } else {
    return 'text-white'
  }
}

export function getHoverCssVariableFromColour(color: keyof typeof HoverColourVariableMap) {
  return `${HoverColourVariableMap[color]}`
}

export function getActiveCssVariableFromColour(color: keyof typeof ActiveColourVariableMap) {
  return `${ActiveColourVariableMap[color]}`
}
