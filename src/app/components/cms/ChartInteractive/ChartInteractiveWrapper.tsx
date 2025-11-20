'use client'
import dynamic from 'next/dynamic'
import { ReactElement, Suspense } from 'react'
import { Figure } from 'react-plotly.js'

interface ChartInteractiveProps {
  fallbackUntilLoaded: ReactElement
  figure: Figure
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
