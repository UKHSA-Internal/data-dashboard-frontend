import dayjs from 'dayjs'

import { formatDate, getGDPRCookieExpiryDate } from './date.utils'

describe('date utils', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  test('gets GDPR cookie expiry date with correct offset', () => {
    const now = new Date('2024-01-01T00:00:00Z')
    jest.useFakeTimers().setSystemTime(now)

    const expiry = getGDPRCookieExpiryDate()
    const monthsDiff = dayjs(expiry).diff(dayjs(now), 'month')

    expect(monthsDiff).toBe(12)
  })

  test('formats date string to short UK format', () => {
    expect(formatDate('2024-04-05T00:00:00Z')).toBe('5 Apr 2024')
  })
})
