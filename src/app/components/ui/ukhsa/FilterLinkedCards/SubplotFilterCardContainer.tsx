'use client'

import ClientInformationCard from '@/app/components/ui/ukhsa/ClientInformationCard/ClientInformationCard'
import { useGlobalFilters } from '@/app/context/globalFilterContext'

import SubplotFilterCard from './SubplotFilterCard'

const SubplotFilterCardContainer = () => {
  const { state } = useGlobalFilters()
  const { selectedVaccinationFilters, selectedGeographyFilters, geographyFilters, coverageTemplateData, timePeriods } =
    state

  const isChartDataAvailable = () => {
    return selectedGeographyFilters!.length > 0 && selectedVaccinationFilters!.length > 0
  }

  return (
    <>
      {isChartDataAvailable() ? (
        selectedGeographyFilters!.map((geography) => {
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
    </>
  )
}

export default SubplotFilterCardContainer
