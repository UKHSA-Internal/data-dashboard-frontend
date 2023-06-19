import { useStore } from '@/lib/store'

export const useHeadline = (id: string) => {
  // Pick out the headlines from the store
  const headlines = useStore((store) => store.headlines)

  const headlineId = `${id}-headlines`

  // Find the headline
  const headlineData = headlines[headlineId]

  // Ensure it exists within our data collection
  if (!headlineData) {
    throw new Error(
      `Missing headline ${headlineId}. Either the id is invalid or the headline isn't being pre-generated in getStaticProps`
    )
  }

  // Return the headline data when a match is found
  if (headlineData.success) {
    return headlineData.data.value
  }

  // Otherwise, return null for error handling
  return null
}
