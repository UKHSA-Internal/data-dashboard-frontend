import { mapId } from '@/app/constants/map.constants'
import { act, fireEvent, render, screen, waitFor } from '@/config/test-utils'

import { FullscreenControl } from './FullscreenControl'

// Mock for map container and its methods
const mockRequestFullscreen = jest.fn().mockResolvedValue(undefined)
const mockInvalidateSize = jest.fn()
const mockMapContainer = {
  parentElement: document.createElement('div'),
  requestFullscreen: mockRequestFullscreen,
}

// Mock the react-leaflet useMap hook
jest.mock('react-leaflet', () => ({
  useMap: () => ({
    getContainer: () => mockMapContainer,
    invalidateSize: mockInvalidateSize,
  }),
}))

// Mock react-leaflet-custom-control
jest.mock('react-leaflet-custom-control', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="control-container">{children}</div>,
}))

describe('FullscreenControl', () => {
  const mockExitFullscreen = jest.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    jest.useFakeTimers()
    jest.clearAllMocks()

    // Mock document.fullscreenElement
    Object.defineProperty(document, 'fullscreenElement', {
      writable: true,
      value: null,
    })

    // Mock document.exitFullscreen
    document.exitFullscreen = mockExitFullscreen
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders with default props', () => {
    render(<FullscreenControl position="topright" />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(screen.getByText('Enter fullscreen')).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-controls', mapId)
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

  it('calls requestFullscreen when entering fullscreen mode', async () => {
    render(<FullscreenControl position="topright" />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockRequestFullscreen).toHaveBeenCalledTimes(1)
  })

  it('shows exit fullscreen text when in fullscreen mode', async () => {
    // Set up fullscreen mode
    Object.defineProperty(document, 'fullscreenElement', {
      writable: true,
      value: mockMapContainer,
    })

    render(<FullscreenControl position="topright" />)

    // Simulate fullscreenchange event
    act(() => {
      const fullscreenChangeEvent = new Event('fullscreenchange')
      document.dispatchEvent(fullscreenChangeEvent)
    })

    // Fast-forward timers
    act(() => {
      jest.advanceTimersByTime(100)
    })

    expect(screen.getByText('Exit fullscreen')).toBeInTheDocument()
  })

  it('calls exitFullscreen when exiting fullscreen mode', async () => {
    // Set up fullscreen mode
    Object.defineProperty(document, 'fullscreenElement', {
      writable: true,
      value: mockMapContainer,
    })

    render(<FullscreenControl position="topright" />)

    // Simulate fullscreenchange event to enter fullscreen
    act(() => {
      const fullscreenChangeEvent = new Event('fullscreenchange')
      document.dispatchEvent(fullscreenChangeEvent)
    })

    // Fast-forward timers
    act(() => {
      jest.advanceTimersByTime(100)
    })

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockExitFullscreen).toHaveBeenCalledTimes(1)
  })

  it('handles ESC key press to exit fullscreen', async () => {
    // Set up fullscreen mode
    Object.defineProperty(document, 'fullscreenElement', {
      writable: true,
      value: mockMapContainer,
    })

    render(<FullscreenControl position="topright" />)

    // Simulate fullscreenchange event to enter fullscreen
    act(() => {
      const fullscreenChangeEvent = new Event('fullscreenchange')
      document.dispatchEvent(fullscreenChangeEvent)
    })

    // Fast-forward timers
    act(() => {
      jest.advanceTimersByTime(100)
    })

    // Simulate ESC key press by triggering fullscreenchange and setting fullscreenElement to null
    Object.defineProperty(document, 'fullscreenElement', {
      writable: true,
      value: null,
    })

    act(() => {
      const fullscreenChangeEvent = new Event('fullscreenchange')
      document.dispatchEvent(fullscreenChangeEvent)
    })
  })

  it('handles errors when entering fullscreen mode', async () => {
    // Mock console.error
    const originalConsoleError = console.error
    console.error = jest.fn()

    // Make requestFullscreen reject with an error
    mockRequestFullscreen.mockRejectedValueOnce(new Error('Fullscreen error'))

    render(<FullscreenControl position="topright" />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    // Wait for the promise rejection to be handled
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Error attempting to enable fullscreen mode'))
    })

    // Restore console.error
    console.error = originalConsoleError
  })

  it('handles errors when exiting fullscreen mode', async () => {
    // Mock console.error
    const originalConsoleError = console.error
    console.error = jest.fn()

    // Set up fullscreen mode
    Object.defineProperty(document, 'fullscreenElement', {
      writable: true,
      value: mockMapContainer,
    })

    // Make exitFullscreen reject with an error
    mockExitFullscreen.mockRejectedValueOnce(new Error('Exit fullscreen error'))

    render(<FullscreenControl position="topright" />)

    // Simulate fullscreenchange event to enter fullscreen
    act(() => {
      const fullscreenChangeEvent = new Event('fullscreenchange')
      document.dispatchEvent(fullscreenChangeEvent)
    })

    // Fast-forward timers
    act(() => {
      jest.advanceTimersByTime(100)
    })

    const button = screen.getByRole('button')
    fireEvent.click(button)

    // Wait for the promise rejection to be handled
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Error attempting to exit fullscreen mode'))
    })

    // Restore console.error
    console.error = originalConsoleError
  })
})
