import { useTranslation } from 'next-i18next'
import { Chart as ChartComponent } from '@/components/Chart'
import { useChart } from '@/hooks/store/useChart'
import { useTabular } from '@/hooks/store/useTabular'
import { ChartTable } from '@/components/ChartTable'

interface ChartProps {
  id: string
}

export const Chart = ({ id }: ChartProps) => {
  const { t } = useTranslation('common')
  const chart = useChart(id)
  const tabular = useTabular(id)

  return (
    <>
      {chart && <ChartComponent src={`data:image/svg+xml;utf8,${encodeURIComponent(chart)}`} />}
      {tabular && <ChartTable caption="" rows={tabular} />}
    </>
  )
}
