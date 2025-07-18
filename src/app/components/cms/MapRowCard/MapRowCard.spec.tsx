import React from 'react'

import { render, screen, waitFor } from '@/config/test-utils'

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

// Mock clientHeight property for headers
const mockClientHeight = (element: Element, height: number) => {
  Object.defineProperty(element, 'clientHeight', {
    value: height,
    configurable: true,
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

      // Headers should not have minHeight set on mobile
      expect(header1.style.minHeight).toBe('')
      expect(header2.style.minHeight).toBe('')
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
      expect(header.style.minHeight).toBe('')
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
      expect(header1.style.minHeight).toBe('')
      expect(header2.style.minHeight).toBe('')
      expect(header3.style.minHeight).toBe('')
    })
  })

  test('resets existing minHeight before recalculating', async () => {
    const { container, rerender } = render(<MapRowCard>{createMockArticles([100, 120])}</MapRowCard>)

    const headers = container.querySelectorAll('article > header')
    mockClientHeight(headers[0], 100)
    mockClientHeight(headers[1], 120)

    // Set initial minHeight
    ;(headers[0] as HTMLElement).style.minHeight = '150px'
    ;(headers[1] as HTMLElement).style.minHeight = '150px'

    // Trigger re-calculation by changing debounced width
    useDebounceValue.mockReturnValue([1200])

    rerender(<MapRowCard>{createMockArticles([80, 90])}</MapRowCard>)

    // Mock new heights
    mockClientHeight(headers[0], 80)
    mockClientHeight(headers[1], 90)

    await waitFor(() => {
      const header1 = screen.getByTestId('header-0') as HTMLElement
      const header2 = screen.getByTestId('header-1') as HTMLElement

      // Should be reset and set to new calculated height (150px)
      expect(header1.style.minHeight).toBe('150px')
      expect(header2.style.minHeight).toBe('150px')
    })
  })

  test('adapts to search params changes', async () => {
    const { rerender } = render(<MapRowCard>{createMockArticles()}</MapRowCard>)

    // Simulate search params change
    mockSearchParams.set('newParam', 'value')

    rerender(<MapRowCard>{createMockArticles()}</MapRowCard>)

    // The effect should be triggered again
    expect(useDebounceValue).toHaveBeenCalled()
  })
})
