import { useStore } from '@/lib/store'

export const usePercentage = (id: string) => {
  // Pick out the percentages from the headlines store
  const percentages = useStore((store) => store.headlines)

  const percentageId = `${id}-percentages`

  // Find the percentage headline
  const headlineData = percentages[percentageId]

  // Ensure it exists within our data collection
  if (!headlineData) {
    throw new Error(
      `Missing percentage ${percentageId}. Either the id is invalid or the percentage isn't being pre-generated in getStaticProps`
    )
  }

  // Return the headline data when a match is found
  if (headlineData.success) {
    return headlineData.data.value
  }

  // Otherwise, return null for error handling
  return null
}
