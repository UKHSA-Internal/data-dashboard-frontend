// Import the function to be tested

import { Slug } from '@/app/types'

import { extractRootSlug, getPath, getPathSegments } from './slug'

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

describe('getPathSegments', () => {
  test('handle url with single path segment', () => {
    const url = 'https://dev.ukhsa-dashboard.data.gov.uk/access-our-data/'
    expect(getPathSegments(url)).toEqual<Slug>(['access-our-data'])
  })

  test('handle url with multiple path segments', () => {
    const url = 'https://dev.ukhsa-dashboard.data.gov.uk/topics/covid-19'
    expect(getPathSegments(url)).toEqual<Slug>(['topics', 'covid-19'])
  })

  test('handle unexpected values', () => {
    const url = ''
    expect(getPathSegments(url)).toEqual<Slug>([])
  })

  test('handle URLs without trailing slash', () => {
    const url = 'https://dev.ukhsa-dashboard.data.gov.uk/access-our-data'
    expect(getPathSegments(url)).toEqual<Slug>(['access-our-data'])
  })

  test('handle root URLs', () => {
    const url = 'https://dev.ukhsa-dashboard.data.gov.uk/'
    expect(getPathSegments(url)).toEqual<Slug>([])
  })

  test('handle URLs with query parameters', () => {
    const url = 'https://dev.ukhsa-dashboard.data.gov.uk/access-our-data/?query=param'
    expect(getPathSegments(url)).toEqual<Slug>(['access-our-data'])
  })

  test('handle URLs with hash fragments', () => {
    const url = 'https://dev.ukhsa-dashboard.data.gov.uk/access-our-data/#fragment'
    expect(getPathSegments(url)).toEqual<Slug>(['access-our-data'])
  })

  test('handle URLs with both query parameters and hash fragments', () => {
    const url = 'https://dev.ukhsa-dashboard.data.gov.uk/access-our-data/?query=param#fragment'
    expect(getPathSegments(url)).toEqual<Slug>(['access-our-data'])
  })
})

describe('getPath', () => {
  test('handle url with single path segment', () => {
    const url = 'https://dev.ukhsa-dashboard.data.gov.uk/access-our-data/'
    expect(getPath(url)).toEqual<string>('/access-our-data')
  })

  test('handle url with multiple path segments', () => {
    const url = 'https://dev.ukhsa-dashboard.data.gov.uk/outbreaks/measles'
    expect(getPath(url)).toEqual<string>('/outbreaks/measles')
  })

  test('handle unexpected values', () => {
    const url = ''
    expect(getPath(url)).toEqual<string>('/')
  })

  test('handle URLs without trailing slash', () => {
    const url = 'https://dev.ukhsa-dashboard.data.gov.uk/access-our-data'
    expect(getPath(url)).toEqual<string>('/access-our-data')
  })

  test('handle root URLs', () => {
    const url = 'https://dev.ukhsa-dashboard.data.gov.uk/'
    expect(getPath(url)).toEqual<string>('/')
  })
})
