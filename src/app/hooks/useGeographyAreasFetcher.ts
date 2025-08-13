// hooks/useGeographyAreasFetcher.ts
import { useCallback } from 'react'
import { getGeographies, GeographyResponse, GeographyParams } from '@/api/requests/geographies/getGeographies'

interface UseGeographyAreasFetcherProps {
  setGeographyAreas: (geographyType: string, areas: GeographyResponse) => void
  setGeographyAreasLoading: (loading: boolean) => void
  setGeographyAreasError: (error: string | null) => void
}

export const useGeographyAreasFetcher = ({
  setGeographyAreas,
  setGeographyAreasLoading,
  setGeographyAreasError,
}: UseGeographyAreasFetcherProps) => {
  const fetchGeographyAreas = useCallback(
    async (geographyTypes: string[]) => {
      if (!geographyTypes.length) return

      setGeographyAreasLoading(true)
      setGeographyAreasError(null)

      try {
        const fetchPromises = geographyTypes.map(async (geographyType) => {
          const response = await getGeographies({ geography_type: geographyType })
          console.log('response: ', response)
          if (response.success && response.data) {
            return {
              geographyType,
              areas: response.data as GeographyResponse,
            }
          }

          throw new Error(`Failed to fetch areas for ${geographyType}`)
        })

        const results = await Promise.all(fetchPromises)

        // Store each geography type's areas in state
        results.forEach(({ geographyType, areas }) => {
          setGeographyAreas(geographyType, areas)
        })
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch geography areas'
        console.error('Error fetching geography areas:', error)
        setGeographyAreasError(errorMessage)
      } finally {
        setGeographyAreasLoading(false)
      }
    },
    [setGeographyAreas, setGeographyAreasLoading, setGeographyAreasError]
  )

  return { fetchGeographyAreas }
}
