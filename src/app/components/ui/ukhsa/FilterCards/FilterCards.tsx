'use client'

import { useGlobalFilters } from '@/app/context/globalFilterContext'

import { PageSection } from '../PageSections/PageSectionsWithContents'
import { newCard } from './newFilterCard'

const FilterCards = () => {
  const { state } = useGlobalFilters()
  const { filterCoverageChartCards, filterTimeSeriesChartCards } = state

  return (
    <>
      {filterCoverageChartCards.length > 0 && (
        <PageSection heading="Coverage">
          {/* TODO: On adding a new card, should update URL params for persistence */}
          {filterCoverageChartCards.map(({ id, title, description, chart }) =>
            newCard({ id, title, description, chart })
          )}
        </PageSection>
      )}
      {filterTimeSeriesChartCards.length > 0 && (
        <PageSection heading="Time series">
          {filterTimeSeriesChartCards.map(({ id, title, description, chart }) =>
            newCard({ id, title, description, chart })
          )}
        </PageSection>
      )}
    </>
  )
}

export default FilterCards
