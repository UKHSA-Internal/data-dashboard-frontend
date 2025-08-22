'use client'

import { useGlobalFilters } from '@/app/context/globalFilterContext'

import { PageSection } from '../PageSections/PageSectionsWithContents'
import { newCard } from './newFilterCard'

const FilterCards = () => {
  const { state } = useGlobalFilters()
  const {
    filterCoverageChartCards,
    filterTimeSeriesChartCards,
    selectedThresholdFilters,
    selectedVaccinationFilters,
    selectedGeographyFilters,
    timePeriods,
    timeseriesTemplateData,
    coverageTemplateData,
  } = state

  return (
    <>
      <PageSection heading="Coverage">
        {/* TODO: On adding a new card, should update URL params for persistence */}

        {selectedGeographyFilters.length > 0 && selectedVaccinationFilters.length > 0
          ? selectedGeographyFilters.map((geography) => {
              return newCard({
                geography,
                dataFilters: selectedVaccinationFilters,
                timePeriods,
                cardData: timeseriesTemplateData,
              })
            })
          : null}
      </PageSection>
      {/* {filterTimeSeriesChartCards.length > 0 && (
        <PageSection heading="Time Series">
          {filterTimeSeriesChartCards.map(({ id, title, description, chart }) =>
            newCard({ id, title, description, chart })
          )}
        </PageSection>
      )} */}
    </>
  )
}

export default FilterCards
