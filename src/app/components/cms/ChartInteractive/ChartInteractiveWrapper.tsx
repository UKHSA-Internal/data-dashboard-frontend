'use client'
import dynamic from 'next/dynamic'
import { ReactElement, Suspense } from 'react'
import { Figure } from 'react-plotly.js'

import { AlternativeAxisConfig } from '@/api/models/Chart'

interface ChartInteractiveProps {
  fallbackUntilLoaded: ReactElement
  figure: Figure
  alternativeAxisConfig?: AlternativeAxisConfig
}

const ChartInteractiveDynamic = dynamic(() => import('./ChartInteractive'), {
  ssr: false,
})

export default function ChartInteractiveWrapper({ fallbackUntilLoaded, ...props }: ChartInteractiveProps) {
  return (
    <Suspense fallback={fallbackUntilLoaded}>
      <ChartInteractiveDynamic fallbackUntilLoaded={fallbackUntilLoaded} {...props} />
    </Suspense>
  )
}
