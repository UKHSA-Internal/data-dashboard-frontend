import { z } from 'zod'

import { HeadlineNumber } from '@/api/models/cms/Page/Blocks'
import { getHeadlines } from '@/api/requests/headlines/getHeadlines'
import { getServerTranslation } from '@/app/i18n'

interface HeadlineProps {
  /* Request metadata from the CMS required to fetch from the headlines api */
  data: z.infer<typeof HeadlineNumber>['value']
  datePrefix: string
  isPublic?: boolean
}

export async function Headline({ data: { body: heading, ...requestParams }, datePrefix, isPublic }: HeadlineProps) {
  const { t } = await getServerTranslation('common')

  const headline = await getHeadlines(requestParams, isPublic)

  if (headline.success) {
    const {
      data: { value, period_end: date },
    } = headline

    return (
      <div>
        <div>{t('cms.blocks.headline.heading', { heading })}</div>
        <div className="govuk-body-xs govuk-!-margin-bottom-1 text-dark-grey [.ukhsa-chart-card_&]:hidden">
          {t('cms.blocks.timestamp.value', { prefix: datePrefix, value: date })}
        </div>
        <div className="govuk-body-l govuk-!-margin-bottom-0">{t('cms.blocks.headline.value', { value })}</div>
      </div>
    )
  }

  return null
}
