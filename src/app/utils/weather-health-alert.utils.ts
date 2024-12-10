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

export enum ColourVariableMap {
  Green = 'var(--colour-green)',
  Amber = 'var(--colour-orange)',
  Yellow = 'var(--colour-custard)',
  Red = 'var(--colour-red)',
}

export enum ColourBackgroundMap {
  Green = 'bg-green',
  Amber = 'bg-orange',
  Yellow = 'bg-custard',
  Red = 'bg-red',
}

export enum HoverColourVariableMap {
  Green = 'var(--colour-green-dark)',
  Amber = 'var(--colour-orange-dark)',
  Yellow = 'var(--colour-custard-dark)',
  Red = 'var(--colour-red-dark)',
}

export enum ActiveColourVariableMap {
  Green = 'var(--colour-green-darkest)',
  Amber = 'var(--colour-orange-darkest)',
  Yellow = 'var(--colour-custard-darkest)',
  Red = 'var(--colour-red-darkest)',
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
