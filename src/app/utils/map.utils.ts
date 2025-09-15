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
  MAP_COLOUR_1_LIGHT_YELLOW = 'MAP_COLOUR_1_LIGHT_YELLOW',
  MAP_COLOUR_2_LIGHT_GREEN = 'MAP_COLOUR_2_LIGHT_GREEN',
  MAP_COLOUR_3_TURQUOISE = 'MAP_COLOUR_3_TURQUOISE',
  MAP_COLOUR_4_BLUE = 'MAP_COLOUR_4_BLUE',
  MAP_COLOUR_5_DARK_BLUE = 'MAP_COLOUR_5_DARK_BLUE',
}

export enum ColourVariableMap {
  Green = 'var(--colour-green)',
  Amber = 'var(--colour-orange)',
  Yellow = 'var(--colour-custard)',
  Red = 'var(--colour-red)',
  MAP_COLOUR_1_LIGHT_YELLOW = 'var(--colour-map-light-yellow-semi)',
  MAP_COLOUR_2_LIGHT_GREEN = 'var(--colour-map-light-green-semi)',
  MAP_COLOUR_3_TURQUOISE = 'var(--colour-map-turquoise-semi)',
  MAP_COLOUR_4_BLUE = 'var(--colour-map-blue-semi)',
  MAP_COLOUR_5_DARK_BLUE = 'var(--colour-map-dark-blue-semi)',
}

export enum ColourBackgroundMap {
  Green = 'bg-green',
  Amber = 'bg-orange',
  Yellow = 'bg-custard',
  Red = 'bg-red',
  MAP_COLOUR_1_LIGHT_YELLOW = 'bg-colour-1-light-yellow',
  MAP_COLOUR_2_LIGHT_GREEN = 'bg-colour-2-light-green',
  MAP_COLOUR_3_TURQUOISE = 'bg-colour-3-turquoise',
  MAP_COLOUR_4_BLUE = 'bg-colour-4-blue',
  MAP_COLOUR_5_DARK_BLUE = 'bg-colour-5-dark-blue',
}

export enum HoverColourVariableMap {
  Green = 'var(--colour-green-dark)',
  Amber = 'var(--colour-orange-dark)',
  Yellow = 'var(--colour-custard-dark)',
  Red = 'var(--colour-red-dark)',
  MAP_COLOUR_1_LIGHT_YELLOW = 'var(--colour-map-light-yellow-hover)',
  MAP_COLOUR_2_LIGHT_GREEN = 'var(--colour-map-light-green-hover)',
  MAP_COLOUR_3_TURQUOISE = 'var(--colour-map-turquoise-hover)',
  MAP_COLOUR_4_BLUE = 'var(--colour-map-blue-hover)',
  MAP_COLOUR_5_DARK_BLUE = 'var(--colour-map-dark-blue-hover)',
}

export enum ActiveColourVariableMap {
  Green = 'var(--colour-green-darkest)',
  Amber = 'var(--colour-orange-darkest)',
  Yellow = 'var(--colour-custard-darkest)',
  Red = 'var(--colour-red-darkest)',
  MAP_COLOUR_1_LIGHT_YELLOW = 'var(--colour-map-light-yellow)',
  MAP_COLOUR_2_LIGHT_GREEN = 'var(--colour-map-light-green)',
  MAP_COLOUR_3_TURQUOISE = 'var(--colour-map-turquoise)',
  MAP_COLOUR_4_BLUE = 'var(--colour-map-blue)',
  MAP_COLOUR_5_DARK_BLUE = 'var(--colour-map-dark-blue)',
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
