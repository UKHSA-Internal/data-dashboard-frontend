'use client'

import { useGlobalFilters } from '@/app/context/globalFilterContext'

import { PageSection } from '../PageSections/PageSectionsWithContents'

import TimeseriesFilterCard from './TimeseriesFilterCard'
import SubplotFilterCard from './SubplotFilterCard'

const TimeSeriesFilterCardsContainer = () => {
  const { state } = useGlobalFilters()
  const {
    selectedVaccinationFilters,
    selectedGeographyFilters,
    geographyFilters,
    coverageTemplateData,
    timePeriods,
    timeseriesTemplateData,
  } = state

  const isChartDataAvailable = () => {
    return selectedGeographyFilters!.length > 0 && selectedVaccinationFilters!.length > 0
  }

  return (
    <>
      {isChartDataAvailable() ? (
        selectedGeographyFilters!.map((geography) => {
          return (
            <TimeseriesFilterCard
              key={geography.name}
              geography={geography}
              timePeriods={timePeriods!}
              dataFilters={selectedVaccinationFilters!}
              cardData={timeseriesTemplateData!}
            />
          )
        })
      ) : (
        <div>Charts will be displayed here when filters are selected above.</div>
      )}
    </>
  )
}

export default TimeSeriesFilterCardsContainer
