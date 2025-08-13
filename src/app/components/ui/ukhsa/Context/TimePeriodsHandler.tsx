'use client'

import { useEffect } from 'react'

import { DataFilters, GeographyFilters, ThresholdFilters, TimePeriod } from '@/api/models/cms/Page/GlobalFilter'
import { useTopicBody } from '@/app/components/ui/ukhsa/Context/TopicBodyContext'
import { useGeographyAreasFetcher } from '@/app/hooks/useGeographyAreasFetcher'

interface TimePeriodsHandlerProps {
  timePeriods: TimePeriod[]
  thresholdFilters: ThresholdFilters
  dataFilters: DataFilters
  geographyFilters: GeographyFilters
}

export const TimePeriodsHandler = ({
  timePeriods,
  thresholdFilters,
  dataFilters,
  geographyFilters,
}: TimePeriodsHandlerProps) => {
  const [, actions] = useTopicBody()
  const {
    setTimePeriods,
    setDataFilters,
    setThresholdFilters,
    setGeographyFilters,
    setGeographyAreas,
    setGeographyAreasLoading,
    setGeographyAreasError,
  } = actions

  const { fetchGeographyAreas } = useGeographyAreasFetcher({
    setGeographyAreas,
    setGeographyAreasLoading,
    setGeographyAreasError,
  })

  useEffect(() => {
    // Handle undefined, null, or invalid timePeriods
    if (timePeriods && Array.isArray(timePeriods) && timePeriods.length > 0) {
      setTimePeriods(timePeriods)
    }
  }, [timePeriods, setTimePeriods])
  useEffect(() => {
    // Handle undefined, null, or invalid timePeriods
    if (dataFilters) {
      setDataFilters(dataFilters)
    }
  }, [dataFilters, setDataFilters])
  useEffect(() => {
    // Handle undefined, null, or invalid timePeriods
    if (geographyFilters) {
      setGeographyFilters(geographyFilters)
    }
  }, [geographyFilters, setGeographyFilters])
  useEffect(() => {
    // Handle undefined, null, or invalid timePeriods
    if (thresholdFilters) {
      setThresholdFilters(thresholdFilters)
    }
  }, [thresholdFilters, setThresholdFilters])

  useEffect(() => {
    if (geographyFilters?.geography_types && geographyFilters.geography_types.length > 0) {
      const geographyTypes = geographyFilters.geography_types.map((geographyType) => geographyType.value.geography_type)

      fetchGeographyAreas(geographyTypes)
    }
  }, [])

  return null
}
