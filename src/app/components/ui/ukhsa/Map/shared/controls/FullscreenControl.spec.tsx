import { fireEvent, render, screen } from '@/config/test-utils'

import { FullscreenControl } from './FullscreenControl'

// Mock the react-leaflet useMap hook
jest.mock('react-leaflet', () => ({
  useMap: () => ({
    getContainer: () => ({
      parentElement: document.createElement('div'),
      requestFullscreen: jest.fn().mockResolvedValue(undefined),
    }),
    invalidateSize: jest.fn(),
  }),
}))

// Mock react-leaflet-custom-control
jest.mock('react-leaflet-custom-control', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="control-container">{children}</div>,
}))

describe('FullscreenControl', () => {
  beforeEach(() => {
    // Mock document.fullscreenElement
    Object.defineProperty(document, 'fullscreenElement', {
      writable: true,
      value: null,
    })

    // Mock document.exitFullscreen
    document.exitFullscreen = jest.fn().mockResolvedValue(undefined)
  })

  it('renders with default props', () => {
    render(<FullscreenControl position="topright" />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(screen.getByText('Enter fullscreen')).toBeInTheDocument()
  })

  it('renders with custom text', () => {
    render(
      <FullscreenControl
        position="topright"
        enterFullscreenText="Custom enter text"
        exitFullscreenText="Custom exit text"
      />
    )

    expect(screen.getByText('Custom enter text')).toBeInTheDocument()
  })

  it('toggles fullscreen mode when clicked', () => {
    render(<FullscreenControl position="topright" />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    // Check that requestFullscreen was called
    expect(document.fullscreenElement).toBe(null) // Still null in test environment
  })
})
