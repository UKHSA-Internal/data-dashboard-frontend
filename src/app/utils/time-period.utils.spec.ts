import { getMinMaxYears, getMinMaxFullDate } from './time-period.utils'
import { TimePeriod } from '@/api/models/cms/Page/GlobalFilter'
// Mock TimePeriod type for testing
describe('time-period.utils, ', () => {
  describe('getMinMaxYears', () => {
    const createMockTimePeriod = (id: string, label: string, dateFrom: string, dateTo: string): TimePeriod => ({
      id,
      value: {
        label,
        date_from: dateFrom,
        date_to: dateTo,
      },
      type: 'time_period',
    })

    test('should return the earliest date_from year and latest date_to year from multiple time periods', () => {
      const timePeriods: TimePeriod[] = [
        createMockTimePeriod('1', '2010-2011', '2010-04-01', '2011-03-31'),
        createMockTimePeriod('2', '2009-2010', '2009-04-01', '2010-03-31'),
        createMockTimePeriod('3', '2012-2013', '2012-04-01', '2013-03-31'),
      ]

      const result = getMinMaxYears(timePeriods)

      expect(result).toEqual({
        minDate: '2009',
        maxDate: '2013',
      })
    })

    test('should return correct years when there is only a single time period', () => {
      const timePeriods: TimePeriod[] = [createMockTimePeriod('1', '2020-2021', '2020-04-01', '2021-03-31')]

      const result = getMinMaxYears(timePeriods)

      expect(result).toEqual({
        minDate: '2020',
        maxDate: '2021',
      })
    })

    test('should find correct min and max years regardless of the order of time periods in the array', () => {
      const timePeriods: TimePeriod[] = [
        createMockTimePeriod('1', '2015-2016', '2015-04-01', '2016-03-31'),
        createMockTimePeriod('2', '2010-2011', '2010-04-01', '2011-03-31'),
        createMockTimePeriod('3', '2020-2021', '2020-04-01', '2021-03-31'),
        createMockTimePeriod('4', '2008-2009', '2008-04-01', '2009-03-31'),
      ]

      const result = getMinMaxYears(timePeriods)

      expect(result).toEqual({
        minDate: '2008',
        maxDate: '2021',
      })
    })

    test('should throw an error when the time periods array is empty', () => {
      const timePeriods: TimePeriod[] = []

      expect(() => getMinMaxYears(timePeriods)).toThrow('Cannot determine date range from empty time periods array')
    })

    test('should return the same year for min and max when all dates fall within the same year', () => {
      const timePeriods: TimePeriod[] = [
        createMockTimePeriod('1', '2020-Jan', '2020-01-01', '2020-06-30'),
        createMockTimePeriod('2', '2020-Dec', '2020-07-01', '2020-12-31'),
      ]

      const result = getMinMaxYears(timePeriods)

      expect(result).toEqual({
        minDate: '2020',
        maxDate: '2020',
      })
    })

    test('should correctly handle dates that include February 29th in leap years', () => {
      const timePeriods: TimePeriod[] = [
        createMockTimePeriod('1', '2020-leap', '2020-02-29', '2020-03-01'),
        createMockTimePeriod('2', '2019-normal', '2019-02-28', '2019-03-01'),
      ]

      const result = getMinMaxYears(timePeriods)

      expect(result).toEqual({
        minDate: '2019',
        maxDate: '2020',
      })
    })

    test('should correctly handle dates that span across different centuries', () => {
      const timePeriods: TimePeriod[] = [
        createMockTimePeriod('1', '1999-2000', '1999-04-01', '2000-03-31'),
        createMockTimePeriod('2', '2000-2001', '2000-04-01', '2001-03-31'),
      ]

      const result = getMinMaxYears(timePeriods)

      expect(result).toEqual({
        minDate: '1999',
        maxDate: '2001',
      })
    })

    test('should return 2009 as min year and 2025 as max year when given the complete example dataset', () => {
      const fullDataset: TimePeriod[] = [
        createMockTimePeriod('1', '2009-2010', '2009-04-01', '2010-03-31'),
        createMockTimePeriod('2', '2010-2011', '2010-04-01', '2011-03-31'),
        createMockTimePeriod('3', '2011-2012', '2011-04-01', '2012-03-31'),
        createMockTimePeriod('4', '2012-2013', '2012-04-01', '2013-03-31'),
        createMockTimePeriod('5', '2013-2014', '2013-04-01', '2014-03-31'),
        createMockTimePeriod('6', '2024-2025', '2024-04-01', '2025-03-31'),
      ]

      const result = getMinMaxYears(fullDataset)

      expect(result).toEqual({
        minDate: '2009',
        maxDate: '2025',
      })
    })

    test('should not modify the original time periods array when processing', () => {
      const timePeriods: TimePeriod[] = [createMockTimePeriod('1', '2020-2021', '2020-04-01', '2021-03-31')]
      const originalLength = timePeriods.length
      const originalFirstItem = { ...timePeriods[0] }

      getMinMaxYears(timePeriods)

      expect(timePeriods.length).toBe(originalLength)
      expect(timePeriods[0]).toEqual(originalFirstItem)
    })
  })

  describe('getMinMaxFullDate', () => {
    const createMockTimePeriod = (id: string, label: string, dateFrom: string, dateTo: string): TimePeriod => ({
      id,
      value: {
        label,
        date_from: dateFrom,
        date_to: dateTo,
      },
      type: 'time_period',
    })

    test('should return the earliest date_from and latest date_to from multiple time periods', () => {
      const timePeriods: TimePeriod[] = [
        createMockTimePeriod('1', '2010-2011', '2010-04-01', '2011-03-31'),
        createMockTimePeriod('2', '2009-2010', '2009-04-01', '2010-03-31'),
        createMockTimePeriod('3', '2012-2013', '2012-04-01', '2013-03-31'),
      ]

      const result = getMinMaxFullDate(timePeriods)

      expect(result).toEqual({
        date_from: '2009-04-01',
        date_to: '2013-03-31',
      })
    })

    test('should return the date_from and date_to when there is only a single time period', () => {
      const timePeriods: TimePeriod[] = [createMockTimePeriod('1', '2020-2021', '2020-04-01', '2021-03-31')]

      const result = getMinMaxFullDate(timePeriods)

      expect(result).toEqual({
        date_from: '2020-04-01',
        date_to: '2021-03-31',
      })
    })

    test('should find correct min and max dates regardless of the order of time periods in the array', () => {
      const timePeriods: TimePeriod[] = [
        createMockTimePeriod('1', '2015-2016', '2015-04-01', '2016-03-31'),
        createMockTimePeriod('2', '2010-2011', '2010-04-01', '2011-03-31'),
        createMockTimePeriod('3', '2020-2021', '2020-04-01', '2021-03-31'),
        createMockTimePeriod('4', '2008-2009', '2008-04-01', '2009-03-31'),
      ]

      const result = getMinMaxFullDate(timePeriods)

      expect(result).toEqual({
        date_from: '2008-04-01',
        date_to: '2021-03-31',
      })
    })

    test('should throw an error when the time periods array is empty', () => {
      const timePeriods: TimePeriod[] = []

      expect(() => getMinMaxFullDate(timePeriods)).toThrow('Cannot determine date range from empty time periods array')
    })

    test('should correctly handle dates with different day and month combinations', () => {
      const timePeriods: TimePeriod[] = [
        createMockTimePeriod('1', '2020-Jan', '2020-01-15', '2020-06-30'),
        createMockTimePeriod('2', '2020-Feb', '2020-01-01', '2020-12-31'),
        createMockTimePeriod('3', '2020-Mar', '2020-02-01', '2020-11-15'),
      ]

      const result = getMinMaxFullDate(timePeriods)

      expect(result).toEqual({
        date_from: '2020-01-01',
        date_to: '2020-12-31',
      })
    })

    test('should correctly handle dates that include February 29th in leap years', () => {
      const timePeriods: TimePeriod[] = [
        createMockTimePeriod('1', '2020-leap', '2020-02-29', '2020-03-01'),
        createMockTimePeriod('2', '2019-normal', '2019-02-28', '2019-03-01'),
      ]

      const result = getMinMaxFullDate(timePeriods)

      expect(result).toEqual({
        date_from: '2019-02-28',
        date_to: '2020-03-01',
      })
    })

    test('should correctly handle dates that span across different centuries', () => {
      const timePeriods: TimePeriod[] = [
        createMockTimePeriod('1', '1999-2000', '1999-12-31', '2000-01-01'),
        createMockTimePeriod('2', '2000-2001', '2000-06-01', '2001-05-31'),
      ]

      const result = getMinMaxFullDate(timePeriods)

      expect(result).toEqual({
        date_from: '1999-12-31',
        date_to: '2001-05-31',
      })
    })

    test('should return 2009-04-01 as date_from and 2025-03-31 as date_to when given the complete example dataset', () => {
      const fullDataset: TimePeriod[] = [
        createMockTimePeriod('1', '2009-2010', '2009-04-01', '2010-03-31'),
        createMockTimePeriod('2', '2010-2011', '2010-04-01', '2011-03-31'),
        createMockTimePeriod('3', '2011-2012', '2011-04-01', '2012-03-31'),
        createMockTimePeriod('4', '2012-2013', '2012-04-01', '2013-03-31'),
        createMockTimePeriod('5', '2013-2014', '2013-04-01', '2014-03-31'),
        createMockTimePeriod('6', '2024-2025', '2024-04-01', '2025-03-31'),
      ]

      const result = getMinMaxFullDate(fullDataset)

      expect(result).toEqual({
        date_from: '2009-04-01',
        date_to: '2025-03-31',
      })
    })

    test('should not modify the original time periods array when processing', () => {
      const timePeriods: TimePeriod[] = [createMockTimePeriod('1', '2020-2021', '2020-04-01', '2021-03-31')]
      const originalLength = timePeriods.length
      const originalFirstItem = { ...timePeriods[0] }

      getMinMaxFullDate(timePeriods)

      expect(timePeriods.length).toBe(originalLength)
      expect(timePeriods[0]).toEqual(originalFirstItem)
    })

    test('should handle time periods where date_from is later in the year than date_to of another period', () => {
      const timePeriods: TimePeriod[] = [
        createMockTimePeriod('1', 'Period 1', '2020-12-01', '2021-02-28'),
        createMockTimePeriod('2', 'Period 2', '2020-01-01', '2020-06-30'),
      ]

      const result = getMinMaxFullDate(timePeriods)

      expect(result).toEqual({
        date_from: '2020-01-01',
        date_to: '2021-02-28',
      })
    })
  })
})
