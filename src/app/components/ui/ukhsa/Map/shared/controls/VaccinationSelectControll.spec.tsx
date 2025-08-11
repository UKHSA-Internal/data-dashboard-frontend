import { render } from '@/config/test-utils'

// Mock react-leaflet and react-leaflet-custom-control
jest.mock('react-leaflet', () => ({
  useMap: jest.fn(() => ({
    getContainer: jest.fn(() => document.createElement('div')),
  })),
}))

jest.mock('react-leaflet-custom-control', () => {
  return function Control({ children, position }: { children: React.ReactNode; position: string }) {
    return (
      <div data-testid="leaflet-control" data-position={position}>
        {children}
      </div>
    )
  }
})

// Mock VaccinationDropdown
jest.mock('../../../VaccinationDropdown/VaccinationDropdown', () => ({
  VaccinationDropdown: ({ className }: { className?: string }) => (
    <div data-testid="vaccination-dropdown" className={className}>
      Vaccination Dropdown
    </div>
  ),
}))

import { VaccinationSelectControl } from './VaccinationSelectControl'

describe('VaccinationSelectControl', () => {
  describe('Component rendering', () => {
    test('should render control with default position', () => {
      const { getByTestId } = render(<VaccinationSelectControl position="topright" />)

      expect(getByTestId('leaflet-control')).toBeInTheDocument()
      expect(getByTestId('leaflet-control')).toHaveAttribute('data-position', 'topright')
      expect(getByTestId('vaccination-dropdown')).toBeInTheDocument()
    })

    test('should render control with topleft position', () => {
      const { getByTestId } = render(<VaccinationSelectControl position="topleft" />)

      expect(getByTestId('leaflet-control')).toBeInTheDocument()
      expect(getByTestId('leaflet-control')).toHaveAttribute('data-position', 'topleft')
    })

    test('should render control with bottomright position', () => {
      const { getByTestId } = render(<VaccinationSelectControl position="bottomright" />)

      expect(getByTestId('leaflet-control')).toBeInTheDocument()
      expect(getByTestId('leaflet-control')).toHaveAttribute('data-position', 'bottomright')
    })

    test('should render control with bottomleft position', () => {
      const { getByTestId } = render(<VaccinationSelectControl position="bottomleft" />)

      expect(getByTestId('leaflet-control')).toBeInTheDocument()
      expect(getByTestId('leaflet-control')).toHaveAttribute('data-position', 'bottomleft')
    })
  })

  describe('Props handling', () => {
    test('should pass className to VaccinationDropdown', () => {
      const testClassName = 'custom-vaccination-class'

      const { getByTestId } = render(<VaccinationSelectControl position="topright" className={testClassName} />)

      expect(getByTestId('vaccination-dropdown')).toHaveClass(testClassName)
    })

    test('should render without className when not provided', () => {
      const { getByTestId } = render(<VaccinationSelectControl position="topright" />)

      expect(getByTestId('vaccination-dropdown')).toBeInTheDocument()
      expect(getByTestId('vaccination-dropdown')).toHaveAttribute('class')
    })

    test('should render with multiple CSS classes', () => {
      const testClassName = 'class-one class-two custom-style'

      const { getByTestId } = render(<VaccinationSelectControl position="topright" className={testClassName} />)

      expect(getByTestId('vaccination-dropdown')).toHaveClass('class-one')
      expect(getByTestId('vaccination-dropdown')).toHaveClass('class-two')
      expect(getByTestId('vaccination-dropdown')).toHaveClass('custom-style')
    })
  })

  describe('Component structure', () => {
    test('should contain VaccinationDropdown inside Control', () => {
      const { getByTestId } = render(<VaccinationSelectControl position="topright" />)

      const control = getByTestId('leaflet-control')
      const dropdown = getByTestId('vaccination-dropdown')

      expect(control).toContainElement(dropdown)
    })

    test('should render with correct component hierarchy', () => {
      const { container } = render(<VaccinationSelectControl position="topright" />)

      const controlElement = container.querySelector('[data-testid="leaflet-control"]') as HTMLElement
      const dropdownElement = container.querySelector('[data-testid="vaccination-dropdown"]') as HTMLElement

      expect(controlElement).toBeInTheDocument()
      expect(dropdownElement).toBeInTheDocument()
      expect(controlElement).toContainElement(dropdownElement)
    })
  })
})
