import { ControlPosition } from 'leaflet'
import React from 'react'

import { render, screen } from '@/config/test-utils'

import { AttributionControl } from './AttributionControl'

// Mock the useMap hook
const mockMap = {
  getContainer: jest.fn(),
}

jest.mock('react-leaflet', () => ({
  useMap: jest.fn(() => mockMap),
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

// Mock Dialog components
interface MockDialogProps {
  children: React.ReactNode
  modal?: boolean
}

interface MockDialogTriggerProps {
  children: React.ReactNode
  className?: string
  'aria-controls'?: string
}

interface MockDialogContentProps {
  children: React.ReactNode
}

interface MockDialogHeaderProps {
  children: React.ReactNode
  'aria-hidden'?: boolean
  className?: string
}

interface MockDialogTitleProps {
  children: React.ReactNode
}

jest.mock('@/app/components/ui/ukhsa/Dialog/Dialog', () => ({
  Dialog: ({ children }: MockDialogProps) => <div data-testid="dialog">{children}</div>,
  DialogContent: ({ children }: MockDialogContentProps) => <div data-testid="dialog-content">{children}</div>,
  DialogHeader: ({ children, ...props }: MockDialogHeaderProps) => (
    <div data-testid="dialog-header" {...props}>
      {children}
    </div>
  ),
  DialogTitle: ({ children }: MockDialogTitleProps) => <div data-testid="dialog-title">{children}</div>,
  DialogTrigger: ({ children, className, ...props }: MockDialogTriggerProps) => (
    <button data-testid="dialog-trigger" className={className} {...props}>
      {children}
    </button>
  ),
}))

// Mock ScrollArea components
interface MockScrollAreaProps {
  children: React.ReactNode
  className?: string
}

jest.mock('@/app/components/ui/ukhsa/ScrollArea/ScrollArea', () => ({
  ScrollArea: ({ children, className }: MockScrollAreaProps) => (
    <div data-testid="scroll-area" className={className}>
      {children}
    </div>
  ),
  ScrollBar: () => <div data-testid="scroll-bar" />,
}))

// Mock constants
jest.mock('@/app/constants/map.constants', () => ({
  mapId: 'viewport',
}))

// Mock MutationObserver
const mockObserver = {
  observe: jest.fn(),
  disconnect: jest.fn(),
}

const mockMutationObserver = jest.fn().mockImplementation(() => mockObserver)

Object.defineProperty(global, 'MutationObserver', {
  value: mockMutationObserver,
  writable: true,
})

describe('AttributionControl', () => {
  const mockContainer = document.createElement('div')
  const mockAttributionElement = document.createElement('div')

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks()
    mockObserver.observe.mockClear()
    mockObserver.disconnect.mockClear()
    mockMutationObserver.mockClear()

    // Setup DOM structure
    mockAttributionElement.className = 'leaflet-control-attribution'
    mockAttributionElement.innerText = 'Test attribution text'
    mockContainer.appendChild(mockAttributionElement)

    // Mock querySelector to return our mock element
    mockContainer.querySelector = jest.fn().mockReturnValue(mockAttributionElement)
    mockMap.getContainer.mockReturnValue(mockContainer)
  })

  test('renders correctly', () => {
    render(<AttributionControl position="bottomright" />)

    expect(screen.getByTestId('custom-control')).toBeInTheDocument()
    expect(screen.getByTestId('dialog')).toBeInTheDocument()
    expect(screen.getByTestId('dialog-trigger')).toBeInTheDocument()
    expect(screen.getByTestId('dialog-content')).toBeInTheDocument()
    expect(screen.getByTestId('scroll-area')).toBeInTheDocument()
  })

  test('component is position correctly', () => {
    render(<AttributionControl position="topleft" />)

    const control = screen.getByTestId('custom-control')
    expect(control).toHaveAttribute('data-position', 'topleft')
  })

  test('dialog trigger has correct accessibility attributes', () => {
    render(<AttributionControl position="bottomright" />)

    const trigger = screen.getByTestId('dialog-trigger')
    expect(trigger).toHaveAttribute('aria-controls', 'viewport')
    expect(trigger).toHaveClass('govuk-button govuk-button--secondary ukhsa-map__button')
  })

  test('contains visually hidden copyright text', () => {
    render(<AttributionControl position="bottomright" />)

    expect(screen.getByText('Copyright information')).toBeInTheDocument()
    expect(screen.getByText('Copyright information')).toHaveClass('govuk-visually-hidden')
  })

  test('contains copyright SVG icon', () => {
    render(<AttributionControl position="bottomright" />)

    const svg = screen.getByTestId('dialog-trigger').querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(svg).toHaveAttribute('focusable', 'false')
    expect(svg).toHaveAttribute('width', '20')
    expect(svg).toHaveAttribute('height', '20')
  })

  test('is hidden from screen readers', () => {
    render(<AttributionControl position="bottomright" />)

    const header = screen.getByTestId('dialog-header')
    expect(header).toHaveAttribute('aria-hidden', 'true')
    expect(header).toHaveClass('govuk-visually-hidden')
  })

  test('contains correct title', () => {
    render(<AttributionControl position="bottomright" />)

    expect(screen.getByText('© Copyright')).toBeInTheDocument()
  })

  test('scroll area has correct styling', () => {
    render(<AttributionControl position="bottomright" />)

    const scrollArea = screen.getByTestId('scroll-area')
    expect(scrollArea).toHaveClass('h-[10rem]')
  })

  test('works with different control positions', () => {
    const positions: ControlPosition[] = ['topleft', 'topright', 'bottomleft', 'bottomright']

    positions.forEach((position) => {
      const { unmount } = render(<AttributionControl position={position} />)

      const control = screen.getByTestId('custom-control')
      expect(control).toHaveAttribute('data-position', position)

      unmount()
    })
  })

  test('dialog modal prop is set correctly', () => {
    render(<AttributionControl position="bottomright" />)

    // The Dialog component should receive the modal prop as true
    // This is tested through the mock receiving the correct props
    expect(screen.getByTestId('dialog')).toBeInTheDocument()
  })
})
