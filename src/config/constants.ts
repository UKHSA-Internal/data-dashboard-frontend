/**
 * Checks to see if running the Authenticated version of the data dashboard
 */
export const authEnabled = process.env.AUTH_ENABLED === 'true'

/**
 * The default cache revalidation interval (10 minutes)
 * Can be overridden per request
 */
export const cacheRevalidationInterval = 600

/**
 * Associated fetch tags for the Next.js data cache
 */
export const cacheFetchTags = {
  public: 'public',
}

/**
 * The NextJS Api Route path for chart download
 */
export const chartExportApiRoutePath = '/api/download/chart'

/**
 * The NextJS Api Route path for bulk download
 */
export const downloadApiRoutePath = '/api/download'

/**
 * The maximum columns per table in the tabular data view
 */
export const chartTableMaxColumns = {
  narrow: 2,
  wide: 3,
} as const

/**
 * Chart size variants
 */
export const chartSizes = {
  narrow: {
    width: 515,
    height: 260,
  },
  wide: {
    width: 1100,
    height: 260,
  },
  half: {
    width: 650,
    height: 200,
  },
  third: {
    width: 400,
    height: 200,
  },
} as const

/**
 * The default file format in which charts are displayed as
 */
export const chartFormat = 'svg'

/**
 * Default Auth Provider
 */
export const defaultAuthProvider = 'cognito'

/**
 * Redirect path after successful sign out
 */
export const authSignOutRedirectionPath = '/start?logout=success'

