'use client'
import dynamic from 'next/dynamic'

const ChartInteractive = (staticChart: any) => {
  return dynamic(() => import('../ChartInteractive/ChartInteractive'), {
    ssr: false,
    loading: () => staticChart, // Show the static svg chart whilst this chunk is being loaded
  })
}

export default ChartInteractive
