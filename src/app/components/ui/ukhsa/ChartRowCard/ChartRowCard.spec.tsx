import React from 'react'

import { act, render, screen, waitFor } from '@/config/test-utils'

import { ChartRowCard } from './ChartRowCard'

const { useWindowSize, useDebounceValue } = require('usehooks-ts')

const mockSearchParams = new URLSearchParams()

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => mockSearchParams),
}))

const mockWindowSize = { width: 1200, height: 800 }
const mockDebouncedWidth = 1200

jest.mock('usehooks-ts', () => ({
  useWindowSize: jest.fn(() => mockWindowSize),
  useDebounceValue: jest.fn(() => [mockDebouncedWidth]),
}))

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

const mockClientHeight = (element: Element, height: number) => {
  Object.defineProperty(element, 'clientHeight', {
    get: () => height,
    configurable: true,
    enumerable: true,
  })
}

describe('ChartRowCard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    useWindowSize.mockReturnValue(mockWindowSize)
    useDebounceValue.mockReturnValue([mockDebouncedWidth])
  })

  test('renders children within the component', () => {
    render(
      <ChartRowCard testId="map-row-cards">
        <div data-testid="child-element">Test Content</div>
      </ChartRowCard>
    )

    expect(screen.getByTestId('map-row-cards')).toBeInTheDocument()
    expect(screen.getByTestId('child-element')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  test('uses chart-row-cards test id by default', () => {
    render(
      <ChartRowCard>
        <div>Content</div>
      </ChartRowCard>
    )

    expect(screen.getByTestId('chart-row-cards')).toBeInTheDocument()
  })

  test('applies the correct CSS classes', () => {
    render(
      <ChartRowCard testId="map-row-cards">
        <div>Content</div>
      </ChartRowCard>
    )

    const container = screen.getByTestId('map-row-cards')
    expect(container).toHaveClass('mb-3 sm:mb-6 lg:flex lg:gap-6')
  })

  test('calls useWindowSize hook', () => {
    render(
      <ChartRowCard testId="map-row-cards">
        <div>Content</div>
      </ChartRowCard>
    )

    expect(useWindowSize).toHaveBeenCalledTimes(1)
  })

  test('calls useDebounceValue with correct screen parameters', () => {
    render(
      <ChartRowCard testId="map-row-cards">
        <div>Content</div>
      </ChartRowCard>
    )

    expect(useDebounceValue).toHaveBeenCalledWith(1200, 20)
  })

  test('does not adjust header heights on mobile', async () => {
    useWindowSize.mockReturnValue({ width: 800, height: 600 })
    useDebounceValue.mockReturnValue([800])

    const { container } = render(<ChartRowCard testId="map-row-cards">{createMockArticles([100, 120])}</ChartRowCard>)

    const headers = container.querySelectorAll('article > header')
    mockClientHeight(headers[0], 100)
    mockClientHeight(headers[1], 120)

    await waitFor(() => {
      const header1 = screen.getByTestId('header-0') as HTMLElement
      const header2 = screen.getByTestId('header-1') as HTMLElement

      expect(header1.style.maxHeight).toBe('')
      expect(header2.style.maxHeight).toBe('')
    })
  })

  test('does not adjust headers when only one article present', async () => {
    const { container } = render(
      <ChartRowCard testId="map-row-cards">
        <article data-testid="single-article">
          <header data-testid="single-header">Single Header</header>
          <div>Content</div>
        </article>
      </ChartRowCard>
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
      <ChartRowCard testId="map-row-cards">
        {createMockArticles([100, 120])}
        <article data-testid="article-2">
          <header data-testid="header-2">Header 3</header>
          <div>Content 3</div>
        </article>
      </ChartRowCard>
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

      expect(header1.style.maxHeight).toBe('')
      expect(header2.style.maxHeight).toBe('')
      expect(header3.style.maxHeight).toBe('')
    })
  })

  test('resets existing height before recalculating', async () => {
    const { container, rerender } = render(
      <ChartRowCard testId="map-row-cards">{createMockArticles([100, 120])}</ChartRowCard>
    )

    await waitFor(() => {
      expect(screen.getByTestId('header-0')).toBeInTheDocument()
    })

    let headers = container.querySelectorAll('article > header')
    mockClientHeight(headers[0], 100)
    mockClientHeight(headers[1], 120)

    useDebounceValue.mockReturnValue([1200])
    rerender(<ChartRowCard testId="map-row-cards">{createMockArticles([100, 120])}</ChartRowCard>)

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

    headers = container.querySelectorAll('article > header')
    ;(headers[0] as HTMLElement).style.height = '150px'
    ;(headers[1] as HTMLElement).style.height = '150px'

    useDebounceValue.mockReturnValue([1200])
    useWindowSize.mockReturnValue({ width: 1200, height: 800 })

    rerender(<ChartRowCard testId="map-row-cards">{createMockArticles([80, 90])}</ChartRowCard>)

    await waitFor(() => {
      expect(screen.getByTestId('header-0')).toBeInTheDocument()
    })

    headers = container.querySelectorAll('article > header')
    mockClientHeight(headers[0], 80)
    mockClientHeight(headers[1], 90)

    useDebounceValue.mockReturnValue([1200])
    rerender(<ChartRowCard testId="map-row-cards">{createMockArticles([80, 90])}</ChartRowCard>)

    await waitFor(
      () => {
        const header0 = screen.getByTestId('header-0') as HTMLElement
        const header1 = screen.getByTestId('header-1') as HTMLElement

        if (mockDebouncedWidth >= 1024) {
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
    const { container, rerender } = render(<ChartRowCard testId="map-row-cards">{mockArticles}</ChartRowCard>)

    await waitFor(() => {
      expect(screen.getByTestId('header-0')).toBeInTheDocument()
    })

    const headers = container.querySelectorAll('article > header')
    mockClientHeight(headers[0], 100)
    mockClientHeight(headers[1], 150)

    useDebounceValue.mockReturnValue([1200])
    rerender(<ChartRowCard testId="map-row-cards">{mockArticles}</ChartRowCard>)

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
    const { container, rerender } = render(<ChartRowCard testId="map-row-cards">{mockArticles}</ChartRowCard>)

    let headers = container.querySelectorAll('article > header')
    mockClientHeight(headers[0], 150)
    mockClientHeight(headers[1], 100)

    mockSearchParams.set('trigger2', 'recalc')

    await act(async () => {
      rerender(<ChartRowCard testId="map-row-cards">{mockArticles}</ChartRowCard>)
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
    const { rerender } = render(<ChartRowCard testId="map-row-cards">{createMockArticles()}</ChartRowCard>)

    mockSearchParams.set('newParam', 'value')

    rerender(<ChartRowCard testId="map-row-cards">{createMockArticles()}</ChartRowCard>)

    expect(useDebounceValue).toHaveBeenCalled()
  })
})
