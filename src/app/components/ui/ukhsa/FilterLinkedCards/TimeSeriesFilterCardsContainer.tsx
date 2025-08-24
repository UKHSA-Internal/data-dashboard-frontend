'use client'

import { useGlobalFilters } from '@/app/context/globalFilterContext'

import ClientInformationCard from '../ClientInformationCard/ClientInformationCard'
import TimeseriesFilterCard from './TimeseriesFilterCard'

const TimeSeriesFilterCardsContainer = () => {
  const { state } = useGlobalFilters()
  const { selectedVaccinationFilters, selectedGeographyFilters, timePeriods, timeseriesTemplateData } = state

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
        <ClientInformationCard
          variant="info"
          title="Chart selection required"
          message="Please make the requried selections from the filter to display a chart."
        />
      )}
    </>
  )
}

export default TimeSeriesFilterCardsContainer
