'use client'
import dynamic from 'next/dynamic'
import { Figure } from 'react-plotly.js'

import { FigureConfig } from '@/api/requests/charts/getCharts'

interface ChartInteractiveProps {
  staticChart: React.ReactElement
  figure: Figure
  figure_config?: FigureConfig
}

const ChartInteractive = ({ staticChart, figure, figure_config }: ChartInteractiveProps) => {
  const DynamicChart = dynamic(() => import('../../../cms/ChartInteractive/ChartInteractive'), {
    ssr: false,
    loading: () => <>{staticChart}</>,
  })

  return <DynamicChart fallbackUntilLoaded={staticChart} figure={figure} figure_config={figure_config} />
}

export default ChartInteractive
