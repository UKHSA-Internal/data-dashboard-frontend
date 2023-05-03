import { useStore } from '@/lib/store'

export const useHeadline = (id: string, position?: 'top' | 'bottom') => {
  // Pick out the headlines from the store
  const headlines = useStore((store) => store.headlines)

  // When pre-generating the headlines, the CMS doesn't provide unique IDs per block
  // so we append the block parent id with the type instead. In some cases, a position
  // is also need for some blocks that share both a parent id and type.
  const headlineId = position ? `${id}-headlines-${position}` : `${id}-headlines`

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
    return headlineData.data
  }

  // Otherwise, return null for error handling
  return null
}
