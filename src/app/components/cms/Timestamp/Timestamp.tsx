import { z } from 'zod'

import { WithChartHeadlineAndTrendCard } from '@/api/models/cms/Page'
import { getCharts } from '@/api/requests/charts/getCharts'
import { chartSizes } from '@/config/constants'

import { useTranslation } from '../../../i18n'

/**
 * NOTE: The timestamp is currently only returned by the charts endpoint.
 * This server component must perform the same request as the chart component in order
 * to make use of request deduping
 */
interface TimestampProps {
  /* Request metadata from the CMS required to fetch from the headlines api */
  data: z.infer<typeof WithChartHeadlineAndTrendCard>['value']

  /* Size of chart based on whether the chart is displayed in a 1 or 2 column layout */
  size: 'narrow' | 'wide'
}

export async function Timestamp({ data, size }: TimestampProps) {
  const { t } = await useTranslation('common')

  const { chart, x_axis, y_axis } = data

  const plots = chart.map((plot) => plot.value)

  const res = await getCharts({
    plots,
    x_axis,
    y_axis,
    chart_width: chartSizes[size].width,
    chart_height: chartSizes[size].height,
  })

  if (res.success) {
    const {
      data: { last_updated: lastUpdated },
    } = res

    return (
      <div>
        <div className="govuk-body-s govuk-!-margin-bottom-0 text-dark-grey">
          {t('cms.blocks.timestamp.value', { value: lastUpdated })}
        </div>
      </div>
    )
  }

  return null
}
