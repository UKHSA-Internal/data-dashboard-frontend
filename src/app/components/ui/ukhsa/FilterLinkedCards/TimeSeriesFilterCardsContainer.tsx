'use client'

import { useGlobalFilters } from '@/app/features/global-filter/context/globalFilterContext'

import ClientInformationCard from '../ClientInformationCard/ClientInformationCard'
import TimeseriesFilterCard from './TimeseriesFilterCard'

const TimeSeriesFilterCardsContainer = () => {
  const { state } = useGlobalFilters()
  const { selectedVaccinationFilters, selectedGeographyFilters, timePeriods, timeseriesTemplateData } = state

  const isChartDataAvailable = () => {
    return selectedGeographyFilters!.length > 0 && selectedVaccinationFilters!.length > 0
  }

  return (
    <div className="mb-3 sm:mb-6 lg:mb-0 lg:w-full">
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
        <div className="govuk-!-padding-4 bg-grey-3" style={{ minHeight: 300 }}>
          <section
            className="clear-both mb-0 flex items-center justify-center border border-mid-grey bg-white p-3 lg:px-4 lg:py-6"
            style={{ minHeight: 260 }}
          >
            <ClientInformationCard
              variant="info"
              title="Chart selection required"
              message="Please make the required selections from the filter to display a chart."
            />
          </section>
        </div>
      )}
    </div>
  )
}

export default TimeSeriesFilterCardsContainer
