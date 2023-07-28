import { ZodError } from 'zod'
import { generateError } from 'zod-error'

import { zodErrorMessageOptions } from '../constants/errors.constants'

/**
 * Util function to get the revalidate value for NextJs getStaticProps
 * Passing 'false' will disable revalidation altogether and return
 * a stale version of the initial built page to all users.
 */
export const getStaticPropsRevalidateValue = () => {
  if (process.env.NEXT_REVALIDATE_TIME === 'false') {
    return false
  }

  return Number(process.env.NEXT_REVALIDATE_TIME)
}

/**
 * Formats ZodErrors into human readable format
 */
export const formatZodError = (error: ZodError) => generateError(error, zodErrorMessageOptions)