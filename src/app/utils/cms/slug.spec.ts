// Import the function to be tested

import { Slug } from '@/app/types'

import { extractRootSlug } from './slug'

// Define the test suite for the extractRootSlug function
describe('extractRootSlug', () => {
  // Test case: should extract the first element of the slug array
  test('should extract the first element of the slug array and prefix with a slash', () => {
    const slug: Slug = ['home', 'about', 'contact']
    const result = extractRootSlug(slug)
    expect(result).toBe('/home')
  })

  // Test case: should return a slash followed by the first element even if there is only one element
  test('should return a slash followed by the first element when slug array has one element', () => {
    const slug: Slug = ['onlyElement']
    const result = extractRootSlug(slug)
    expect(result).toBe('/onlyElement')
  })

  // Test case: should return undefined if the slug array is empty
  test('should return "/" when slug array is empty', () => {
    const slug: Slug = []
    const result = extractRootSlug(slug)
    expect(result).toBe('/')
  })
})
