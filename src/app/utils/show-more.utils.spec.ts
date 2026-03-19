import { getShowLessURL, getShowMoreURL, processSectionParams } from './show-more.utils'

const defaultUrl = new URL('http://localhost')

describe('processSectionParams', () => {
  test('returns empty array when value is undefined', () => {
    expect(processSectionParams(undefined)).toEqual([])
  })

  test('returns empty array when value is empty string', () => {
    expect(processSectionParams('')).toEqual([])
  })

  test('converts single string to array of lowercase', () => {
    expect(processSectionParams('Respiratory-Viruses')).toEqual(['respiratory-viruses'])
  })

  test('converts array of strings to array of lowercase', () => {
    expect(processSectionParams(['Influenza', 'COVID-19', 'measles'])).toEqual(['influenza', 'covid-19', 'measles'])
  })

  test('handles single section param from URL', () => {
    expect(processSectionParams('infectious-diseases')).toEqual(['infectious-diseases'])
  })

  test('handles multiple section params from URL', () => {
    expect(processSectionParams(['respiratory-viruses', 'outbreaks'])).toEqual(['respiratory-viruses', 'outbreaks'])
  })
})

jest.mock('@/app/hooks/getPathname', () => ({ getPathname: jest.fn(() => defaultUrl.pathname) }))

describe('When the show less button has been clicked the generated URL', () => {
  test('removes respiratory-viruses from query param and returns /?', async () => {
    const selectedSections = ['respiratory-viruses']
    const heading = 'respiratory-viruses'

    expect(await getShowLessURL(selectedSections, heading)).toBe('/?#respiratory-viruses')
  })
  test('removes respiratory-viruses from the current query param and returns a new query with the previously selected sections', async () => {
    const selectedSections = ['respiratory-viruses', 'outbreaks']
    const heading = 'respiratory-viruses'

    expect(await getShowLessURL(selectedSections, heading)).toBe('/?section=outbreaks#respiratory-viruses')
  })
})

describe('When the show more button has been clicked the generated URL', () => {
  test('adds respiratory viruses to the query param if none already exist', async () => {
    const heading = 'respiratory-viruses'

    expect(await getShowMoreURL([], heading)).toBe('/?section=respiratory-viruses#respiratory-viruses')
  })

  test('adds the newly selected section to the existing query param', async () => {
    const previousSections = ['respiratory-viruses']
    const newSection = 'outbreaks'

    expect(await getShowMoreURL(previousSections, newSection)).toBe(
      '/?section=respiratory-viruses&section=outbreaks#outbreaks'
    )
  })
})
