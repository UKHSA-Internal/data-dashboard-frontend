import { Chart as ChartComponent } from '@/components/Chart'
import { useChart } from '@/hooks/store/useChart'

interface ChartProps {
  id: string
}

export const Chart = ({ id }: ChartProps) => {
  const chart = useChart(id)

  if (chart) {
    return <ChartComponent src={`data:image/svg+xml;utf8,${encodeURIComponent(chart)}`} />
  }

  // TODO - Handle error state
  return null
}
