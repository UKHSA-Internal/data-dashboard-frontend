import { ChartComponentData } from '@/api/models/cms/Page'
import { DataClassification } from '@/api/models/DataClassification'
import { getServerTranslation } from '@/app/i18n'
import { getChartResponseData } from '@/app/utils/chart.utils'

/**
 * NOTE: The timestamp is currently only returned by the charts endpoints.
 * This server component must perform the same request as the chart component in order
 * to make use of request deduping. It delegates to `getChartResponseData` so that both
 * single and dual category chart cards are supported.
 */
interface TimestampProps {
  /* Request metadata from the CMS required to fetch from the charts api */
  data: ChartComponentData

  /* Size of chart based on whether the chart is displayed in a 1 or 2 column layout */
  size: 'narrow' | 'wide'
  isPublic?: boolean
  dataClassification?: DataClassification
}

export async function Timestamp({ data, size, isPublic = true, dataClassification = undefined }: TimestampProps) {
  const { t } = await getServerTranslation('common')

  // Mirror the sizes passed to the <Chart /> in ChartRowCardContent so the underlying
  // charts request (and therefore its cache key) matches and gets deduped.
  const sizes = [
    { minWidth: 768, size },
    { default: true as const, size: 'narrow' as const },
  ]

  const res = await getChartResponseData(data, null, null, sizes, isPublic, dataClassification)

  if (res?.success) {
    const {
      data: { last_updated: lastUpdated },
    } = res

    // Dual category chart cards do not carry a `date_prefix` field.
    const datePrefix = 'date_prefix' in data ? data.date_prefix : 'Up to and including'

    return (
      <h4 className="govuk-body-s govuk-!-margin-bottom-0 text-dark-grey">
        {t('cms.blocks.timestamp.value', { prefix: datePrefix, value: lastUpdated })}
      </h4>
    )
  }

  return null
}
