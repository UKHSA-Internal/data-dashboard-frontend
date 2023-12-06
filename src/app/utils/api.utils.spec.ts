import { calculatePageOffset } from './api.utils'

describe('Pagination Offset Calculation', () => {
  test('return 0 when currentPage is 1 and pageSize is 10', () => {
    const currentPage = 1
    const pageSize = 10
    const offset = calculatePageOffset(currentPage, pageSize)
    expect(offset).toBe(0)
  })

  test('calculate the correct offset when currentPage is greater than 1', () => {
    const currentPage = 3
    const pageSize = 15
    const offset = calculatePageOffset(currentPage, pageSize)
    expect(offset).toBe(30) // Offset = (3 - 1) * 15 = 30
  })

  test('return 0 when currentPage is 1 and pageSize is 1', () => {
    const currentPage = 1
    const pageSize = 1
    const offset = calculatePageOffset(currentPage, pageSize)
    expect(offset).toBe(0)
  })

  test('handle large values of currentPage and pageSize', () => {
    const currentPage = 1000
    const pageSize = 10000
    const offset = calculatePageOffset(currentPage, pageSize)
    expect(offset).toBe(9900000) // Offset = (1000 - 1) * 10000 = 9900000
  })
})
