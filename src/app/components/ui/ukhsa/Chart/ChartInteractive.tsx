'use client'
import dynamic from 'next/dynamic'
import { Figure } from 'react-plotly.js'

interface ChartInteractiveProps {
  staticChart: React.ReactElement
  figure: Figure
}

const ChartInteractive = ({ staticChart, figure }: ChartInteractiveProps) => {
  const DynamicChart = dynamic(() => import('../../../cms/ChartInteractive/ChartInteractive'), {
    ssr: false,
    loading: () => <>{staticChart}</>,
  })

  return <DynamicChart fallbackUntilLoaded={staticChart} figure={figure} />
}

export default ChartInteractive
