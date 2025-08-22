import { getMinMaxDateRange } from './time-period.utils' // Adjust import path as needed
import { TimePeriod } from '@/api/models/cms/Page/GlobalFilter'
// Mock TimePeriod type for testing

describe('getMinMaxDateRange', () => {
  const createMockTimePeriod = (id: string, label: string, dateFrom: string, dateTo: string): TimePeriod => ({
    id,
    value: {
      label,
      date_from: dateFrom,
      date_to: dateTo,
    },
    type: 'time_period',
  })

  it('should return the earliest date_from year and latest date_to year from multiple time periods', () => {
    const timePeriods: TimePeriod[] = [
      createMockTimePeriod('1', '2010-2011', '2010-04-01', '2011-03-31'),
      createMockTimePeriod('2', '2009-2010', '2009-04-01', '2010-03-31'),
      createMockTimePeriod('3', '2012-2013', '2012-04-01', '2013-03-31'),
    ]

    const result = getMinMaxDateRange(timePeriods)

    expect(result).toEqual({
      minDate: '2009',
      maxDate: '2013',
    })
  })

  it('should return correct years when there is only a single time period', () => {
    const timePeriods: TimePeriod[] = [createMockTimePeriod('1', '2020-2021', '2020-04-01', '2021-03-31')]

    const result = getMinMaxDateRange(timePeriods)

    expect(result).toEqual({
      minDate: '2020',
      maxDate: '2021',
    })
  })

  it('should find correct min and max years regardless of the order of time periods in the array', () => {
    const timePeriods: TimePeriod[] = [
      createMockTimePeriod('1', '2015-2016', '2015-04-01', '2016-03-31'),
      createMockTimePeriod('2', '2010-2011', '2010-04-01', '2011-03-31'),
      createMockTimePeriod('3', '2020-2021', '2020-04-01', '2021-03-31'),
      createMockTimePeriod('4', '2008-2009', '2008-04-01', '2009-03-31'),
    ]

    const result = getMinMaxDateRange(timePeriods)

    expect(result).toEqual({
      minDate: '2008',
      maxDate: '2021',
    })
  })

  it('should throw an error when the time periods array is empty', () => {
    const timePeriods: TimePeriod[] = []

    expect(() => getMinMaxDateRange(timePeriods)).toThrow('Cannot determine date range from empty time periods array')
  })

  it('should return the same year for min and max when all dates fall within the same year', () => {
    const timePeriods: TimePeriod[] = [
      createMockTimePeriod('1', '2020-Jan', '2020-01-01', '2020-06-30'),
      createMockTimePeriod('2', '2020-Dec', '2020-07-01', '2020-12-31'),
    ]

    const result = getMinMaxDateRange(timePeriods)

    expect(result).toEqual({
      minDate: '2020',
      maxDate: '2020',
    })
  })

  it('should correctly handle dates that include February 29th in leap years', () => {
    const timePeriods: TimePeriod[] = [
      createMockTimePeriod('1', '2020-leap', '2020-02-29', '2020-03-01'),
      createMockTimePeriod('2', '2019-normal', '2019-02-28', '2019-03-01'),
    ]

    const result = getMinMaxDateRange(timePeriods)

    expect(result).toEqual({
      minDate: '2019',
      maxDate: '2020',
    })
  })

  it('should correctly handle dates that span across different centuries', () => {
    const timePeriods: TimePeriod[] = [
      createMockTimePeriod('1', '1999-2000', '1999-04-01', '2000-03-31'),
      createMockTimePeriod('2', '2000-2001', '2000-04-01', '2001-03-31'),
    ]

    const result = getMinMaxDateRange(timePeriods)

    expect(result).toEqual({
      minDate: '1999',
      maxDate: '2001',
    })
  })

  it('should return 2009 as min year and 2025 as max year when given the complete example dataset', () => {
    const fullDataset: TimePeriod[] = [
      createMockTimePeriod('1', '2009-2010', '2009-04-01', '2010-03-31'),
      createMockTimePeriod('2', '2010-2011', '2010-04-01', '2011-03-31'),
      createMockTimePeriod('3', '2011-2012', '2011-04-01', '2012-03-31'),
      createMockTimePeriod('4', '2012-2013', '2012-04-01', '2013-03-31'),
      createMockTimePeriod('5', '2013-2014', '2013-04-01', '2014-03-31'),
      createMockTimePeriod('6', '2024-2025', '2024-04-01', '2025-03-31'),
    ]

    const result = getMinMaxDateRange(fullDataset)

    expect(result).toEqual({
      minDate: '2009',
      maxDate: '2025',
    })
  })

  it('should not modify the original time periods array when processing', () => {
    const timePeriods: TimePeriod[] = [createMockTimePeriod('1', '2020-2021', '2020-04-01', '2021-03-31')]
    const originalLength = timePeriods.length
    const originalFirstItem = { ...timePeriods[0] }

    getMinMaxDateRange(timePeriods)

    expect(timePeriods.length).toBe(originalLength)
    expect(timePeriods[0]).toEqual(originalFirstItem)
  })
})
