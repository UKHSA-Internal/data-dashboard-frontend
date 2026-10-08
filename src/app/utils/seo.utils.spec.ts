import { isAuthenticatedOnlyRoute, isPageIndexable, NO_INDEX_ROBOTS } from './seo.utils'

describe('SEO utilities', () => {
  test('defines the expected noindex metadata', () => {
    expect(NO_INDEX_ROBOTS).toBe('noindex, nofollow')
  })

  describe('isAuthenticatedOnlyRoute', () => {
    test.each([
      '/start',
      '/start/',
      '/acknowledgement',
      '/authentication-error',
      '/logged-out',
      '/auth',
      '/auth/',
      '/auth/signin',
      '/auth/callback/azure-ad',
      'https://example.com/auth/signin?callbackUrl=%2F',
    ])('identifies %s as authentication-only', (url) => {
      expect(isAuthenticatedOnlyRoute(url)).toBe(true)
    })

    test.each([
      '/',
      '/about',
      '/metrics-documentation',
      '/weather-health-alerts/cold',
      '/starting',
      '/authentication',
      '/author',
    ])('does not identify public route %s as authentication-only', (url) => {
      expect(isAuthenticatedOnlyRoute(url)).toBe(false)
    })
  })

  describe('isPageIndexable', () => {
    test.each([
      { url: '/', isPublic: undefined },
      { url: '/about', isPublic: undefined },
      { url: '/respiratory-viruses/covid-19', isPublic: true },
      {
        url: 'https://example.com/metrics-documentation/public-metric',
        isPublic: true,
      },
    ])('allows public page $url to be indexed', ({ url, isPublic }) => {
      expect(isPageIndexable({ url, isPublic })).toBe(true)
    })

    test.each(['/start', '/acknowledgement', '/authentication-error', '/logged-out', '/auth', '/auth/signin'])(
      'prevents authentication route %s from being indexed',
      (url) => {
        expect(isPageIndexable({ url, isPublic: true })).toBe(false)
      }
    )

    test('prevents a non-public CMS page from being indexed', () => {
      expect(
        isPageIndexable({
          url: '/respiratory-viruses/private-topic',
          isPublic: false,
        })
      ).toBe(false)
    })

    test.each([null, undefined, ''])('prevents pages without a URL from being indexed', (url) => {
      expect(isPageIndexable({ url })).toBe(false)
    })
  })
})
