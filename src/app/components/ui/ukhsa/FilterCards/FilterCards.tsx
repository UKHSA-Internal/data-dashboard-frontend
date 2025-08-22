'use client'

import { ClientChart } from '@/app/components/cms/Chart/ClientChart'
import { ClientChartSubplot } from '@/app/components/cms/Chart/ClientChartSubplot'
import { useGlobalFilters } from '@/app/context/globalFilterContext'

import { PageSection } from '../PageSections/PageSectionsWithContents'
import { NewFilterCard } from './NewFilterCard'

const FilterCards = () => {
  const { state } = useGlobalFilters()
  const { filterCoverageChartCards, filterTimeSeriesChartCards } = state

  return (
    <>
    
      {filterCoverageChartCards.length > 0 && (
        <PageSection heading="Coverage">
          {/* TODO: On adding a new card, should update URL params for persistence  */}
          {filterCoverageChartCards.map(({ id, title, description, chart }) =>
            <NewFilterCard  
              key={id}
              id={id}
              title={title}
              description={description}
              chart={chart}
            >
              <ClientChartSubplot
                data={chart}
                sizes={[
                  {
                    minWidth: 768,
                    size: 'wide',
                  },
                ]}
              />
            </NewFilterCard>
          )}
        </PageSection>
      )}

      {filterTimeSeriesChartCards.length > 0 && (
        <PageSection heading="Time series">
          {filterTimeSeriesChartCards.map(({ id, title, description, chart }) =>
            <NewFilterCard  
              key={id}
              id={id}
              title={title}
              description={description}
              chart={chart}
            >
              <ClientChart
                data={chart}
                sizes={[
                  {
                    minWidth: 768,
                    size: 'wide',
                  },
                ]}
              />
            </NewFilterCard>
          )}
        </PageSection>
      )}
    </>
  )
}

export default FilterCards
