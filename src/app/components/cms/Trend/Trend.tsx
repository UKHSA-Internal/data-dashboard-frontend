import clsx from 'clsx'
import { z } from 'zod'

import { TrendNumber } from '@/api/models/cms/Page/Blocks'
import { getTrends } from '@/api/requests/trends/getTrends'
import { getServerTranslation } from '@/app/i18n'

interface TrendProps {
  /* Request metadata from the CMS required to fetch from the headlines api */
  data: z.infer<typeof TrendNumber>['value']
  datePrefix: string
}

export async function Trend({ data: { body: heading, ...requestParams }, datePrefix }: TrendProps) {
  const { t } = await getServerTranslation('common')

  const trend = await getTrends(requestParams)

  if (trend.success) {
    const {
      direction,
      colour,
      metric_value: change,
      metric_period_end: date,
      percentage_metric_value: percentage,
    } = trend.data

    return (
      <>
        <div>{t('cms.blocks.percentage.heading', { heading: heading || '\u00A0' })}</div>
        <div className="govuk-body-xs govuk-!-margin-bottom-1 text-dark-grey [.ukhsa-chart-card_&]:hidden">
          {t('cms.blocks.timestamp.value', { prefix: datePrefix, value: date })}
        </div>
        <div
          className={clsx('govuk-tag mt-[2px] whitespace-nowrap bg-[6px_center] bg-no-repeat', {
            'govuk-tag--green': colour === 'green',
            'govuk-tag--red': colour === 'red',
            'govuk-tag--grey [.ukhsa-headline-numbers-row-card_&]:bg-white': colour === 'neutral',
            'bg-arrow_up_green': direction === 'up' && colour === 'green',
            'bg-arrow_down_green': direction === 'down' && colour === 'green',
            'bg-arrow_up_red': direction === 'up' && colour === 'red',
            'bg-arrow_down_red': direction === 'down' && colour === 'red',
            'pl-[26px]': colour !== 'neutral',
          })}
        >
          <span className="govuk-visually-hidden">
            {t('cms.blocks.trend.alt', {
              percentage,
              change,
              context: `${colour}_${direction}`,
            })}
          </span>

          <span className="govuk-body-s govuk-!-margin-bottom-0 govuk-!-margin-right-1 font-bold text-inherit">
            {t('cms.blocks.trend.value.change', { change })}
          </span>

          <span className="govuk-body-s govuk-!-margin-bottom-0 text-inherit">
            {t('cms.blocks.trend.value.percentage', { percentage })}
          </span>
        </div>
      </>
    )
  }

  return null
}
