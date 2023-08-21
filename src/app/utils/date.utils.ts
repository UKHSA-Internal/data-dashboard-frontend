import dayjs from 'dayjs'

import { UKHSA_GDPR_COOKIE_EXPIRY_MONTHS } from '../constants/cookies.constants'

/**
 * Returns a date object representing the GDPR cookie expiry time
 */
export const getGDPRCookieExpiryDate = () => dayjs().add(UKHSA_GDPR_COOKIE_EXPIRY_MONTHS, 'M').toDate()
