import { getShowLessURL, getShowMoreURL } from './show-more.utils'

const defaultUrl = new URL('http://localhost')

jest.mock('@/app/hooks/getPathname', () => ({ getPathname: jest.fn(() => defaultUrl.pathname) }))

describe('getShowLessURL', () => {
  test('removes respiratory-viruses from query param and returns /?', () => {
    const selectedSections = ['respiratory-viruses']
    const heading = 'respiratory-viruses'

    expect(getShowLessURL(selectedSections, heading)).toBe('/?')
  })
  test('removes respiratory-viruses from query param and returns /?', () => {
    const selectedSections = ['respiratory-viruses', 'outbreaks']
    const heading = 'respiratory-viruses'

    expect(getShowLessURL(selectedSections, heading)).toBe('/?section=outbreaks')
  })
})

describe('getShowMoreURL', () => {
  test('adds respiratory viruses to the query param if none already exist', () => {
    const heading = 'respiratory-viruses'

    expect(getShowMoreURL([], heading)).toBe('/?section=respiratory-viruses')
  })

  test('adds to the query param', () => {
    const previousSections = ['respiratory-viruses']
    const newSection = 'outbreaks'

    expect(getShowMoreURL(previousSections, newSection)).toBe('/?section=respiratory-viruses&section=outbreaks')
  })
})
