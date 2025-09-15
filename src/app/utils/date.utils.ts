import dayjs from 'dayjs'

import { UKHSA_GDPR_COOKIE_EXPIRY_MONTHS } from '../constants/cookies.constants'

/**
 * Returns a date object representing the GDPR cookie expiry time
 */
export const getGDPRCookieExpiryDate = () => dayjs().add(UKHSA_GDPR_COOKIE_EXPIRY_MONTHS, 'M').toDate()

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
