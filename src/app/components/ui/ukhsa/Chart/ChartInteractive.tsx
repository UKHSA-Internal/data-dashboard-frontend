'use client'
import dynamic from 'next/dynamic'
import { Figure } from 'react-plotly.js'

import { AlternativeAxisConfig } from '@/api/models/Chart'

interface ChartInteractiveProps {
  staticChart: React.ReactElement
  figure: Figure
  alternativeAxisConfig?: AlternativeAxisConfig
}

const ChartInteractive = ({ staticChart, figure, alternativeAxisConfig }: ChartInteractiveProps) => {
  const DynamicChart = dynamic(() => import('../../../cms/ChartInteractive/ChartInteractive'), {
    ssr: false,
    loading: () => <>{staticChart}</>,
  })

  return (
    <DynamicChart fallbackUntilLoaded={staticChart} figure={figure} alternativeAxisConfig={alternativeAxisConfig} />
  )
}

export default ChartInteractive
