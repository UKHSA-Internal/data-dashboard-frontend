import { kebabCase } from 'lodash'
import Link from 'next/link'

import { DataFilter, FilterLinkedTimeSeriesData, TimePeriod } from '@/api/models/cms/Page/GlobalFilter'
import { GeographiesSchemaObject } from '@/api/requests/geographies/getGeographies'
import { ClientTable } from '@/app/components/cms/Table/ClientTable'
import TimeseriesClientChart from '@/app/components/ui/ukhsa/FilterLinkedCards/components/TimeseriesClientChart'
import DropdownTab from '@/app/components/ui/ukhsa/Tabs/DropdownTab'
import { FlattenedGeography, getParentGeography } from '@/app/utils/geography.utils'
import { getMinMaxYears, MinMaxYear } from '@/app/utils/time-period.utils'

import { Card } from '../Card/Card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../Tabs/Tabs'

interface TimeseriesFilterCardProps {
  geography: GeographiesSchemaObject
  timePeriods: TimePeriod[]
  dataFilters: DataFilter[]
  cardData: FilterLinkedTimeSeriesData
  chartId?: string
}

const TimeseriesFilterCard = ({ geography, timePeriods, dataFilters, cardData }: TimeseriesFilterCardProps) => {
  const date = ''
  const description = `Last Updated ${date}`

  const minMaxDateRange: MinMaxYear = getMinMaxYears(timePeriods)
  const geographyParent: FlattenedGeography | null = getParentGeography(geography)
  const title = `${cardData.title_prefix} between ${minMaxDateRange.minDate} - ${minMaxDateRange.maxDate} (${geographyParent!.name}, ${geography.name})`
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
              {/* <TabsTrigger
                asChild
                value={`${kebabCase(title)}-download`}
                aria-controls={`download-${kebabCase(title)}-content`}
              >
                <Link href={`#download-${kebabCase(title)}`}>
                  <span>Download</span>
                </Link>
              </TabsTrigger> */}
            </TabsList>
            <DropdownTab
              aria-label="Select for selecting chart content"
              className="govuk-select relative mb-[-1px] block min-w-[7em] rounded-none border border-b-0 border-mid-grey py-0 pl-2 no-js:hidden sm:hidden"
              chartTitle={`${kebabCase(title)}`}
              noAbout={true}
            />
            <TabsContent
              value={`${kebabCase(title)}-chart`}
              className="min-h-[var(--ukhsa-chart-card-tab-min-height)] no-js:mb-7"
              data-type="chart"
              id={`chart-${kebabCase(title)}-content`}
            >
              <h1>{cardData.legend_title}</h1>
              <TimeseriesClientChart geography={geography} dataFilters={dataFilters} timePeriods={timePeriods} />
            </TabsContent>
            <TabsContent
              value={`${kebabCase(title)}-table`}
              className="min-h-[var(--ukhsa-chart-card-tab-min-height)] no-js:mb-7"
              data-type="table"
              id={`table-${kebabCase(title)}-content`}
            >
              <ClientTable geography={geography} dataFilters={dataFilters} timePeriods={timePeriods} size={'wide'} />
            </TabsContent>
            {/* <TabsContent
              value={`${kebabCase(title)}-download`}
              className="min-h-[var(--ukhsa-chart-card-tab-min-height)] no-js:mb-7"
              data-type="download"
              id={`download-${kebabCase(title)}-content`}
            >
              Download content
            </TabsContent> */}
          </Tabs>
        </article>
      </Card>
    </div>
  )
}

export default TimeseriesFilterCard
