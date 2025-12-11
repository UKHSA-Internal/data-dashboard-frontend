import { UKHSA_GDPR_COOKIE_EXPIRY_MONTHS } from '../constants/cookies.constants'
import { formatDate, getGDPRCookieExpiryDate } from './date.utils'

describe('date.utils', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getGDPRCookieExpiryDate', () => {
    test('returns a date object', () => {
      const result = getGDPRCookieExpiryDate()
      expect(result).toBeInstanceOf(Date)
    })

    test('returns date with correct expiry months added', () => {
      const result = getGDPRCookieExpiryDate()
      // Check that the date is a future date
      expect(result.getTime()).toBeGreaterThan(Date.now())
      // Verify it's approximately the correct number of months in the future
      const expectedDate = new Date()
      expectedDate.setMonth(expectedDate.getMonth() + UKHSA_GDPR_COOKIE_EXPIRY_MONTHS)
      // Allow some variance for test execution time (within 1 day)
      const diff = Math.abs(result.getTime() - expectedDate.getTime())
      expect(diff).toBeLessThan(24 * 60 * 60 * 1000) // Less than 1 day difference
    })
  })

  describe('formatDate', () => {
    test('formats date string correctly in en-GB format', () => {
      const result = formatDate('2023-06-15')
      // Format should be: "15 Jun 2023" (en-GB format)
      expect(result).toMatch(/15/)
      expect(result).toMatch(/Jun|June/)
      expect(result).toMatch(/2023/)
    })

    test('handles different date formats', () => {
      const result1 = formatDate('2024-01-01')
      expect(result1).toBeTruthy()
      expect(typeof result1).toBe('string')

      const result2 = formatDate('2023-12-31')
      expect(result2).toBeTruthy()
      expect(typeof result2).toBe('string')
    })

    test('formats dates with different months correctly', () => {
      const january = formatDate('2023-01-15')
      const december = formatDate('2023-12-15')

      expect(january).toContain('Jan')
      expect(december).toContain('Dec')
    })

    test('handles single digit days', () => {
      const result = formatDate('2023-06-05')
      expect(result).toMatch(/5/)
    })

    test('handles year boundaries', () => {
      const result = formatDate('2023-12-31')
      expect(result).toContain('2023')
    })
  })
})
