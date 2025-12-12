/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx'
import { kebabCase } from 'lodash'
import Link from 'next/link'

import { Chart, ChartRowCardHeader, Download, Timestamp } from '@/app/components/cms'
import About from '@/app/components/cms/About/About'
import { Card, Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/ukhsa'
import { AreaSelectorLoader } from '@/app/components/ui/ukhsa/AreaSelector/AreaSelectorLoader'
import { Table } from '@/app/components/ui/ukhsa/Table/Table'
import DropdownTab from '@/app/components/ui/ukhsa/Tabs/DropdownTab'
import { renderBlock } from '@/app/utils/cms.utils'

type ChartRowCardContentProps = {
  value: any
}

export function ChartRowCardContent({ value }: ChartRowCardContentProps) {
  return (
    <>
      {value.columns.map((column: any) => {
        const size = value.columns.length === 1 ? 'wide' : 'narrow'
        const showAbout = column.value.about && column.value.about.length > 0
        const noRelatedLinks = !column.value.related_links || column.value.related_links.length === 0
        return (
          <div
            key={column.id}
            className={clsx('mb-3 sm:mb-6 lg:mb-0', {
              'lg:w-full': value.columns.length === 1,
              'lg:w-1/2': value.columns.length === 2,
            })}
            data-testid={`chart-row-card-${kebabCase(column.value.title)}`}
          >
            <Card
              asChild
              aria-labelledby={`chart-row-card-heading-${column.id}`}
              className="ukhsa-chart-card flex flex-col gap-6"
            >
              <article>
                <ChartRowCardHeader id={column.id} title={column.value.title} description={column.value.body}>
                  <Timestamp data={column.value} size={size} />
                </ChartRowCardHeader>
                <Tabs defaultValue={`${kebabCase(column.value.title)}-chart`} className="govuk-!-margin-bottom-0">
                  <TabsList className="hidden no-js:block sm:block">
                    <TabsTrigger
                      asChild
                      value={`${kebabCase(column.value.title)}-chart`}
                      aria-controls={`chart-${kebabCase(column.value.title)}-content`}
                    >
                      <Link href={`#chart-${kebabCase(column.value.title)}`}>
                        <span>Chart</span>
                      </Link>
                    </TabsTrigger>
                    <TabsTrigger
                      asChild
                      value={`${kebabCase(column.value.title)}-table`}
                      aria-controls={`table-${kebabCase(column.value.title)}-content`}
                    >
                      <Link href={`#table-${kebabCase(column.value.title)}`}>
                        <span className="govuk-visually-hidden">Tabular data</span>
                        <span aria-hidden>
                          Tabular <span className="hidden lg:inline">data</span>
                        </span>
                      </Link>
                    </TabsTrigger>
                    <TabsTrigger
                      asChild
                      value={`${kebabCase(column.value.title)}-download`}
                      aria-controls={`download-${kebabCase(column.value.title)}-content`}
                    >
                      <Link href={`#download-${kebabCase(column.value.title)}`}>
                        <span>Download</span>
                      </Link>
                    </TabsTrigger>
                    {!showAbout && noRelatedLinks ? null : (
                      <TabsTrigger
                        asChild
                        value={`${kebabCase(column.value.title)}-about`}
                        aria-controls={`about-${kebabCase(column.value.title)}-content`}
                      >
                        <Link href={`#about-${kebabCase(column.value.title)}`}>
                          <span>About</span>
                        </Link>
                      </TabsTrigger>
                    )}
                  </TabsList>
                  <DropdownTab
                    aria-label="Select for selecting chart content"
                    className="govuk-select relative mb-[-1px] block min-w-[7em] rounded-none border border-b-0 border-mid-grey py-0 pl-2 no-js:hidden sm:hidden"
                    tabGroupTitle={column.value.title}
                    defaultValue={`${kebabCase(column.value.title)}-chart`}
                    showAbout={showAbout || !noRelatedLinks ? true : false}
                  />
                  <TabsContent
                    value={`${kebabCase(column.value.title)}-chart`}
                    className="min-h-[var(--ukhsa-chart-card-tab-min-height)] no-js:mb-7"
                    data-type="chart"
                    id={`chart-${kebabCase(column.value.title)}-content`}
                  >
                    <span
                      className="govuk-heading-m govuk-!-margin-top-3 js:hidden"
                      id={`chart-${kebabCase(column.value.title)}`}
                    >
                      Chart
                    </span>
                    {column.type === 'chart_with_headline_and_trend_card' && (
                      <>
                        <div className="ukhsa-headline govuk-!-margin-bottom-4 md:min-h-[79px]">
                          <div className="flex items-start gap-2">
                            {column.value.headline_number_columns?.map((headline_number_columns: any) =>
                              renderBlock({ ...headline_number_columns, date_prefix: column.value.date_prefix })
                            )}
                          </div>
                        </div>
                      </>
                    )}
                    <AreaSelectorLoader>
                      <Chart
                        data={column.value}
                        sizes={[
                          {
                            minWidth: 768,
                            size,
                          },
                          {
                            default: true,
                            size: 'narrow',
                          },
                        ]}
                      />
                    </AreaSelectorLoader>
                  </TabsContent>
                  <TabsContent
                    value={`${kebabCase(column.value.title)}-table`}
                    className="max-h-[var(--ukhsa-chart-card-table-scroll-height)] min-h-[var(--ukhsa-chart-card-tab-min-height)] overflow-y-auto no-js:mb-4"
                    id={`table-${kebabCase(column.value.title)}-content`}
                  >
                    <span
                      className="govuk-heading-m govuk-!-margin-top-3 js:hidden"
                      id={`table-${kebabCase(column.value.title)}`}
                    >
                      Tabular data
                    </span>
                    <Table data={column.value} size={size} />
                  </TabsContent>
                  <TabsContent
                    value={`${kebabCase(column.value.title)}-download`}
                    className="min-h-[var(--ukhsa-chart-card-tab-min-height)]"
                    id={`download-${kebabCase(column.value.title)}-content`}
                  >
                    <span
                      className="govuk-heading-m govuk-!-margin-top-3 js:hidden"
                      id={`download-${kebabCase(column.value.title)}`}
                    >
                      Download
                    </span>
                    <Download data={column.value} />
                  </TabsContent>
                  {!showAbout && noRelatedLinks ? null : (
                    <TabsContent
                      value={`${kebabCase(column.value.title)}-about`}
                      className="min-h-[var(--ukhsa-chart-card-tab-min-height)]"
                      id={`about-${kebabCase(column.value.title)}-content`}
                    >
                      <span
                        className="govuk-heading-m govuk-!-margin-top-3 js:hidden"
                        id={`about-${kebabCase(column.value.title)}`}
                      >
                        About
                      </span>
                      <About description={column.value.about} relatedLinks={column.value.related_links} />
                    </TabsContent>
                  )}
                </Tabs>
              </article>
            </Card>
          </div>
        )
      })}
    </>
  )
}
