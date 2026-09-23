'use client'

import { ReactElement, useState } from 'react'
import Plot, { Figure } from 'react-plotly.js'
import { useIntersectionObserver } from 'usehooks-ts'

import { AlternativeAxisConfig } from '@/api/models/Chart'

interface ChartInteractiveProps {
  fallbackUntilLoaded: ReactElement
  figure: Figure
  alternativeAxisConfig?: AlternativeAxisConfig
}

const logAlternativeAxisConfig = (alternativeAxisConfig?: AlternativeAxisConfig) => {
  const isPresent = alternativeAxisConfig != null
  console.log('alternative_axis_config present in API response:', isPresent)
  if (isPresent) {
    console.log('alternative_axis_config:', alternativeAxisConfig)
  }
}

export default function ChartInteractive({
  fallbackUntilLoaded,
  figure: { data, layout },
  alternativeAxisConfig,
}: ChartInteractiveProps) {
  const [loaded, setLoaded] = useState(false)

  logAlternativeAxisConfig(alternativeAxisConfig)

  const { isIntersecting, ref } = useIntersectionObserver({
    freezeOnceVisible: true,
  })

  return (
    <div ref={ref}>
      {!loaded ? fallbackUntilLoaded : null}
      {isIntersecting ? (
        <Plot
          onInitialized={() => setLoaded(true)}
          data={data}
          layout={layout}
          style={{ width: '100%', height: '100%' }}
          config={{
            displayModeBar: false,
            scrollZoom: false,
            responsive: true,
          }}
          useResizeHandler
        />
      ) : null}
    </div>
  )
}
