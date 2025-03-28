import { getSelectOptions } from './ChartSelect'

describe('Get select options test', () => {
  test('less than one year', () => {
    const result = getSelectOptions(0)

    expect(result).toEqual(['All'])
  })

  test('one to two years', () => {
    const result = getSelectOptions(1)

    expect(result).toEqual(['1 Month', '3 Months', '6 Months', 'All'])
  })

  test('8 years responds with 6-10y response', () => {
    const result = getSelectOptions(8)

    expect(result).toEqual(['1 Year', '2 Years', '3 Years', '4 Years', '5 Years', 'All'])
  })

  test('22 years responds with 20-25y response', () => {
    const result = getSelectOptions(22)

    expect(result).toEqual(['1 Year', '2 Years', '5 Years', '10 Years', '15 Years', 'All'])
  })
})
