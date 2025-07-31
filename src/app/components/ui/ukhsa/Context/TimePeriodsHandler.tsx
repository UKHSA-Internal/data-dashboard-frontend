'use client'

import { useTopicBody } from '@/app/components/ui/ukhsa/Context/TopicBodyContext'
import { TimePeriod } from '@/api/models/cms/Page/Body'
import { useEffect } from 'react'

interface TimePeriodsHandlerProps {
  timePeriods: TimePeriod[]
}

export const TimePeriodsHandler = ({ timePeriods }: TimePeriodsHandlerProps) => {
  const [, actions] = useTopicBody()
  const { setTimePeriods } = actions

  useEffect(() => {
    if (timePeriods.length > 0) {
      console.log('Setting time periods:', timePeriods)
      setTimePeriods(timePeriods)
    }
  }, [timePeriods, setTimePeriods])

  // This component doesn't render anything visible
  return null
}
