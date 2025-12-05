'use client'
import { kebabCase } from 'lodash'
import Link from 'next/link'
import { useState } from 'react'

import {
  DataFilter,
  FilterLinkedSubplotData,
  GeographyFilters,
  ThresholdFilter,
  TimePeriod,
} from '@/api/models/cms/Page/GlobalFilter'
import { GeographiesSchemaObject } from '@/api/requests/geographies/getGeographies'
import About from '@/app/components/cms/About/About'
import { SubplotClientDownload } from '@/app/components/cms/Download/SubplotClientDownload'
import SubplotClientChart from '@/app/components/ui/ukhsa/FilterLinkedCards/components/SubplotChart'
import { SubplotClientTable } from '@/app/components/ui/ukhsa/Table/SubplotClientTable'
import { formatDate } from '@/app/utils/date.utils'
import { FlattenedGeography, getParentGeography } from '@/app/utils/geography.utils'

import { Card } from '../Card/Card'
import DropdownTab from '../Tabs/DropdownTab'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../Tabs/Tabs'

interface SubplotFilterCardProps {
  geography: GeographiesSchemaObject
  selectedVaccinations: DataFilter[]
  selectedThresholds: ThresholdFilter[]
  geographyFilters: GeographyFilters
  timePeriods: TimePeriod[]
  cardData: FilterLinkedSubplotData
  timePeriodTitle: string
}

const SubplotFilterCard = ({
  geography,
  selectedVaccinations,
  selectedThresholds,
  geographyFilters,
  timePeriods,
  cardData,
  timePeriodTitle,
}: SubplotFilterCardProps) => {
  const [currentTimePeriodIndex, setCurrentTimePeriodIndex] = useState(timePeriods.length - 1)
  const [date, setDate] = useState<string | null>(null)
  //FUNCTION FOR HANDLING THE SELECTED TIMEPERIOD/
  const handleTimePeriodChange = (index: number) => {
    setCurrentTimePeriodIndex(index)
  }
  // we need to retrieve date somehow
  const description = date ? `Last Updated ${formatDate(date)}` : ''
  const geographyParent: FlattenedGeography | null = getParentGeography(geography)
  const title = `${cardData.title_prefix} between ${timePeriods[currentTimePeriodIndex].value.label} (${geographyParent!.name}, ${geography.name})`
  const id = title
  const about = cardData.about ? cardData.about : ''

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
              {about && (
                <TabsTrigger
                  asChild
                  value={`${kebabCase(title)}-about`}
                  aria-controls={`about-${kebabCase(title)}-content`}
                >
                  <Link href={`#about-${kebabCase(title)}`}>
                    <span>About</span>
                  </Link>
                </TabsTrigger>
              )}
            </TabsList>
            <DropdownTab
              aria-label="Select for selecting chart content"
              className="govuk-select relative mb-[-1px] block min-w-[7em] rounded-none border border-b-0 border-mid-grey py-0 pl-2 no-js:hidden sm:hidden"
              tabGroupTitle={`${kebabCase(title)}`}
              defaultValue={`${kebabCase(title)}-chart`}
              showAbout={about ? true : false}
              showDownload={true}
            />
            <TabsContent
              value={`${kebabCase(title)}-chart`}
              className="min-h-[var(--ukhsa-chart-card-tab-min-height)] no-js:mb-7"
              data-type="chart"
              id={`chart-${kebabCase(title)}-content`}
            >
              <SubplotClientChart
                currentTimePeriodIndex={currentTimePeriodIndex}
                handleTimePeriodChange={handleTimePeriodChange}
                selectedThresholds={selectedThresholds}
                timePeriods={timePeriods}
                selectedVaccinations={selectedVaccinations}
                geographyFilters={geographyFilters}
                geography={geography}
                cardData={cardData}
                handleLatestDate={setDate}
                timePeriodTitle={timePeriodTitle}
              />
            </TabsContent>
            <TabsContent
              value={`${kebabCase(title)}-table`}
              className="min-h-[var(--ukhsa-chart-card-tab-min-height)] no-js:mb-7"
              data-type="table"
              id={`table-${kebabCase(title)}-content`}
            >
              <SubplotClientTable
                size={'wide'}
                timestamp={date}
                geography={geography}
                geographyFilters={geographyFilters}
                dataFilters={selectedVaccinations}
                selectedThresholds={selectedThresholds}
                timePeriods={timePeriods}
                currentTimePeriodIndex={currentTimePeriodIndex}
                cardData={cardData}
              />
            </TabsContent>
            <TabsContent
              value={`${kebabCase(title)}-download`}
              className="min-h-[var(--ukhsa-chart-card-tab-min-height)] no-js:mb-7"
              data-type="download"
              id={`download-${kebabCase(title)}-content`}
            >
              <SubplotClientDownload
                geography={geography}
                geographyFilters={geographyFilters}
                dataFilters={selectedVaccinations}
                timePeriods={timePeriods}
                currentTimePeriodIndex={currentTimePeriodIndex}
                selectedThresholds={selectedThresholds}
              />
            </TabsContent>
            {about && (
              <TabsContent
                value={`${kebabCase(title)}-about`}
                className="min-h-[var(--ukhsa-chart-card-tab-min-height)]"
                id={`about-${kebabCase(title)}-content`}
              >
                <span className="govuk-heading-m govuk-!-margin-top-3 js:hidden" id={`about-${kebabCase(title)}`}>
                  About
                </span>
                <About content={about} />
              </TabsContent>
            )}
          </Tabs>
        </article>
      </Card>
    </div>
  )
}

export default SubplotFilterCard
