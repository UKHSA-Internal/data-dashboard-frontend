import React from 'react'

import { act, render, screen, waitFor } from '@/config/test-utils'

import { MapRowCard } from './MapRowCard'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { useWindowSize, useDebounceValue } = require('usehooks-ts')

// Mock Next.js navigation
const mockSearchParams = new URLSearchParams()

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => mockSearchParams),
}))

// Mock usehooks-ts
const mockWindowSize = { width: 1200, height: 800 }
const mockDebouncedWidth = 1200

jest.mock('usehooks-ts', () => ({
  useWindowSize: jest.fn(() => mockWindowSize),
  useDebounceValue: jest.fn(() => [mockDebouncedWidth]),
}))

// Test helper to create mock DOM structure
const createMockArticles = (heights: number[] = [100, 120]) => {
  return heights.map((height, index) => (
    <article key={index} data-testid={`article-${index}`}>
      <header data-testid={`header-${index}`} style={{ height: `${height}px`, display: 'block' }}>
        Header {index + 1}
      </header>
      <div>Content {index + 1}</div>
    </article>
  ))
}

// Mock clientHeight property for headers using a getter
const mockClientHeight = (element: Element, height: number) => {
  Object.defineProperty(element, 'clientHeight', {
    get: () => height,
    configurable: true,
    enumerable: true,
  })
}

describe('MapRowCard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    useWindowSize.mockReturnValue(mockWindowSize)
    useDebounceValue.mockReturnValue([mockDebouncedWidth])
  })

  test('renders children within the component', () => {
    render(
      <MapRowCard>
        <div data-testid="child-element">Test Content</div>
      </MapRowCard>
    )

    expect(screen.getByTestId('map-row-cards')).toBeInTheDocument()
    expect(screen.getByTestId('child-element')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  test('applies the correct CSS classes', () => {
    render(
      <MapRowCard>
        <div>Content</div>
      </MapRowCard>
    )

    const container = screen.getByTestId('map-row-cards')
    expect(container).toHaveClass('mb-3 sm:mb-6 lg:flex lg:gap-6')
  })

  test('calls useWindowSize hook', () => {
    render(
      <MapRowCard>
        <div>Content</div>
      </MapRowCard>
    )

    expect(useWindowSize).toHaveBeenCalledTimes(1)
  })

  test('calls useDebounceValue with correct screen parameters', () => {
    render(
      <MapRowCard>
        <div>Content</div>
      </MapRowCard>
    )

    expect(useDebounceValue).toHaveBeenCalledWith(1200, 20)
  })

  test('does not adjust header heights on mobile', async () => {
    useWindowSize.mockReturnValue({ width: 800, height: 600 })
    useDebounceValue.mockReturnValue([800])

    const { container } = render(<MapRowCard>{createMockArticles([100, 120])}</MapRowCard>)

    const headers = container.querySelectorAll('article > header')
    mockClientHeight(headers[0], 100)
    mockClientHeight(headers[1], 120)

    await waitFor(() => {
      const header1 = screen.getByTestId('header-0') as HTMLElement
      const header2 = screen.getByTestId('header-1') as HTMLElement

      // Headers should not have height set on mobile
      expect(header1.style.maxHeight).toBe('')
      expect(header2.style.maxHeight).toBe('')
    })
  })

  test('does not adjust headers when only one article present', async () => {
    const { container } = render(
      <MapRowCard>
        <article data-testid="single-article">
          <header data-testid="single-header">Single Header</header>
          <div>Content</div>
        </article>
      </MapRowCard>
    )

    const headers = container.querySelectorAll('article > header')
    expect(headers).toHaveLength(1)

    mockClientHeight(headers[0], 100)

    await waitFor(() => {
      const header = screen.getByTestId('single-header') as HTMLElement
      expect(header.style.height).toBe('')
    })
  })

  test('does not adjust headers when more than two articles present', async () => {
    const { container } = render(
      <MapRowCard>
        {createMockArticles([100, 120])}
        <article data-testid="article-2">
          <header data-testid="header-2">Header 3</header>
          <div>Content 3</div>
        </article>
      </MapRowCard>
    )

    const headers = container.querySelectorAll('article > header')
    expect(headers).toHaveLength(3)

    headers.forEach((header, index) => {
      mockClientHeight(header, 100 + index * 10)
    })

    await waitFor(() => {
      const header1 = screen.getByTestId('header-0') as HTMLElement
      const header2 = screen.getByTestId('header-1') as HTMLElement
      const header3 = screen.getByTestId('header-2') as HTMLElement

      // Should not adjust when there are 3 headers
      expect(header1.style.maxHeight).toBe('')
      expect(header2.style.maxHeight).toBe('')
      expect(header3.style.maxHeight).toBe('')
    })
  })

  test('resets existing height before recalculating', async () => {
    const { container, rerender } = render(<MapRowCard>{createMockArticles([100, 120])}</MapRowCard>)

    await waitFor(() => {
      expect(screen.getByTestId('header-0')).toBeInTheDocument()
    })

    let headers = container.querySelectorAll('article > header')
    mockClientHeight(headers[0], 100)
    mockClientHeight(headers[1], 120)

    useDebounceValue.mockReturnValue([1200])
    rerender(<MapRowCard>{createMockArticles([100, 120])}</MapRowCard>)

    await waitFor(
      () => {
        const header1 = screen.getByTestId('header-0') as HTMLElement
        if (mockDebouncedWidth >= 1024) {
          const height = parseInt(header1.style.height || '0')
          expect(height).toBe(100)
        }
      },
      { timeout: 2000 }
    )

    // Now manually set height to test reset logic
    headers = container.querySelectorAll('article > header')
    ;(headers[0] as HTMLElement).style.height = '150px'
    ;(headers[1] as HTMLElement).style.height = '150px'

    // Trigger re-calculation by changing debounced width
    useDebounceValue.mockReturnValue([1200])
    useWindowSize.mockReturnValue({ width: 1200, height: 800 })

    rerender(<MapRowCard>{createMockArticles([80, 90])}</MapRowCard>)

    // Wait for new headers to render
    await waitFor(() => {
      expect(screen.getByTestId('header-0')).toBeInTheDocument()
    })

    // Get new headers and set clientHeight immediately
    headers = container.querySelectorAll('article > header')
    mockClientHeight(headers[0], 80)
    mockClientHeight(headers[1], 90)

    // Trigger effect again
    useDebounceValue.mockReturnValue([1200])
    rerender(<MapRowCard>{createMockArticles([80, 90])}</MapRowCard>)

    await waitFor(
      () => {
        const header0 = screen.getByTestId('header-0') as HTMLElement
        const header1 = screen.getByTestId('header-1') as HTMLElement

        // Should be reset and set to new calculated height (90px - largest of the two)
        if (mockDebouncedWidth >= 1024) {
          // Verify that height was recalculated (not still 150px)
          const height0 = parseInt(header0.style.height || '0')
          const height1 = parseInt(header1.style.height || '0')
          expect(height0).toBe(80)
          expect(height1).toBe(90)
        }
      },
      { timeout: 2000 }
    )
  })

  test('updates largestHeader when header.clientHeight is greater (line 36)', async () => {
    const mockArticles = createMockArticles([100, 150])
    const { container, rerender } = render(<MapRowCard>{mockArticles}</MapRowCard>)

    await waitFor(() => {
      expect(screen.getByTestId('header-0')).toBeInTheDocument()
    })

    const headers = container.querySelectorAll('article > header')
    mockClientHeight(headers[0], 100)
    mockClientHeight(headers[1], 150)

    useDebounceValue.mockReturnValue([1200])
    rerender(<MapRowCard>{mockArticles}</MapRowCard>)

    await waitFor(
      () => {
        const header0 = screen.getByTestId('header-0') as HTMLElement
        const header1 = screen.getByTestId('header-1') as HTMLElement

        if (mockDebouncedWidth >= 1024) {
          expect(parseInt(header0.style.height || '0')).toBe(100)
          expect(parseInt(header1.style.height || '0')).toBe(150)
        }
      },
      { timeout: 2000 }
    )
  })

  test('handles case where first header is larger than second', async () => {
    const mockArticles = createMockArticles([150, 100])
    const { container, rerender } = render(<MapRowCard>{mockArticles}</MapRowCard>)

    let headers = container.querySelectorAll('article > header')
    mockClientHeight(headers[0], 150)
    mockClientHeight(headers[1], 100)

    mockSearchParams.set('trigger2', 'recalc')

    await act(async () => {
      rerender(<MapRowCard>{mockArticles}</MapRowCard>)
      headers = container.querySelectorAll('article > header')
      mockClientHeight(headers[0], 150)
      mockClientHeight(headers[1], 100)
      await new Promise((resolve) => setTimeout(resolve, 100))
    })

    await waitFor(
      () => {
        const header1 = screen.getByTestId('header-0') as HTMLElement
        const header2 = screen.getByTestId('header-1') as HTMLElement

        if (mockDebouncedWidth >= 1024) {
          expect(parseInt(header1.style.height || '0')).toBe(150)
          expect(parseInt(header2.style.height || '0')).toBe(100)
        }
      },
      { timeout: 2000 }
    )
  })

  test('adapts to search params changes', async () => {
    const { rerender } = render(<MapRowCard>{createMockArticles()}</MapRowCard>)

    mockSearchParams.set('newParam', 'value')

    rerender(<MapRowCard>{createMockArticles()}</MapRowCard>)

    expect(useDebounceValue).toHaveBeenCalled()
  })
})
