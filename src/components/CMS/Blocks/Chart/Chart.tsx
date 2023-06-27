import { Details } from 'govuk-react'
import { useTranslation } from 'next-i18next'

import { Chart as ChartComponent } from '@/components/Chart'
import { ChartTable } from '@/components/ChartTable'
import { chartTableMaxColumns } from '@/config/constants'
import { useChart } from '@/hooks/store/useChart'
import { useTabular } from '@/hooks/store/useTabular'

import { parseChartTableData } from './utils/parseChartTableData'

interface ChartProps {
  id: string
  size: 'narrow' | 'wide'
}

export const Chart = ({ id, size }: ChartProps) => {
  const { t } = useTranslation('topic')
  const chart = useChart(id)
  const tabular = useTabular(id)

  const tables = parseChartTableData(tabular, {
    maxColumns: chartTableMaxColumns[size],
  })

  return (
    <>
      {chart && <ChartComponent src={`data:image/svg+xml;utf8,${encodeURIComponent(chart)}`} />}
      {tabular && (
        <Details summary={t('table.toggle')} aria-label={t('table.toggle')}>
          {tables.map(({ columns, data }, key) => (
            <ChartTable key={key} caption="" columns={columns} data={data} />
          ))}
        </Details>
      )}
    </>
  )
}
