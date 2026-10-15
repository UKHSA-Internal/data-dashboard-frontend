'use client'
import dynamic from 'next/dynamic'
import { ReactElement, Suspense } from 'react'
import { Figure } from 'react-plotly.js'

import { FigureConfig } from '@/api/requests/charts/getCharts'

interface ChartInteractiveProps {
  fallbackUntilLoaded: ReactElement
  figure: Figure
  chartHeight: number
  figureConfig?: FigureConfig
}

const ChartInteractiveDynamic = dynamic(() => import('./ChartInteractive'), {
  ssr: false,
})

export default function ChartInteractiveWrapper({
  fallbackUntilLoaded,
  figure,
  chartHeight,
  figureConfig,
}: ChartInteractiveProps) {
  return (
    <Suspense fallback={fallbackUntilLoaded}>
      <ChartInteractiveDynamic
        fallbackUntilLoaded={fallbackUntilLoaded}
        figure={figure}
        chartHeight={chartHeight}
        figureConfig={figureConfig}
      />
    </Suspense>
  )
}
