import { useStore } from '@/lib/store'

export const useTabular = (id: string) => {
  // Pick out the charts from the store
  const tabular = useStore((store) => store.tabular)

  // When pre-generating the tabular data, the CMS doesn't provide unique IDs per block
  // so we append the block parent id with the type instead
  const tabularId = `${id}-tabular`

  // Find the chart
  const tabularData = tabular[tabularId]

  // Ensure it exists within our data collection
  if (!tabularData) {
    throw new Error(
      `Missing tabular data ${tabularId}. Either the id is invalid or the data isn't being pre-generated in getStaticProps`
    )
  }

  // Return the chart data when a match is found
  if (tabularData.success) {
    return tabularData.data
  }

  // Otherwise, return null for error handling
  return null
}
