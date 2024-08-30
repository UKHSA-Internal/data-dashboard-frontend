import clsx from 'clsx'
import { z } from 'zod'

import { TrendNumber } from '@/api/models/cms/Page/Blocks'
import { getTrends } from '@/api/requests/trends/getTrends'
import { getServerTranslation } from '@/app/i18n'

interface TrendProps {
  /* Request metadata from the CMS required to fetch from the headlines api */
  data: z.infer<typeof TrendNumber>['value']
}

export async function Trend({ data: { body: heading, ...requestParams } }: TrendProps) {
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

    const isUpPositive = direction === 'up' && colour === 'green'
    const isUpNegative = direction === 'up' && colour === 'red'
    const isDownPositive = direction === 'down' && colour === 'green'
    const isDownNegative = direction === 'down' && colour === 'red'
    const isNeutral = colour !== 'neutral'

    return (
      <>
        <strong className="govuk-!-font-size-16 govuk-visually-hidden mb-2 text-black">{heading}</strong>
        <div className="govuk-body-xs govuk-!-margin-bottom-1 text-dark-grey [.ukhsa-chart-card_&]:hidden">
          {t('cms.blocks.headline.date', { value: date })}
        </div>
        <div
          className={clsx('bg-[6px_center] bg-no-repeat', {
            'bg-alt_arrow_up_green': isUpPositive,
            'bg-alt_arrow_down_green': isDownPositive,
            'bg-alt_arrow_up_red': isUpNegative,
            'bg-alt_arrow_down_red': isDownNegative,
            'pl-6': isNeutral,
          })}
        >
          <div
            className={clsx('flex items-center gap-2', {
              'text-green-dark': isUpPositive || isDownPositive,
              'text-red-dark': isUpNegative || isDownNegative,
            })}
          >
            <span className="govuk-heading-l mb-0 text-inherit" aria-hidden>
              {t('cms.blocks.trend.v2.value.percentage', { percentage })}
              <span className="govuk-!-font-size-19">{t('cms.blocks.trend.v2.value.symbol')}</span>
            </span>
            <span className="govuk-body-s mb-0 max-w-[80%]">
              {t('cms.blocks.trend.v2.alt', {
                percentage,
                change,
                context: `${colour}_${direction}`,
              })}
            </span>
          </div>
        </div>
      </>
    )
  }

  return null
}
