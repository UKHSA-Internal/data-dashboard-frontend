import { getAreaSelector } from './getAreaSelector'
import { getSearchParams } from './getSearchParams'

jest.mock('./getSearchParams')

describe('getAreaSelector', () => {
  const mockedUseSearchParams = jest.mocked(getSearchParams)

  test('should return areaType and areaName if both are present', () => {
    mockedUseSearchParams.mockReturnValue(new URLSearchParams('areaType=city&areaName=London'))
    const [selectedAreaType, selectedAreaName] = getAreaSelector()
    expect(selectedAreaType).toBe('city')
    expect(selectedAreaName).toBe('London')
  })

  test('should return nulls if one of the parameters is missing', () => {
    mockedUseSearchParams.mockReturnValue(new URLSearchParams('areaType=city'))
    const [selectedAreaType, selectedAreaName] = getAreaSelector()
    expect(selectedAreaType).toBeNull()
    expect(selectedAreaName).toBeNull()
  })

  test('should return nulls if both parameters are missing', () => {
    mockedUseSearchParams.mockReturnValue(new URLSearchParams())
    const [selectedAreaType, selectedAreaName] = getAreaSelector()
    expect(selectedAreaType).toBeNull()
    expect(selectedAreaName).toBeNull()
  })

  // Clear mock after each test
  afterEach(() => {
    mockedUseSearchParams.mockClear()
  })
})
