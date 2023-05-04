import { useStore } from '@/lib/store'

export const useTrend = (id: string) => {
  // Pick out the trends from the store
  const trends = useStore((store) => store.trends)

  // When pre-generating the trends, the CMS doesn't provide unique IDs per block
  // so we append the block parent id with the type instead
  const trendId = `${id}-trends`

  // Find the trend
  const trendData = trends[trendId]

  // Ensure it exists within our data collection
  if (!trendData) {
    throw new Error(
      `Missing trend ${trendId}. Either the id is invalid or the trend isn't being pre-generated in getStaticProps`
    )
  }

  // Return the trend data when a match is found
  if (trendData.success) {
    return trendData.data
  }

  // Otherwise, return null for error handling
  return null
}
