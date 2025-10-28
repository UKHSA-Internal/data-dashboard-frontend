import { GlobalFilterProvider } from '@/app/features/global-filter/context/globalFilterContext'
import { ExtractedFilters } from '@/app/utils/global-filter-content-parser'
import { render } from '@/config/test-utils'

import { CoverControl } from './CoverControl'

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

// Mock TimePeriodDropdown
jest.mock('@/app/components/ui/ukhsa/TimePeriodDropdown/TimePeriodDropdown', () => ({
  TimePeriodDropdown: ({ className }: { className?: string }) => (
    <div data-testid="time-period-dropdown" className={className}>
      Time Period Dropdown
    </div>
  ),
}))

// Mock VaccinationDropdown
jest.mock('@/app/components/ui/ukhsa/VaccinationDropdown/VaccinationDropdown', () => ({
  VaccinationDropdown: ({ className }: { className?: string }) => (
    <div data-testid="vaccination-dropdown" className={className}>
      Vaccination Dropdown
    </div>
  ),
}))

// Test wrapper with context
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <GlobalFilterProvider filters={{} as ExtractedFilters}>{children}</GlobalFilterProvider>
)

describe('CoverControl', () => {
  describe('Component rendering', () => {
    test('should render control with default position', () => {
      // Arrange & Act
      const { getByTestId } = render(
        <TestWrapper>
          <CoverControl position="topright" />
        </TestWrapper>
      )

      // Assert
      expect(getByTestId('leaflet-control')).toBeInTheDocument()
      expect(getByTestId('leaflet-control')).toHaveAttribute('data-position', 'topright')
      expect(getByTestId('time-period-dropdown')).toBeInTheDocument()
      expect(getByTestId('vaccination-dropdown')).toBeInTheDocument()
    })

    test('should render control with topleft position', () => {
      // Arrange & Act
      const { getByTestId } = render(
        <TestWrapper>
          <CoverControl position="topleft" />
        </TestWrapper>
      )

      // Assert
      expect(getByTestId('leaflet-control')).toBeInTheDocument()
      expect(getByTestId('leaflet-control')).toHaveAttribute('data-position', 'topleft')
    })

    test('should render control with bottomright position', () => {
      // Arrange & Act
      const { getByTestId } = render(
        <TestWrapper>
          <CoverControl position="bottomright" />
        </TestWrapper>
      )

      // Assert
      expect(getByTestId('leaflet-control')).toBeInTheDocument()
      expect(getByTestId('leaflet-control')).toHaveAttribute('data-position', 'bottomright')
    })

    test('should render control with bottomleft position', () => {
      // Arrange & Act
      const { getByTestId } = render(
        <TestWrapper>
          <CoverControl position="bottomleft" />
        </TestWrapper>
      )

      // Assert
      expect(getByTestId('leaflet-control')).toBeInTheDocument()
      expect(getByTestId('leaflet-control')).toHaveAttribute('data-position', 'bottomleft')
    })
  })

  describe('Props handling', () => {
    test('should pass className to TimePeriodDropdown', () => {
      // Arrange
      const testClassName = 'custom-dropdown-class'

      // Act
      const { getByTestId } = render(
        <TestWrapper>
          <CoverControl position="topright" className={testClassName} />
        </TestWrapper>
      )

      // Assert
      expect(getByTestId('cover-control')).toHaveClass(testClassName)
    })

    test('should render without className when not provided', () => {
      // Arrange & Act
      const { getByTestId } = render(
        <TestWrapper>
          <CoverControl position="topright" />
        </TestWrapper>
      )

      // Assert
      expect(getByTestId('time-period-dropdown')).toBeInTheDocument()
      expect(getByTestId('time-period-dropdown')).not.toHaveAttribute('class')
      expect(getByTestId('vaccination-dropdown')).toBeInTheDocument()
      expect(getByTestId('vaccination-dropdown')).not.toHaveAttribute('class')
    })

    test('should render with multiple CSS classes', () => {
      // Arrange
      const testClassName = 'class-one class-two custom-style'

      // Act
      const { getByTestId } = render(
        <TestWrapper>
          <CoverControl position="topright" className={testClassName} />
        </TestWrapper>
      )

      // Assert
      expect(getByTestId('cover-control')).toHaveClass('class-one')
      expect(getByTestId('cover-control')).toHaveClass('class-two')
      expect(getByTestId('cover-control')).toHaveClass('custom-style')
    })
  })

  describe('Component structure', () => {
    test('should contain TimePeriodDropdown inside Control', () => {
      // Arrange & Act
      const { getByTestId } = render(
        <TestWrapper>
          <CoverControl position="topright" className="test-class" />
        </TestWrapper>
      )

      const control = getByTestId('leaflet-control')
      const dropdown = getByTestId('time-period-dropdown')

      // Assert
      expect(control).toContainElement(dropdown)
    })

    test('should render with correct component hierarchy', () => {
      // Arrange & Act
      const { container } = render(
        <TestWrapper>
          <CoverControl position="topright" />
        </TestWrapper>
      )

      // Assert
      const controlElement = container.querySelector('[data-testid="leaflet-control"]') as HTMLElement
      const dropdownElement = container.querySelector('[data-testid="time-period-dropdown"]') as HTMLElement
      const vaccinationDropdownElement = container.querySelector('[data-testid="vaccination-dropdown"]') as HTMLElement

      expect(controlElement).toBeInTheDocument()
      expect(dropdownElement).toBeInTheDocument()
      expect(controlElement).toContainElement(dropdownElement)
      expect(vaccinationDropdownElement).toBeInTheDocument()
      expect(controlElement).toContainElement(vaccinationDropdownElement)
    })
  })
})
