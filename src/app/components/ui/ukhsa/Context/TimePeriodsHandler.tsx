'use client'

import { useTopicBody } from '@/app/components/ui/ukhsa/Context/TopicBodyContext'
import { TimePeriod } from '@/api/models/cms/Page/GlobalFilter'
import { useEffect } from 'react'

interface TimePeriodsHandlerProps {
  timePeriods: TimePeriod[]
}

export const TimePeriodsHandler = ({ timePeriods }: TimePeriodsHandlerProps) => {
  const [, actions] = useTopicBody()
  const { setTimePeriods } = actions

  useEffect(() => {
    // Handle undefined, null, or invalid timePeriods
    if (timePeriods && Array.isArray(timePeriods) && timePeriods.length > 0) {
      setTimePeriods(timePeriods)
    }
  }, [timePeriods, setTimePeriods])

  return null
}
