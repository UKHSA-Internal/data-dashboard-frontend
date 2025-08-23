'use client'

import { useGlobalFilters } from '@/app/context/globalFilterContext'

import { PageSection } from '../PageSections/PageSectionsWithContents'

import TimeseriesFilterCard from './TimeseriesFilterCard'
import SubplotFilterCard from './SubplotFilterCard'


const FilterCards = () => {
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
    return selectedGeographyFilters!.length > 0 && selectedVaccinationFilters!.length > 0;
  }

  return (
    <>
      <PageSection heading="Coverage">
        {
          isChartDataAvailable()
            ? selectedGeographyFilters!
              .map(geography => {
                return (
                  <SubplotFilterCard
                    key={geography.name}
                    geography={geography}
                    dataFilters={selectedVaccinationFilters}
                    geographyFilters={geographyFilters}
                    cardData={coverageTemplateData}
                    timePeriods={timePeriods}
                  />
                )
              })
            : null
        }
      </PageSection>

      <PageSection heading={"Time series"}>
        {
          isChartDataAvailable()
          ? selectedGeographyFilters!.map(geography => {
              return (
                <TimeseriesFilterCard
                  key={geography.name}
                  geography={geography}
                  timePeriods={timePeriods}
                  dataFilters={selectedVaccinationFilters}
                  cardData={timeseriesTemplateData}
                />
              )
            })
            : null
        }
      </PageSection>
    </>
  )
}

export default FilterCards
