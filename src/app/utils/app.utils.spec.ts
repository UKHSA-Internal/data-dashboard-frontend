import { toSlug } from './app.utils'

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
