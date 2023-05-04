import { useStore } from '@/lib/store'

export const useChart = (id: string) => {
  // Pick out the charts from the store
  const charts = useStore((store) => store.charts)

  // When pre-generating the charts, the CMS doesn't provide unique IDs per block
  // so we append the block parent id with the type instead
  const chartId = `${id}-charts`

  // Find the chart
  const chartData = charts[chartId]

  // Ensure it exists within our data collection
  if (!chartData) {
    throw new Error(
      `Missing chart ${chartId}. Either the id is invalid or the chart isn't being pre-generated in getStaticProps`
    )
  }

  // Return the chart data when a match is found
  if (chartData.success) {
    return chartData.data
  }

  // Otherwise, return null for error handling
  return null
}
