'use client'

import { useEffect } from 'react'

import { Vaccination } from '@/api/models/cms/Page/GlobalFilter'
import { useTopicBody } from '@/app/components/ui/ukhsa/Context/TopicBodyContext'

interface VaccinationsHandlerProps {
  vaccinations: Vaccination[]
}

export const VaccinationsHandler = ({ vaccinations }: VaccinationsHandlerProps) => {
  const [, actions] = useTopicBody()
  const { setVaccinations } = actions

  useEffect(() => {
    // Handle undefined, null, or invalid vaccinations
    if (vaccinations && Array.isArray(vaccinations) && vaccinations.length > 0) {
      setVaccinations(vaccinations)
    }
  }, [vaccinations, setVaccinations])

  return null
}
