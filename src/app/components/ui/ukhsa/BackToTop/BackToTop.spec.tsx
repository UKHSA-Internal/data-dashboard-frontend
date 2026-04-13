import userEvent from '@testing-library/user-event'
import { useWindowScroll } from 'react-use'

import { render } from '@/config/test-utils'

import { BackToTop } from './BackToTop'

jest.mock('react-use')
const useWindowScrollMock = jest.mocked(useWindowScroll)

// Mock ResizeObserver
class ResizeObserverMock {
  observe = jest.fn()
  unobserve = jest.fn()
  disconnect = jest.fn()
}

global.ResizeObserver = ResizeObserverMock as any

// Helper to mock page height
const mockPageHeight = (scrollHeight: number, viewportHeight: number) => {
  Object.defineProperty(document.documentElement, 'scrollHeight', {
    configurable: true,
    value: scrollHeight,
  })
  Object.defineProperty(window, 'innerHeight', {
    configurable: true,
    value: viewportHeight,
  })
}

describe('BackToTop component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders a back to top link when page is tall enough', async () => {
    useWindowScrollMock.mockReturnValue({ x: 0, y: 10000 })
    // Mock a page that's 2x the viewport height (should render)
    mockPageHeight(3000, 1000)

    const { getByRole, getByTestId } = render(<BackToTop />)

    expect(getByRole('link', { name: 'Back to top' })).toHaveAttribute('href', '#main-content')
    expect(getByTestId('up-arrow')).toHaveAttribute('aria-hidden', 'true')
  })

  test('does not render when page is not tall enough', async () => {
    useWindowScrollMock.mockReturnValue({ x: 0, y: 0 })
    mockPageHeight(1000, 1000)

    const { queryByRole } = render(<BackToTop />)

    expect(queryByRole('link', { name: 'Back to top' })).not.toBeInTheDocument()
  })

  test('scrolls to the top when clicking the back to top link', async () => {
    useWindowScrollMock.mockReturnValue({ x: 0, y: 0 })

    mockPageHeight(3000, 1000)

    const { getByRole } = render(<BackToTop />)

    const scrollToMock = jest.fn()
    window.scrollTo = scrollToMock

    // Simulate the click event
    const link = getByRole('link', { name: 'Back to top' })
    await userEvent.click(link)

    // Verify that the window.scrollTo function was called with the expected arguments
    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    })
  })

  test('becomes sticky after scrolling vertically further than 200px', async () => {
    useWindowScrollMock.mockReturnValueOnce({ x: 0, y: 0 })

    mockPageHeight(3000, 1000)

    const { getByRole, rerender } = render(<BackToTop />)

    expect(getByRole('link', { name: 'Back to top' })).not.toHaveClass('xl:sticky')

    useWindowScrollMock.mockReturnValue({ x: 0, y: 201 })
    rerender(<BackToTop />)

    expect(getByRole('link', { name: 'Back to top' })).toHaveClass('xl:sticky')
  })

  test('becomes not sticky after scrolling vertically below 200px', async () => {
    useWindowScrollMock.mockReturnValueOnce({ x: 0, y: 201 })

    mockPageHeight(3000, 1000)

    const { getByRole, rerender } = render(<BackToTop />)

    expect(getByRole('link', { name: 'Back to top' })).toHaveClass('xl:sticky')

    useWindowScrollMock.mockReturnValue({ x: 0, y: 199 })
    rerender(<BackToTop />)

    expect(getByRole('link', { name: 'Back to top' })).not.toHaveClass('xl:sticky')
  })

  test('renders when page height is exactly 1.5x viewport height', async () => {
    useWindowScrollMock.mockReturnValue({ x: 0, y: 0 })

    mockPageHeight(1500, 1000)

    const { queryByRole } = render(<BackToTop />)

    expect(queryByRole('link', { name: 'Back to top' })).not.toBeInTheDocument()
  })

  test('renders when page height exceeds 1.5x viewport height', async () => {
    useWindowScrollMock.mockReturnValue({ x: 0, y: 0 })
    mockPageHeight(1501, 1000)

    const { getByRole } = render(<BackToTop />)

    expect(getByRole('link', { name: 'Back to top' })).toBeInTheDocument()
  })
})
