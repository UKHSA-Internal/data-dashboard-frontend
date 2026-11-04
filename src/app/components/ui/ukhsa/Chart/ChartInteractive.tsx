'use client'
import dynamic from 'next/dynamic'
import { Figure } from 'react-plotly.js'

import { FigureConfig } from '@/api/requests/charts/getCharts'

interface ChartInteractiveProps {
  staticChart: React.ReactElement
  figure: Figure
  chartHeight: number
  figureConfig?: FigureConfig
}

const ChartInteractive = ({ staticChart, figure, chartHeight, figureConfig }: ChartInteractiveProps) => {
  const DynamicChart = dynamic(() => import('../../../cms/ChartInteractive/ChartInteractive'), {
    ssr: false,
    loading: () => <>{staticChart}</>,
  })

  return (
    <DynamicChart
      fallbackUntilLoaded={staticChart}
      figure={figure}
      chartHeight={chartHeight}
      figureConfig={figureConfig}
    />
  )
}

export default ChartInteractive
