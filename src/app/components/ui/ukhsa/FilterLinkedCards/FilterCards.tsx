'use client'

import { useGlobalFilters } from '@/app/context/globalFilterContext'

import { PageSection } from '../PageSections/PageSectionsWithContents'
import FilterCard from '@/app/components/ui/ukhsa/FilterLinkedCards/FilterCard'

import TimeseriesFilterCard from './TimeseriesFilterCard'
import SubplotFilterCard from './SubplotFilterCard'

// Move to time series and subplot filter card
import TimeseriesClientChart from '@/app/components/ui/ukhsa/FilterLinkedCards/components/TimeseriesClientChart'
import SubplotClientChart from '@/app/components/ui/ukhsa/FilterLinkedCards/components/SubplotChart'

import { geographiesSchema } from '@/api/requests/geographies/getGeographies'

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

  const selectedUTLAS = selectedGeographyFilters.filter(geography => geography.geography_type === "Upper Tier Local Authority")

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
