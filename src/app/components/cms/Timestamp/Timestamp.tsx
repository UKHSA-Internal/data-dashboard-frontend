import { z } from 'zod'

import { WithChartCard, WithChartHeadlineAndTrendCard } from '@/api/models/cms/Page'
import { getCharts } from '@/api/requests/charts/getCharts'
import { getServerTranslation } from '@/app/i18n'
import { chartSizes } from '@/config/constants'
import { logger } from '@/lib/logger'

/**
 * NOTE: The timestamp is currently only returned by the charts endpoint.
 * This server component must perform the same request as the chart component in order
 * to make use of request deduping
 */
interface TimestampProps {
  /* Request metadata from the CMS required to fetch from the headlines api */
  data: z.infer<typeof WithChartHeadlineAndTrendCard | typeof WithChartCard>['value']

  /* Size of chart based on whether the chart is displayed in a 1 or 2 column layout */
  size: 'narrow' | 'wide'
}

export async function Timestamp({ data, size }: TimestampProps) {
  const { t } = await getServerTranslation('common')

  const { chart, x_axis, y_axis, date_prefix: datePrefix } = data

  const plots = chart.map((plot) => plot.value)

  const requestBody = {
    plots,
    x_axis,
    y_axis,
    chart_width: chartSizes[size].width,
    chart_height: chartSizes[size].height,
  }

  const res = await getCharts(requestBody)

  if (res.success) {
    const {
      data: { last_updated: lastUpdated },
    } = res

    if (plots[0]?.metric === 'COVID-19_cases_casesByDay') {
      logger.info(`Timestamp Request: ${JSON.stringify(requestBody)}`)
      logger.info(`Timestamp Response: ${JSON.stringify(res.data)}`)
    }

    return (
      <h4 className="govuk-body-s govuk-!-margin-bottom-0 text-dark-grey">
        {t('cms.blocks.timestamp.value', { prefix: datePrefix, value: lastUpdated })}
      </h4>
    )
  }

  return null
}
