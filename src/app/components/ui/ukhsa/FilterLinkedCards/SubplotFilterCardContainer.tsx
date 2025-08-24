'use client'

import { useGlobalFilters } from '@/app/context/globalFilterContext'

import SubplotFilterCard from './SubplotFilterCard'

const SubplotFilterCardContainer = () => {
  const { state } = useGlobalFilters()
  const {
    selectedVaccinationFilters,
    selectedGeographyFilters,
    geographyFilters,
    coverageTemplateData,
    timePeriods,
  } = state

  const isChartDataAvailable = () => {
    return selectedGeographyFilters!.length > 0 && selectedVaccinationFilters!.length > 0
  }

  return (
    <>
      {isChartDataAvailable()
        ? selectedGeographyFilters!.map((geography) => {
            return (
              <SubplotFilterCard
                key={geography.name}
                geography={geography}
                selectedVaccinations={selectedVaccinationFilters!}
                geographyFilters={geographyFilters!}
                cardData={coverageTemplateData!}
                timePeriods={timePeriods!}
              />
            )
          })
        : null}
    </>
  )
}

export default SubplotFilterCardContainer
