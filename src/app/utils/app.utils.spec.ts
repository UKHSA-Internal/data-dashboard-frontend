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

  test('calculates timespan between dates', () => {
    const start = new Date('2020-01-01')
    const end = new Date('2022-03-01')
    expect(getTimespan(start, end)).toEqual({ years: 2, months: 2 })
  })
})
