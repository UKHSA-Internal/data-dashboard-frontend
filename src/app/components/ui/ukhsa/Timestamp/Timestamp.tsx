import { z } from 'zod'

import { WithChartCard, WithChartHeadlineAndTrendCard } from '@/api/models/cms/Page'
import { DataClassification } from '@/api/models/DataClassification'
import { getCharts } from '@/api/requests/charts/getCharts'
import { getServerTranslation } from '@/app/i18n'
import { getWatermarkFlags } from '@/app/utils/data-classification.utils'
import { chartSizes } from '@/config/constants'

/**
 * NOTE: The timestamp is currently only returned by the charts endpoint.
 * This server component must perform the same request as the chart component in order
 * to make use of request deduping
 */
interface TimestampProps {
  /* Request metadata from the CMS required to fetch from the headlines api */
  readonly data: z.infer<typeof WithChartHeadlineAndTrendCard | typeof WithChartCard>['value']

  /* Size of chart based on whether the chart is displayed in a 1 or 2 column layout */
  readonly size: 'narrow' | 'wide'

  readonly isNonPublic?: boolean
  readonly dataClassification?: DataClassification
}

export async function Timestamp({ data, size, isNonPublic, dataClassification }: TimestampProps) {
  const { t } = await getServerTranslation('common')

  const {
    chart,
    x_axis,
    y_axis,
    x_axis_title,
    y_axis_title,
    y_axis_minimum_value,
    y_axis_maximum_value,
    date_prefix: datePrefix,
  } = data

  const plots = chart.map((plot) => plot.value)

  const requestBody = {
    plots,
    x_axis,
    y_axis,
    x_axis_title,
    y_axis_title,
    y_axis_minimum_value,
    y_axis_maximum_value,
    chart_width: chartSizes[size].width,
    chart_height: chartSizes[size].height,
    ...getWatermarkFlags(isNonPublic, dataClassification),
  }

  const res = await getCharts(requestBody)

  if (res.success) {
    const {
      data: { last_updated: lastUpdated },
    } = res

    return (
      <h4 className="govuk-body-s govuk-!-margin-bottom-0 text-dark-grey">
        {t('cms.blocks.timestamp.value', { prefix: datePrefix, value: lastUpdated })}
      </h4>
    )
  }

  return null
}
