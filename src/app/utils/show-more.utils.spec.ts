import { getShowLessURL, getShowMoreURL } from './show-more.utils'

const defaultUrl = new URL('http://localhost')

jest.mock('@/app/hooks/getPathname', () => ({ getPathname: jest.fn(() => defaultUrl.pathname) }))

describe('When the show less button has been clicked the generated URL', () => {
  test('removes respiratory-viruses from query param and returns /?', () => {
    const selectedSections = ['respiratory-viruses']
    const heading = 'respiratory-viruses'

    expect(getShowLessURL(selectedSections, heading)).toBe('/?#respiratory-viruses')
  })
  test('removes respiratory-viruses from the current query param and returns a new query with the previously selected sections', () => {
    const selectedSections = ['respiratory-viruses', 'outbreaks']
    const heading = 'respiratory-viruses'

    expect(getShowLessURL(selectedSections, heading)).toBe('/?section=outbreaks#respiratory-viruses')
  })
})

describe('When the show more button has been clicked the generated URL', () => {
  test('adds respiratory viruses to the query param if none already exist', () => {
    const heading = 'respiratory-viruses'

    expect(getShowMoreURL([], heading)).toBe('/?section=respiratory-viruses#respiratory-viruses')
  })

  test('adds the newly selected section to the existing query param', () => {
    const previousSections = ['respiratory-viruses']
    const newSection = 'outbreaks'

    expect(getShowMoreURL(previousSections, newSection)).toBe(
      '/?section=respiratory-viruses&section=outbreaks#outbreaks'
    )
  })
})
