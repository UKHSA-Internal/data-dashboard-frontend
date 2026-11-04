import { headers } from 'next/headers'

import { logger } from '@/lib/logger'

export async function EmbargoNotice() {
  const headersList = await headers()
  const xUrl = headersList.get('x-url')
  const embargoTimeParam = xUrl ? new URL(xUrl).searchParams.get('et') : null

  if (!embargoTimeParam || embargoTimeParam === 'now') {
    return null
  }

  const isEpochSeconds = /^-?\d+$/.test(embargoTimeParam)

  if (!isEpochSeconds) {
    logger.warn(`Invalid embargo time param: et=${embargoTimeParam}`)
    return null
  }

  const embargoEpochSeconds = Number.parseInt(embargoTimeParam, 10)

  if (!Number.isSafeInteger(embargoEpochSeconds)) {
    logger.warn(`Invalid embargo time param: et=${embargoTimeParam}`)
    return null
  }

  // Convert epoch (seconds) to milliseconds and create a date
  const embargoDate = new Date(embargoEpochSeconds * 1000)

  if (Number.isNaN(embargoDate.getTime())) {
    logger.warn(`Invalid embargo time param: et=${embargoTimeParam}`)
    return null
  }

  // Format as readable timezone-aware datetime string
  // Using toLocaleString for automatic timezone handling
  const formattedDate = embargoDate.toLocaleString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  })

  return (
    <section className="govuk-notification-banner" aria-labelledby="govuk-notification-banner-title">
      <div className="govuk-notification-banner__header">
        <h2 className="govuk-notification-banner__title" id="govuk-notification-banner-title">
          Important
        </h2>
      </div>
      <div className="govuk-notification-banner__content">
        <p className="govuk-body">⚠️ Embargo Time: {formattedDate}.</p>
        <p className="govuk-body">This content has not yet been published.</p>
        <p className="govuk-body">You are viewing a preview of how the page will look on {formattedDate}.</p>
        <p className="govuk-body">Access is restricted to authorised users only.</p>
      </div>
    </section>
  )
}
