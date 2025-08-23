'use client'

import { useGlobalFilters } from '@/app/context/globalFilterContext'

import { PageSection } from '../PageSections/PageSectionsWithContents'
import FilterCard from '@/app/components/ui/ukhsa/FilterLinkedCards/FilterCard'

import TimeseriesClientChart from '@/app/components/ui/ukhsa/FilterLinkedCards/components/TimeseriesClientChart'
import SubplotClientChart from '@/app/components/ui/ukhsa/FilterLinkedCards/components/SubplotChart'
import { geographiesSchema } from '@/api/requests/geographies/getGeographies'

const FilterCards = () => {
  const { state } = useGlobalFilters()
  const {
    coverageTemplateData,
    selectedVaccinationFilters,
    selectedGeographyFilters,
    geographyFilters,
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
            ? selectedVaccinationFilters!.map(vaccine => {
              return (
                <FilterCard key={vaccine.value.label}>
                  <SubplotClientChart
                    dataFilters={selectedVaccinationFilters}
                    geographyFilters={geographyFilters}
                    selectedGeographyFilters={selectedGeographyFilters}
                  />
                </FilterCard>
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
                <FilterCard key={geography.name}>
                  <TimeseriesClientChart geography={geography} dataFilters={selectedVaccinationFilters} />
                </FilterCard>
              )
            })
            : null
        }
      </PageSection>
    </>
  )
}

export default FilterCards
