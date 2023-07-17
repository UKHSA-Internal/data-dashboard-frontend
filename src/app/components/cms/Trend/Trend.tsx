import clsx from 'clsx'
import { z } from 'zod'

import { TrendNumber } from '@/api/models/cms/Page/Blocks'
import { getTrends } from '@/api/requests/trends/getTrends'

import { useTranslation } from '../../../i18n'

interface TrendProps {
  /* Request metadata from the CMS required to fetch from the headlines api */
  data: z.infer<typeof TrendNumber>['value']
}

export async function Trend({ data }: TrendProps) {
  const { t } = await useTranslation('common')

  const trend = await getTrends(data)

  if (trend.success) {
    const { body: heading } = data

    const { direction, colour, metric_value: change, percentage_metric_value: percentage } = trend.data

    return (
      <div>
        <div>{t('cms.blocks.percentage.heading', { heading })}</div>
        <div
          className={clsx('govuk-tag govuk-!-margin-top-1 whitespace-nowrap bg-[6px_center] bg-no-repeat', {
            'govuk-tag--green': colour === 'green',
            'govuk-tag--red': colour === 'red',
            'govuk-tag--grey bg-white': colour === 'neutral',
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
      </div>
    )
  }

  return null
}
