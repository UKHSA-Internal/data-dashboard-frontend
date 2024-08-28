import { render, screen } from '@/config/test-utils'

import { PhaseBanner } from './PhaseBanner'

describe('PhaseBanner', () => {
  test('renders with default variant', () => {
    render(<PhaseBanner tag="Beta">This is a test</PhaseBanner>)

    const banner = screen.getByTestId('ukhsa-phase-banner')
    expect(banner).toHaveClass('govuk-phase-banner')
    expect(banner).not.toHaveClass('[&>*]:text-white border-0')

    const tag = screen.getByText('Beta')
    expect(tag).toHaveClass('govuk-tag govuk-phase-banner__content__tag')
    expect(tag).not.toHaveClass('bg-offwhite text-blue')

    expect(screen.getByText('This is a test')).toBeInTheDocument()
  })

  test('renders with light variant', () => {
    render(
      <PhaseBanner tag="Alpha" variant="light">
        Light variant test
      </PhaseBanner>
    )

    const banner = screen.getByTestId('ukhsa-phase-banner')
    expect(banner).toHaveClass('govuk-phase-banner [&>*]:text-white border-0')

    const tag = screen.getByText('Alpha')
    expect(tag).toHaveClass('govuk-tag govuk-phase-banner__content__tag bg-offwhite text-blue font-bold px-2 py-[6px]')
    expect(screen.getByText('Light variant test')).toBeInTheDocument()
  })

  test('applies additional className', () => {
    render(
      <PhaseBanner tag="Test" className="ukhsa-additional-class">
        With additional class
      </PhaseBanner>
    )

    const banner = screen.getByTestId('ukhsa-phase-banner')
    expect(banner).toHaveClass('govuk-phase-banner ukhsa-additional-class')
  })

  test('renders children correctly', () => {
    render(
      <PhaseBanner tag="Test">
        <span data-testid="child-element">Child content</span>
      </PhaseBanner>
    )

    const childElement = screen.getByTestId('child-element')
    expect(childElement).toBeInTheDocument()
    expect(childElement).toHaveTextContent('Child content')
  })
})
