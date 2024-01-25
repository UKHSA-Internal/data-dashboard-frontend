import { useAreaSelector } from './useAreaSelector'
import { useSearchParams } from './useSearchParams'

jest.mock('./useSearchParams')

describe('useAreaSelector', () => {
  const mockedUseSearchParams = jest.mocked(useSearchParams)

  test('should return areaType and areaName if both are present', () => {
    mockedUseSearchParams.mockReturnValue(new URLSearchParams('areaType=city&areaName=London'))
    const [selectedAreaType, selectedAreaName] = useAreaSelector()
    expect(selectedAreaType).toBe('city')
    expect(selectedAreaName).toBe('London')
  })

  test('should return nulls if one of the parameters is missing', () => {
    mockedUseSearchParams.mockReturnValue(new URLSearchParams('areaType=city'))
    const [selectedAreaType, selectedAreaName] = useAreaSelector()
    expect(selectedAreaType).toBeNull()
    expect(selectedAreaName).toBeNull()
  })

  test('should return nulls if both parameters are missing', () => {
    mockedUseSearchParams.mockReturnValue(new URLSearchParams())
    const [selectedAreaType, selectedAreaName] = useAreaSelector()
    expect(selectedAreaType).toBeNull()
    expect(selectedAreaName).toBeNull()
  })

  // Clear mock after each test
  afterEach(() => {
    mockedUseSearchParams.mockClear()
  })
})
