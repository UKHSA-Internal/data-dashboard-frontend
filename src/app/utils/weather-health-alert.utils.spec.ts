import {
  getActiveCssVariableFromColour,
  getCssVariableFromColour,
  getHoverCssVariableFromColour,
  getTagVariantFromStatus,
} from './weather-health-alert.utils'

describe('getTagVariantFromStatus', () => {
  test('returns correct class for Amber status', () => {
    expect(getTagVariantFromStatus('Amber')).toBe('govuk-tag--orange')
  })

  test('returns correct class for Green status', () => {
    expect(getTagVariantFromStatus('Green')).toBe('govuk-tag--green')
  })

  test('returns correct class for Red status', () => {
    expect(getTagVariantFromStatus('Red')).toBe('govuk-tag--red')
  })

  test('returns correct class for Yellow status', () => {
    expect(getTagVariantFromStatus('Yellow')).toBe('govuk-tag--yellow')
  })
})

describe('getCssVariableFromColour', () => {
  test('Returns the correct CSS variable for Green', () => {
    expect(getCssVariableFromColour('Green')).toBe('var(--colour-green)')
  })

  test('Returns the correct CSS variable for Amber', () => {
    expect(getCssVariableFromColour('Amber')).toBe('var(--colour-orange)')
  })

  test('Returns the correct CSS variable for Yellow', () => {
    expect(getCssVariableFromColour('Yellow')).toBe('var(--colour-yellow)')
  })

  test('Returns the correct CSS variable for Red', () => {
    expect(getCssVariableFromColour('Red')).toBe('var(--colour-red)')
  })
})

describe('getHoverCssVariableFromColour', () => {
  test('Returns the correct hover CSS variable for Green', () => {
    expect(getHoverCssVariableFromColour('Green')).toBe('var(--colour-green-dark)')
  })

  test('Returns the correct hover CSS variable for Amber', () => {
    expect(getHoverCssVariableFromColour('Amber')).toBe('var(--colour-orange-dark)')
  })

  test('Returns the correct hover CSS variable for Yellow', () => {
    expect(getHoverCssVariableFromColour('Yellow')).toBe('var(--colour-yellow-dark)')
  })

  test('Returns the correct hover CSS variable for Red', () => {
    expect(getHoverCssVariableFromColour('Red')).toBe('var(--colour-red-dark)')
  })
})

describe('getActiveCssVariableFromColour', () => {
  test('Returns the correct active CSS variable for Green', () => {
    expect(getActiveCssVariableFromColour('Green')).toBe('var(--colour-green-darkest)')
  })

  test('Returns the correct active CSS variable for Amber', () => {
    expect(getActiveCssVariableFromColour('Amber')).toBe('var(--colour-orange-darkest)')
  })

  test('Returns the correct active CSS variable for Yellow', () => {
    expect(getActiveCssVariableFromColour('Yellow')).toBe('var(--colour-yellow-darkest)')
  })

  test('Returns the correct active CSS variable for Red', () => {
    expect(getActiveCssVariableFromColour('Red')).toBe('var(--colour-red-darkest)')
  })
})
