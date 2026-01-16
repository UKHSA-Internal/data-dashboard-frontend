import { SITE_URL } from '../constants/app.constants'
import { getTimespan, isProd, isWellKnownEnvironment, slug2String, toSlug, trimTrailingSlash } from './app.utils'

test('Determine prod env based on hostname', () => {
  window = Object.create(window)

  Object.defineProperty(window, 'location', {
    value: {
      hostname: SITE_URL,
    },
    writable: true, // possibility to override
  })

  expect(isProd()).toBe(true)

  Object.defineProperty(window, 'location', {
    value: {
      hostname: 'localhost',
    },
    writable: true, // possibility to override
  })

  expect(isProd()).toBe(false)
})

describe('toSlug', () => {
  test('returns empty string for null input', () => {
    expect(toSlug(null)).toBe('')
  })

  test('returns empty string for empty string input', () => {
    expect(toSlug('')).toBe('')
  })

  test('converts spaces to hyphens', () => {
    expect(toSlug('hello world')).toBe('hello-world')
  })

  test('converts uppercase letters to lowercase', () => {
    expect(toSlug('Hello World')).toBe('hello-world')
  })

  test('removes non-word characters', () => {
    expect(toSlug('Hello, World!')).toBe('hello-world')
  })

  test('trims leading and trailing spaces', () => {
    expect(toSlug('  hello world  ')).toBe('hello-world')
  })

  test('replaces multiple spaces with a single hyphen', () => {
    expect(toSlug('hello   world')).toBe('hello-world')
  })

  test('replaces multiple hyphens with a single hyphen', () => {
    expect(toSlug('hello--world')).toBe('hello-world')
  })

  test('trims leading hyphens', () => {
    expect(toSlug('-hello world')).toBe('hello-world')
  })

  test('trims trailing hyphens', () => {
    expect(toSlug('hello world-')).toBe('hello-world')
  })

  test('handles mixed cases and special characters', () => {
    expect(toSlug('  --Hello W_o_r_l_d!!--  ')).toBe('hello-w_o_r_l_d')
  })
})

describe('app utils helpers', () => {
  const originalEnv = process.env

  afterEach(() => {
    process.env = originalEnv
  })

  test('detects well known environment based on BASE_URL', () => {
    process.env = { ...originalEnv, BASE_URL: 'https://ukhsa-dashboard.data.gov.uk' }
    expect(isWellKnownEnvironment()).toBe(true)

    process.env = { ...originalEnv, BASE_URL: 'https://example.com' }
    expect(isWellKnownEnvironment()).toBe(false)
  })

  test('converts slug array to string and trims trailing slash', () => {
    expect(slug2String(['slug1', 'slug2', 'slug3'])).toBe('slug1/slug2/slug3')
    expect(trimTrailingSlash('https://ukhsa-dashboard.data.gov.uk/slug1/')).toBe(
      'https://ukhsa-dashboard.data.gov.uk/slug1'
    )
  })
})

describe('getTimespan', () => {
  test('calculates years and months correctly for same year', () => {
    const startDate = new Date('2023-01-01')
    const endDate = new Date('2023-06-15')
    const result = getTimespan(startDate, endDate)
    expect(result).toEqual({ years: 0, months: 5 })
  })

  test('calculates years and months correctly across one year boundary', () => {
    const startDate = new Date('2023-01-01')
    const endDate = new Date('2024-03-15')
    const result = getTimespan(startDate, endDate)
    expect(result).toEqual({ years: 1, months: 2 })
  })

  test('calculates years and months correctly across multiple years', () => {
    const startDate = new Date('2020-01-01')
    const endDate = new Date('2023-06-15')
    const result = getTimespan(startDate, endDate)
    expect(result).toEqual({ years: 3, months: 5 })
  })

  test('handles same dates', () => {
    const date = new Date('2023-06-15')
    const result = getTimespan(date, date)
    expect(result).toEqual({ years: 0, months: 0 })
  })

  test('handles end date earlier in month than start date', () => {
    const startDate = new Date('2023-06-15')
    const endDate = new Date('2024-03-10')
    const result = getTimespan(startDate, endDate)
    // 9 months difference (June to March next year)
    expect(result).toEqual({ years: 0, months: 9 })
  })

  test('handles exactly 12 months (1 year, 0 months)', () => {
    const startDate = new Date('2023-01-01')
    const endDate = new Date('2024-01-01')
    const result = getTimespan(startDate, endDate)
    expect(result).toEqual({ years: 1, months: 0 })
  })

  test('handles more than 12 months', () => {
    const startDate = new Date('2022-01-01')
    const endDate = new Date('2024-06-15')
    const result = getTimespan(startDate, endDate)
    // 29 months = 2 years, 5 months
    expect(result).toEqual({ years: 2, months: 5 })
  })

  test('handles month rollover correctly', () => {
    const startDate = new Date('2023-11-01')
    const endDate = new Date('2024-02-01')
    const result = getTimespan(startDate, endDate)
    // 3 months difference
    expect(result).toEqual({ years: 0, months: 3 })
  })
})
