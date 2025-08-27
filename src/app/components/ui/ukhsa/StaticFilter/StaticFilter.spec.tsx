// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// StaticFilter.spec.tsx
import React from 'react'
import { useWindowScroll } from 'react-use'

import { useTranslation } from '@/app/i18n/client'
import { fireEvent, render, screen } from '@/config/test-utils'

import StaticFilter from './StaticFilter'

/* eslint-disable @typescript-eslint/no-explicit-any*/
// Mock the react-use hook
jest.mock('react-use', () => ({
  useWindowScroll: jest.fn(),
}))

// Mock the translation hook
jest.mock('@/app/i18n/client', () => ({
  useTranslation: jest.fn(),
}))

const mockUseWindowScroll = useWindowScroll as jest.MockedFunction<typeof useWindowScroll>
const mockUseTranslation = useTranslation as jest.MockedFunction<typeof useTranslation>

describe('StaticFilter', () => {
  const mockTFunction = jest.fn() as any
  mockTFunction.$TFunctionBrand = undefined

  beforeEach(() => {
    jest.clearAllMocks()

    // Set up translation mock
    mockUseTranslation.mockReturnValue({
      t: mockTFunction,
      i18n: {} as any,
      ready: true,
    })

    // Set up default scroll position
    mockUseWindowScroll.mockReturnValue({
      x: 0,
      y: 0,
    })

    // Set up default translations
    mockTFunction.mockImplementation((key: string) => {
      const translations: Record<string, string> = {
        'globalFilter.hideFilters': 'Hide Filters',
        'globalFilter.showFilters': 'Show Filters',
      }
      return translations[key] || key
    })
  })

  describe('rendering', () => {
    test('should render with default props', () => {
      render(<StaticFilter />)

      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '#filter')
      expect(link).toHaveTextContent('Hide Filters')
    })

    test('should render with custom href', () => {
      render(<StaticFilter href="#custom-filter" />)

      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '#custom-filter')
    })

    test('should render with custom className', () => {
      render(<StaticFilter className="custom-class" />)

      const link = screen.getByRole('link')
      expect(link).toHaveClass('custom-class')
    })

    test('should render children when visible', () => {
      render(
        <StaticFilter>
          <div data-testid="filter-content">Filter Content</div>
        </StaticFilter>
      )

      expect(screen.getByTestId('filter-content')).toBeInTheDocument()
      expect(screen.getByTestId('filter-content')).toBeVisible()
    })

    test('should hide children when not visible', () => {
      render(
        <StaticFilter>
          <div data-testid="filter-content">Filter Content</div>
        </StaticFilter>
      )

      // Click to hide filters
      const link = screen.getByRole('link')
      fireEvent.click(link)

      const contentContainer = screen.getByTestId('filter-content').parentElement
      expect(contentContainer).toHaveClass('h-0', 'm-0', 'overflow-hidden', 'govuk-!-padding-0')
    })
  })

  describe('scroll behavior', () => {
    test('should not be sticky when scroll position is less than 200', () => {
      mockUseWindowScroll.mockReturnValue({
        x: 0,
        y: 150,
      })

      render(<StaticFilter />)

      const link = screen.getByRole('link')
      expect(link).not.toHaveClass('sticky')
    })

    test('should be sticky when scroll position is 200 or more', () => {
      mockUseWindowScroll.mockReturnValue({
        x: 0,
        y: 200,
      })

      render(<StaticFilter />)

      const link = screen.getByRole('link')
      expect(link).toHaveClass('sticky')
    })

    test('should be sticky when scroll position is greater than 200', () => {
      mockUseWindowScroll.mockReturnValue({
        x: 0,
        y: 500,
      })

      render(<StaticFilter />)

      const link = screen.getByRole('link')
      expect(link).toHaveClass('sticky')
    })

    test('should update sticky state when scroll position changes', () => {
      // Start with scroll position less than 200
      mockUseWindowScroll.mockReturnValue({
        x: 0,
        y: 100,
      })

      const { rerender } = render(<StaticFilter />)

      let link = screen.getByRole('link')
      expect(link).not.toHaveClass('sticky')

      // Update scroll position to greater than 200
      mockUseWindowScroll.mockReturnValue({
        x: 0,
        y: 300,
      })

      rerender(<StaticFilter />)

      link = screen.getByRole('link')
      expect(link).toHaveClass('sticky')
    })
  })

  describe('visibility toggle', () => {
    test('should start with filters visible and "Hide Filters" text', () => {
      render(
        <StaticFilter>
          <div data-testid="filter-content">Filter Content</div>
        </StaticFilter>
      )

      const link = screen.getByRole('link')
      expect(link).toHaveTextContent('Hide Filters')
      expect(screen.getByTestId('filter-content')).toBeVisible()
    })

    test('should toggle to hidden when clicked', () => {
      render(
        <StaticFilter>
          <div data-testid="filter-content">Filter Content</div>
        </StaticFilter>
      )

      const link = screen.getByRole('link')

      // Click to hide
      fireEvent.click(link)

      expect(link).toHaveTextContent('Show Filters')
      const contentContainer = screen.getByTestId('filter-content').parentElement
      expect(contentContainer).toHaveClass('h-0', 'm-0', 'overflow-hidden', 'govuk-!-padding-0')
    })

    test('should toggle back to visible when clicked again', () => {
      render(
        <StaticFilter>
          <div data-testid="filter-content">Filter Content</div>
        </StaticFilter>
      )

      const link = screen.getByRole('link')

      // Click to hide
      fireEvent.click(link)
      expect(link).toHaveTextContent('Show Filters')

      // Click to show
      fireEvent.click(link)
      expect(link).toHaveTextContent('Hide Filters')

      const contentContainer = screen.getByTestId('filter-content').parentElement
      expect(contentContainer).not.toHaveClass('h-0', 'm-0', 'overflow-hidden', 'govuk-!-padding-0')
    })

    test('should toggle multiple times correctly', () => {
      render(
        <StaticFilter>
          <div data-testid="filter-content">Filter Content</div>
        </StaticFilter>
      )

      const link = screen.getByRole('link')

      // Multiple toggles
      for (let i = 0; i < 5; i++) {
        const expectedText = i % 2 === 0 ? 'Show Filters' : 'Hide Filters'
        fireEvent.click(link)
        expect(link).toHaveTextContent(expectedText)
      }
    })
  })

  describe('CSS classes', () => {
    test('should apply base CSS classes', () => {
      render(<StaticFilter />)

      const link = screen.getByRole('link')
      expect(link).toHaveClass(
        'govuk-link--no-visited-state',
        'govuk-!-padding-1',
        'govuk-!-padding-right-2',
        'govuk-!-padding-left-2',
        'bottom-3',
        'float-right',
        'inline-flex',
        'items-center',
        'bg-black',
        'text-white',
        'no-underline',
        'shadow-none',
        'ukhsa-focus',
        'focus:bg-yellow',
        'focus:text-black'
      )
    })

    test('should conditionally apply sticky class based on scroll position', () => {
      // Test when not sticky
      mockUseWindowScroll.mockReturnValue({ x: 0, y: 100 })
      const { rerender } = render(<StaticFilter />)

      let link = screen.getByRole('link')
      expect(link).not.toHaveClass('sticky')

      // Test when sticky
      mockUseWindowScroll.mockReturnValue({ x: 0, y: 300 })
      rerender(<StaticFilter />)

      link = screen.getByRole('link')
      expect(link).toHaveClass('sticky')
    })
  })

  describe('accessibility', () => {
    test('should be focusable', () => {
      render(<StaticFilter />)

      const link = screen.getByRole('link')
      link.focus()

      expect(document.activeElement).toBe(link)
    })

    test('should have proper ARIA attributes', () => {
      render(<StaticFilter />)

      const link = screen.getByRole('link')
      expect(link.tagName).toBe('A')
      expect(link).toHaveAttribute('href')
    })
  })

  describe('translation integration', () => {
    test('should call translation function with correct keys', () => {
      render(<StaticFilter />)

      expect(mockTFunction).toHaveBeenCalledWith('globalFilter.hideFilters')

      // Click to toggle
      const link = screen.getByRole('link')
      fireEvent.click(link)

      expect(mockTFunction).toHaveBeenCalledWith('globalFilter.showFilters')
    })

    test('should handle missing translations gracefully', () => {
      mockTFunction.mockImplementation((key: string) => key) // Return key as fallback

      render(<StaticFilter />)

      const link = screen.getByRole('link')
      expect(link).toHaveTextContent('globalFilter.hideFilters')
    })
  })

  describe('edge cases', () => {
    test('should handle no children', () => {
      render(<StaticFilter />)

      expect(screen.getByRole('link')).toBeInTheDocument()
      // Should not crash without children
    })

    test('should handle scroll position exactly at 200', () => {
      mockUseWindowScroll.mockReturnValue({
        x: 0,
        y: 200,
      })

      render(<StaticFilter />)

      const link = screen.getByRole('link')
      expect(link).toHaveClass('sticky')
    })

    test('should handle negative scroll positions', () => {
      mockUseWindowScroll.mockReturnValue({
        x: 0,
        y: -50,
      })

      render(<StaticFilter />)

      const link = screen.getByRole('link')
      expect(link).not.toHaveClass('sticky')
    })
  })
})
