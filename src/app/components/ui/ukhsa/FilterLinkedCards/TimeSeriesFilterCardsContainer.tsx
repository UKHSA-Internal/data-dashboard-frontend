'use client'

import { useGlobalFilters } from '@/app/context/globalFilterContext'

import TimeseriesFilterCard from './TimeseriesFilterCard'

const TimeSeriesFilterCardsContainer = () => {
  const { state } = useGlobalFilters()
  const {
    selectedVaccinationFilters,
    selectedGeographyFilters,
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
