'use client'
import dynamic from 'next/dynamic'

interface ChartInteractiveProps {
  staticChart: React.ReactElement
  figure: any
}

const ChartInteractive = ({ staticChart, figure }: ChartInteractiveProps) => {
  const DynamicChart = dynamic(() => import('../ChartInteractive/ChartInteractive'), {
    ssr: false,
    loading: () => <>{staticChart}</>,
  })

  return <DynamicChart fallbackUntilLoaded={staticChart} figure={figure} />
}

export default ChartInteractive
