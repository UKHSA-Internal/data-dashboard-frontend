'use client'
import dynamic from 'next/dynamic'
import { ReactElement, Suspense } from 'react'
import { Figure } from 'react-plotly.js'

import { FigureConfig } from '@/api/requests/charts/getCharts'

interface ChartInteractiveProps {
  fallbackUntilLoaded: ReactElement
  figure: Figure
  figure_config?: FigureConfig
}

const ChartInteractiveDynamic = dynamic(() => import('./ChartInteractive'), {
  ssr: false,
})

export default function ChartInteractiveWrapper({ fallbackUntilLoaded, figure, figure_config }: ChartInteractiveProps) {
  return (
    <Suspense fallback={fallbackUntilLoaded}>
      <ChartInteractiveDynamic
        fallbackUntilLoaded={fallbackUntilLoaded}
        figure={figure}
        figure_config={figure_config}
      />
    </Suspense>
  )
}
