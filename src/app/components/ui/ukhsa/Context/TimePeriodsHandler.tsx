'use client'

import { useEffect } from 'react'

import { DataFilters, GeographyFilters, ThresholdFilters, TimePeriod } from '@/api/models/cms/Page/GlobalFilter'
import { useTopicBody } from '@/app/components/ui/ukhsa/Context/TopicBodyContext'

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
  const { setTimePeriods, setDataFilters, setThresholdFilters, setGeographyFilters } = actions

  useEffect(() => {
    // Handle undefined, null, or invalid timePeriods
    if (timePeriods && Array.isArray(timePeriods) && timePeriods.length > 0) {
      setTimePeriods(timePeriods)
    }
  }, [timePeriods, setTimePeriods])
  useEffect(() => {
    // Handle undefined, null, or invalid timePeriods
    if (dataFilters && Array.isArray(dataFilters) && dataFilters.length > 0) {
      setDataFilters(dataFilters)
    }
  }, [thresholdFilters, setThresholdFilters])
  useEffect(() => {
    // Handle undefined, null, or invalid timePeriods
    if (geographyFilters && Array.isArray(geographyFilters) && geographyFilters.length > 0) {
      setGeographyFilters(geographyFilters)
    }
  }, [geographyFilters, setGeographyFilters])
  useEffect(() => {
    // Handle undefined, null, or invalid timePeriods
    if (thresholdFilters && Array.isArray(thresholdFilters) && thresholdFilters.length > 0) {
      setThresholdFilters(thresholdFilters)
    }
  }, [thresholdFilters, setThresholdFilters])

  return null
}
