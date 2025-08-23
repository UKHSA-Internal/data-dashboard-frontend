'use client'
import { useState } from 'react'

import { kebabCase } from 'lodash'
import Link from 'next/link'

import { MinMaxFullDate, getMinMaxYears, getMinMaxFullDate, MinMaxYear } from '@/app/utils/time-period.utils'
import { getParentGeography, GeographyParent } from '@/app/utils/geography.utils'

import { Card } from '../Card/Card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../Tabs/Tabs'

import SubplotClientChart from '@/app/components/ui/ukhsa/FilterLinkedCards/components/SubplotChart'

const SubplotFilterCard = ({ geography, dataFilters, geographyFilters, timePeriods, cardData }) => {
  const [currentTimePeriodIndex, setCurrentTimePeriodIndex] = useState(timePeriods.length - 2)
  //FUNCTION FOR HANDLING THE SELECTED TIMEPERIOD/
  const handleTimePeriodChange = (index: number) => {
    setCurrentTimePeriodIndex(index)
  }

  const description = "testing testing 123"

  const minMaxDateRange: MinMaxYear = getMinMaxYears(timePeriods)
  const geographyParent: GeographyParent | null = getParentGeography(geography)
  const title = `${cardData.title_prefix} between ${minMaxDateRange.minDate} - ${minMaxDateRange.maxDate} (${geographyParent!.geography_name}, ${geography.name})`
  const id = title

 return (
    <div key={id} className="mb-4">
      <Card asChild aria-labelledby={`chart-row-card-heading-${id}`} className="ukhsa-chart-card flex flex-col gap-6">
        <article>
          <header>
            <h3 id={`chart-row-card-heading-${id}`} className="govuk-heading-m mb-2 font-bold">
              {title}
            </h3>
            <p className="govuk-body-s govuk-!-margin-bottom-2 pt-0 italic text-dark-grey">{description}</p>
          </header>

          <Tabs defaultValue={`${kebabCase(title)}-chart`} className="govuk-!-margin-bottom-0">
            <TabsList className="hidden no-js:block sm:block">
              <TabsTrigger
                asChild
                value={`${kebabCase(title)}-chart`}
                aria-controls={`chart-${kebabCase(title)}-content`}
              >
                <Link href={`#chart-${kebabCase(title)}`}>
                  <span>Chart</span>
                </Link>
              </TabsTrigger>
              <TabsTrigger
                asChild
                value={`${kebabCase(title)}-table`}
                aria-controls={`table-${kebabCase(title)}-content`}
              >
                <Link href={`#table-${kebabCase(title)}`}>
                  <span className="govuk-visually-hidden">Tabular data</span>
                  <span aria-hidden>
                    Tabular <span className="hidden lg:inline">data</span>
                  </span>
                </Link>
              </TabsTrigger>
              <TabsTrigger
                asChild
                value={`${kebabCase(title)}-download`}
                aria-controls={`download-${kebabCase(title)}-content`}
              >
                <Link href={`#download-${kebabCase(title)}`}>
                  <span>Download</span>
                </Link>
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value={`${kebabCase(title)}-chart`}
              className="min-h-[var(--ukhsa-chart-card-tab-min-height)] no-js:mb-7"
              data-type="chart"
              id={`chart-${kebabCase(title)}-content`}
            >

              <h1>{cardData.legend_title}</h1>

              <SubplotClientChart
                currentTimePeriodIndex={currentTimePeriodIndex}
                handleTimePeriodChange={handleTimePeriodChange}
                timePeriods={timePeriods}
                dataFilters={dataFilters}
                geographyFilters={geographyFilters}
                geography={geography}
              />

            </TabsContent>
            <TabsContent
              value={`${kebabCase(title)}-table`}
              className="min-h-[var(--ukhsa-chart-card-tab-min-height)] no-js:mb-7"
              data-type="table"
              id={`table-${kebabCase(title)}-content`}
            >
              Table content
            </TabsContent>
            <TabsContent
              value={`${kebabCase(title)}-download`}
              className="min-h-[var(--ukhsa-chart-card-tab-min-height)] no-js:mb-7"
              data-type="download"
              id={`download-${kebabCase(title)}-content`}
            >
              Download content
            </TabsContent>
          </Tabs>
        </article>
      </Card>
    </div>
  )
}

export default SubplotFilterCard
