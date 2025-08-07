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

  console.log('entered timePeriodsHandler')
  console.log('timePeriods', timePeriods)
  console.log('thresholdFilters', thresholdFilters)
  console.log('dataFilters', dataFilters)
  console.log('geographyFilters', geographyFilters)

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
    console.log('thresholdFilters in useEffect', thresholdFilters)
    // Handle undefined, null, or invalid timePeriods
    if (thresholdFilters) {
      console.log('thresholdFilters', thresholdFilters)
      setThresholdFilters(thresholdFilters)
    }
  }, [thresholdFilters, setThresholdFilters])

  return null
}
