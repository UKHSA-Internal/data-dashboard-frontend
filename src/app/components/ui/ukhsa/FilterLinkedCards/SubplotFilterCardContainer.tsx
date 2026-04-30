'use client'

import { DataClassification } from '@/api/models/DataClassification'
import ClientInformationCard from '@/app/components/ui/ukhsa/ClientInformationCard/ClientInformationCard'
import { useGlobalFilters } from '@/app/features/global-filter/context/globalFilterContext'

import ClassificationBanner from '../ClassificationBanner/ClassificationBanner'
import SubplotFilterCard from './SubplotFilterCard'

type SubplotFilterCardContainerProps = {
  isNonPublic?: boolean
  dataClassification?: DataClassification
}

const SubplotFilterCardContainer = ({ isNonPublic, dataClassification }: SubplotFilterCardContainerProps) => {
  const { state } = useGlobalFilters()
  const {
    selectedVaccinationFilters,
    selectedGeographyFilters,
    geographyFilters,
    coverageTemplateData,
    timePeriods,
    selectedThresholdFilters,
    timePeriodTitle,
  } = state

  const geographies = selectedGeographyFilters ?? []
  const vaccinations = selectedVaccinationFilters ?? []
  const thresholds = selectedThresholdFilters ?? []
  const periods = timePeriods ?? []
  const periodTitle = timePeriodTitle ?? ''
  const hasChartData = geographies.length > 0 && vaccinations.length > 0
  const showChartSelectionInfo = !hasChartData || !geographyFilters || !coverageTemplateData

  return (
    <div className="mb-3 sm:mb-6 lg:mb-0 lg:w-full">
      {isNonPublic && <ClassificationBanner size="medium" level={dataClassification} />}
      {showChartSelectionInfo ? (
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
      ) : (
        geographies.map((geography) => (
          <SubplotFilterCard
            key={`${geography.geography_code}-subplot`}
            geography={geography}
            selectedThresholds={thresholds}
            selectedVaccinations={vaccinations}
            geographyFilters={geographyFilters}
            cardData={coverageTemplateData}
            timePeriods={periods}
            timePeriodTitle={periodTitle}
            isNonPublic={isNonPublic}
            dataClassification={dataClassification}
          />
        ))
      )}
    </div>
  )
}

export default SubplotFilterCardContainer
