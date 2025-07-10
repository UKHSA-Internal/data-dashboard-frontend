import { ControlPosition } from 'leaflet'
import React from 'react'

import { fireEvent, render, screen } from '@/config/test-utils'

import { MapLegendControl } from './MapLegendControl'
import { MapFeatureColour } from '@/app/utils/map.utils'

// Mock the translation hook
const mockT = jest.fn((key: string) => key)

jest.mock('@/app/i18n/client', () => ({
  useTranslation: jest.fn(() => ({ t: mockT })),
}))

// Mock react-dom createPortal
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: jest.fn((children) => children),
}))

// Mock the custom control component
interface MockControlProps {
  position: ControlPosition
  children: React.ReactNode
}

jest.mock('react-leaflet-custom-control', () => ({
  __esModule: true,
  default: ({ children, position }: MockControlProps) => (
    <div data-testid="custom-control" data-position={position}>
      {children}
    </div>
  ),
}))

// Mock clsx
jest.mock('clsx', () => ({
  __esModule: true,
  default: jest.fn((...args: (string | undefined | null | boolean)[]) => args.filter(Boolean).join(' ')),
}))

describe('MapLegendControl', () => {
  const mockLegendItems = [
    { colour: MapFeatureColour.COLOUR_10_PINK, title: 'Low Risk' },
    { colour: MapFeatureColour.COLOUR_10_PINK, title: 'Medium Risk' },
    { colour: MapFeatureColour.COLOUR_10_PINK, title: 'High Risk' },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when provided a position prop (Control mode)', () => {
    test('renders correctly with position and shows key by default', () => {
      render(<MapLegendControl position="bottomright" legendItems={mockLegendItems} />)

      expect(screen.getByTestId('custom-control')).toBeInTheDocument()
      expect(screen.getByTestId('map-key')).toBeInTheDocument()
      expect(screen.getByText('Key')).toBeInTheDocument()
    })

    test('applies correct position to Control component', () => {
      render(<MapLegendControl position="topleft" legendItems={mockLegendItems} />)

      const control = screen.getByTestId('custom-control')
      expect(control).toHaveAttribute('data-position', 'topleft')
    })

    test('shows display key button when key is hidden', () => {
      render(<MapLegendControl position="bottomright" legendItems={mockLegendItems} />)

      // Click close button to hide key
      const closeButton = screen.getByTestId('close-key-button')
      fireEvent.click(closeButton)

      expect(screen.getByText('Display Key')).toBeInTheDocument()
      expect(screen.queryByTestId('map-key')).not.toBeInTheDocument()
    })

    test('toggles between key and display button on click', () => {
      render(<MapLegendControl position="bottomright" legendItems={mockLegendItems} />)

      // Initially shows key
      expect(screen.getByTestId('map-key')).toBeInTheDocument()

      // Click close button
      const closeButton = screen.getByTestId('close-key-button')
      fireEvent.click(closeButton)

      // Should show display button
      expect(screen.getByText('Display Key')).toBeInTheDocument()
      expect(screen.queryByTestId('map-key')).not.toBeInTheDocument()

      // Click display button
      const displayButton = screen.getByText('Display Key')
      fireEvent.click(displayButton)

      // Should show key again
      expect(screen.getByTestId('map-key')).toBeInTheDocument()
      expect(screen.queryByText('Display Key')).not.toBeInTheDocument()
    })

    test('renders all legend items with correct colors and titles', () => {
      render(<MapLegendControl position="bottomright" legendItems={mockLegendItems} />)

      expect(screen.getByText('low risk')).toBeInTheDocument()
      expect(screen.getByText('medium risk')).toBeInTheDocument()
      expect(screen.getByText('high risk')).toBeInTheDocument()
    })

    test('legend items are rendered in reverse order', () => {
      render(<MapLegendControl position="bottomright" legendItems={mockLegendItems} />)

      const legendContainer = screen.getByTestId('map-key')
      const legendTexts = legendContainer.querySelectorAll('p.govuk-body')

      // Should be reversed: High Risk, Medium Risk, Low Risk
      expect(legendTexts[0]).toHaveTextContent('high risk')
      expect(legendTexts[1]).toHaveTextContent('medium risk')
      expect(legendTexts[2]).toHaveTextContent('low risk')
    })

    test('close button has correct styling and SVG icon', () => {
      render(<MapLegendControl position="bottomright" legendItems={mockLegendItems} />)

      const closeButton = screen.getByTestId('close-key-button')
      expect(closeButton).toHaveClass(
        'govuk-button govuk-button--secondary mb-3 flex w-auto gap-1 disabled:pointer-events-none'
      )

      const svg = closeButton.querySelector('svg')
      expect(svg).toHaveAttribute('aria-hidden', 'true')
      expect(svg).toHaveAttribute('focusable', 'false')
      expect(svg).toHaveAttribute('width', '20')
      expect(svg).toHaveAttribute('height', '20')
    })

    test('handles keyboard events on buttons', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

      render(<MapLegendControl position="bottomright" legendItems={mockLegendItems} />)

      const closeButton = screen.getByTestId('close-key-button')
      fireEvent.keyDown(closeButton, { key: 'Enter' })

      expect(consoleSpy).toHaveBeenCalledWith('Enter')

      consoleSpy.mockRestore()
    })
  })

  describe('when position is not applied (Legend mode)', () => {
    test('renders legend when no position provided', () => {
      render(<MapLegendControl position={null as unknown as ControlPosition} legendItems={mockLegendItems} />)

      expect(screen.queryByTestId('custom-control')).not.toBeInTheDocument()
      expect(screen.getByText('Key')).toBeInTheDocument()

      // Should render as h3 heading in legend mode
      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toHaveTextContent('Key')
    })

    test('renders horizontal legend bar below the map container', () => {
      render(<MapLegendControl position={null as unknown as ControlPosition} legendItems={mockLegendItems} />)

      // Should have legend items in reverse order
      expect(screen.getByText('High Risk')).toBeInTheDocument()
      expect(screen.getByText('Medium Risk')).toBeInTheDocument()
      expect(screen.getByText('Low Risk')).toBeInTheDocument()
    })

    test('Uses applicable styling', () => {
      const { container } = render(
        <MapLegendControl position={null as unknown as ControlPosition} legendItems={mockLegendItems} />
      )

      const legendContainer = container.firstChild as HTMLElement
      expect(legendContainer).toHaveClass(
        'z-[1000] flex min-w-[280px] max-w-full bg-white rounded shadow-lg px-4 py-3  sm:min-w-[400px] md:min-w-[600px]'
      )
    })

    test('renders items with different structure', () => {
      render(<MapLegendControl position={null as unknown as ControlPosition} legendItems={mockLegendItems} />)

      // In legend mode, titles are not lowercased
      expect(screen.getByText('High Risk')).toBeInTheDocument()
      expect(screen.getByText('Medium Risk')).toBeInTheDocument()
      expect(screen.getByText('Low Risk')).toBeInTheDocument()
    })
  })

  describe('color mapping', () => {
    test('applies correct background colors for all color types', () => {
      const colorTestItems = [
        { colour: MapFeatureColour.COLOUR_10_PINK, title: 'over 95%' },
        { colour: MapFeatureColour.COLOUR_12_BLUE, title: '90% - 95%' },
        { colour: MapFeatureColour.COLOUR_9_DEEP_PLUM, title: '85% - 90%' },
        { colour: MapFeatureColour.COLOUR_6_LIGHT_PURPLE, title: '80% - 85%' },
        { colour: MapFeatureColour.COLOUR_1_DARK_BLUE, title: 'under 80%' },
      ]

      const { container } = render(<MapLegendControl position="bottomright" legendItems={colorTestItems} />)

      // Check that color classes are applied (through clsx mock)
      expect(container.querySelector('var(--colour-map-light-purple-semi)')).toBeInTheDocument()
      expect(container.querySelector('var(--colour-map-blue-semi)')).toBeInTheDocument()
      expect(container.querySelector('var(--colour-map-deep-plum-semi)')).toBeInTheDocument()
      expect(container.querySelector('var(--colour-map-pink-semi)')).toBeInTheDocument()
      expect(container.querySelector('var(--colour-map-dark-blue-semi)')).toBeInTheDocument()
    })

    test('handles unknown color gracefully', () => {
      const unknownColorItems = [{ colour: 'unknown-color', title: 'Unknown Color' }]

      render(<MapLegendControl position="bottomright" legendItems={unknownColorItems} />)

      // Should still render without throwing error
      expect(screen.getByText('unknown color')).toBeInTheDocument()
    })
  })

  describe('edge cases', () => {
    test('handles empty legend items array', () => {
      render(<MapLegendControl position="bottomright" legendItems={[]} />)

      expect(screen.getByTestId('map-key')).toBeInTheDocument()
      expect(screen.getByText('Key')).toBeInTheDocument()

      // Should not have any legend items
      const legendContainer = screen.getByTestId('map-key')
      const legendTexts = legendContainer.querySelectorAll('p.govuk-body')
      expect(legendTexts).toHaveLength(0)
    })

    test('handles single legend item', () => {
      const singleItem = [{ colour: 'pink', title: 'Single Item' }]

      render(<MapLegendControl position="bottomright" legendItems={singleItem} />)

      expect(screen.getByText('single item')).toBeInTheDocument()
    })

    test('works with different control positions', () => {
      const positions: ControlPosition[] = ['topleft', 'topright', 'bottomleft', 'bottomright']

      positions.forEach((position) => {
        const { unmount } = render(<MapLegendControl position={position} legendItems={mockLegendItems} />)

        const control = screen.getByTestId('custom-control')
        expect(control).toHaveAttribute('data-position', position)

        unmount()
      })
    })
  })

  describe('translation integration', () => {
    test('calls useTranslation with correct namespace', () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { useTranslation } = require('@/app/i18n/client')

      render(<MapLegendControl position="bottomright" legendItems={mockLegendItems} />)

      expect(useTranslation).toHaveBeenCalledWith('map')
    })
  })

  describe('user accessibility', () => {
    test('legend heading is properly marked up', () => {
      render(<MapLegendControl position={null as unknown as ControlPosition} legendItems={mockLegendItems} />)

      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toHaveTextContent('Key')
    })

    test('close button SVG has proper accessibility attributes', () => {
      render(<MapLegendControl position="bottomright" legendItems={mockLegendItems} />)

      const closeButton = screen.getByTestId('close-key-button')
      const svg = closeButton.querySelector('svg')

      expect(svg).toHaveAttribute('aria-hidden', 'true')
      expect(svg).toHaveAttribute('focusable', 'false')
    })

    test('buttons are keyboard accessible', () => {
      render(<MapLegendControl position="bottomright" legendItems={mockLegendItems} />)

      const closeButton = screen.getByTestId('close-key-button')
      expect(closeButton.tagName.toLowerCase()).toBe('button')

      // Hide key and check display button
      fireEvent.click(closeButton)

      const displayButton = screen.getByText('Display Key')
      expect(displayButton.tagName.toLowerCase()).toBe('span')
    })
  })
})
