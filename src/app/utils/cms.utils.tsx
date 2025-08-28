import clsx from 'clsx'
import { snakeCase } from 'lodash'
import kebabCase from 'lodash/kebabCase'
import Link from 'next/link'
import { Fragment } from 'react'
import { z } from 'zod'

import { Body, CardTypes, CompositeBody } from '@/api/models/cms/Page'
import { Blocks } from '@/api/models/cms/Page/Blocks'
import { Card, Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/ukhsa'
import { FilterLinkedCardWrapper } from '@/app/components/ui/ukhsa/FilterLinkedCards/FilterLinkedCardWrapper'
import { List } from '@/app/components/ui/ukhsa/List/List'
import { ListItemArrow, ListItemArrowLink, ListItemArrowParagraph } from '@/app/components/ui/ukhsa/List/ListItemArrow'
import { MiniMapCard } from '@/app/components/ui/ukhsa/MiniMap/MiniMapCard'
import { getPath } from '@/app/utils/cms/slug'
import { getShowLessURL, getShowMoreURL } from '@/app/utils/show-more.utils'

import {
  ButtonExternal,
  ButtonInternal,
  Chart,
  ChartRowCard,
  ChartRowCardHeader,
  CodeBlock,
  Download,
  Headline,
  MapCardWrapper,
  MapRowCard,
  Percentage,
  RichText,
  Table,
  Timestamp,
  Trend,
} from '../components/cms'
import About from '../components/cms/About/About'
import { AreaSelectorLoader } from '../components/cms/AreaSelector/AreaSelectorLoader'
import { ListItem } from '../components/ui/ukhsa/List/ListItem'
import DropdownTab from '../components/ui/ukhsa/Tabs/DropdownTab'

/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: Move this file into cms folder
export const renderSection = (
  showMoreSections: string[],
  { id, value: { heading, content, page_link: pageLink } }: z.infer<typeof Body>[number]
) => (
  <div
    id={kebabCase(heading)}
    key={id}
    className="govuk-!-margin-bottom-9 govuk-!-margin-top-4"
    data-testid={`section-${kebabCase(heading)}`}
    role="region"
    aria-label={heading}
  >
    <h2 className="govuk-heading-l govuk-!-margin-bottom-4">
      {pageLink ? (
        <Link href={getPath(pageLink)} className="govuk-link--no-visited-state">
          {heading}
        </Link>
      ) : (
        heading
      )}
    </h2>

    {content.map((item) => renderCard(heading, showMoreSections, '', item))}
    {showMoreSections.includes(kebabCase(heading)) ? (
      <Link
        className="govuk-link--no-visited-state bg-fill_arrow_up_blue bg-no-repeat"
        href={getShowLessURL(showMoreSections, kebabCase(heading))}
        prefetch
      >
        <span className="pl-4">Show Less</span>
      </Link>
    ) : null}
  </div>
)

export const renderCard = (
  heading: string,
  showMoreSections: string[],
  timeseriesFilter: string,
  { type, value, id }: z.infer<typeof CardTypes>,
  chartId?: string
) => {
  return (
    <div key={id}>
      {type === 'text_card' && <div dangerouslySetInnerHTML={{ __html: value.body }} />}

      {type === 'headline_numbers_row_card' && (
        <Card className="ukhsa-headline-numbers-row-card govuk-!-margin-bottom-6" data-testid="headline-row">
          <div
            className={clsx(`grid grid-cols-2 gap-y-6 sm:grid-cols-3 md:gap-x-5`, {
              [`md:grid-cols-5`]: value.columns.length === 5,
            })}
          >
            {value.columns.map((column) => (
              <div key={column.id} data-testid={`headline-column-${kebabCase(column.value.title)}`}>
                <h3 className="govuk-body-m mb-2 text-dark-grey md:mb-3">{column.value.title}</h3>
                <div className="flex flex-col gap-y-2 md:gap-y-4">
                  {column.value.rows.map((row) => renderBlock({ ...row, date_prefix: column.value.date_prefix }))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {type === 'chart_row_card' && (
        <ChartRowCard>
          {value.columns.map((column) => {
            const size = value.columns.length === 1 ? 'wide' : 'narrow'
            const noAbout = !column.value.about || column.value.about.length === 0
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
                        {noAbout && noRelatedLinks ? null : (
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
                        chartTitle={column.value.title}
                        noAbout={noAbout}
                        noDownload={false}
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
                                {column.value.headline_number_columns.map((headline_number_columns) =>
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
                            timeseriesFilter={timeseriesFilter}
                            chartId={chartId ?? ''}
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
                      {noAbout && noRelatedLinks ? null : (
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
        </ChartRowCard>
      )}

      {/* {type === 'global_filter_card' && <FilterBannerWrapper />} */}

      {type === 'filter_linked_map' && (
        <MapRowCard>
          <div key={id} className={clsx('mb-3 sm:mb-6 lg:mb-0', 'lg:w-full')}>
            <article className={'ukhsa-map-card'}>
              <ChartRowCardHeader id={`map-row-heading-${id}`} title={value.title_prefix ? value.title_prefix : ''} />
              <MapCardWrapper />
            </article>
          </div>
        </MapRowCard>
      )}

      {type === 'filter_linked_sub_plot_chart_template' && (
        <div className="mb-3 sm:mb-6 lg:mb-0 lg:w-full">
          <FilterLinkedCardWrapper cardType="subplot" />
        </div>
      )}

      {type === 'filter_linked_time_series_chart_template' && (
        <div className="mb-3 sm:mb-6 lg:mb-0 lg:w-full">
          <FilterLinkedCardWrapper cardType="time-series" />
        </div>
      )}

      {type === 'chart_card_section' && (
        <div
          className={clsx('mb-3 grid gap-4 sm:mb-6 ', {
            'md:grid-cols-[1fr_1fr]': value.cards.length <= 2,
            'lg:grid-cols-[1fr_1fr_1fr] md:grid-cols-[1fr_1fr]': value.cards.length > 2,
          })}
        >
          {value.cards.map((card: any, index: any) => {
            if (value.cards.length > 3 && index == 3 && !showMoreSections.includes(kebabCase(heading))) {
              return (
                <div key={index}>
                  <Link
                    className="govuk-link--no-visited-state bg-fill_arrow_right_blue bg-no-repeat"
                    href={getShowMoreURL(showMoreSections, kebabCase(heading))}
                  >
                    <span className="pl-4">Show More</span>
                  </Link>
                </div>
              )
            }

            if (index > 3 && !showMoreSections.includes(kebabCase(heading))) return

            return (
              <div key={card.id} data-testid="card-wrapper">
                <Card
                  asChild
                  aria-labelledby={`chart-row-card-heading-${snakeCase(card.value.title)}`}
                  className="ukhsa-chart-card relative flex flex-col bg-[var(--colour-chart-background)] no-underline transition-colors duration-200 ukhsa-focus hover:bg-[var(--colour-chart-background-hover)] focus:bg-[var(--colour-chart-background-hover)]"
                >
                  <Link href={getPath(card.value.topic_page)} prefetch>
                    <h3 id={`chart-row-card-heading-${snakeCase(card.value.title)}`} className="govuk-heading-m mb-1">
                      {card.value.title}
                    </h3>
                    <p className="govuk-body-s mb-3 text-grey-1">{card.value.sub_title}</p>

                    <div>
                      <Chart
                        // Disable on landing page
                        enableInteractive={false}
                        data={card.value}
                        sizes={[
                          {
                            minWidth: 1200,
                            size: value.cards.length < 3 ? 'half' : 'third',
                          },
                          {
                            size: 'third',
                            default: true,
                          },
                        ]}
                        timeseriesFilter={timeseriesFilter}
                        chartId={chartId ?? ''}
                      />
                    </div>
                  </Link>
                </Card>
              </div>
            )
          })}
        </div>
      )}

      {type === 'weather_health_alert_card' && (
        <div className="mb-3 sm:mb-6 lg:mb-0 lg:w-1/2">
          <MiniMapCard title={value.title} subTitle={value.sub_title} alertType={value.alert_type} />
        </div>
      )}
    </div>
  )
}

export const renderBlock = ({
  id,
  type,
  value,
  date_prefix,
}: z.infer<typeof Blocks>[number] & { date_prefix: string }) => (
  <div key={id}>
    {type === 'percentage_number' && <Percentage data={value} datePrefix={date_prefix} />}
    {type === 'headline_number' && <Headline data={value} datePrefix={date_prefix} />}
    {type === 'trend_number' && <Trend data={value} datePrefix={date_prefix} />}
  </div>
)

export const renderCompositeBlock = ({ id, type, value }: CompositeBody[number]) => (
  <Fragment key={id}>
    {type === 'text' && <RichText>{value}</RichText>}

    {type === 'internal_button' && (
      <ButtonInternal
        id={id}
        label={value.text}
        endpoint={value.endpoint}
        method={value.method}
        variant={value.button_type}
        className="govuk-!-margin-bottom-6"
      />
    )}

    {type === 'external_button' && (
      <ButtonExternal
        label={value.text}
        href={value.url}
        icon={value.icon}
        type={value.button_type}
        className="govuk-!-margin-bottom-6"
      />
    )}

    {type === 'code_block' && (
      <>
        {value.heading && <h4 className="govuk-heading-m">{value.heading}</h4>}
        <CodeBlock language={value.content[0].value.language}>{value.content[0].value.code}</CodeBlock>
      </>
    )}

    {type === 'internal_page_links' && value && value.length > 0 && (
      <List>
        <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
        {value.map(({ id, value }) => (
          <ListItem key={id} spacing="m">
            <ListItemArrow>
              <ListItemArrowLink href={getPath(value.page)}>{value.title}</ListItemArrowLink>
              <ListItemArrowParagraph>{value.sub_title}</ListItemArrowParagraph>
            </ListItemArrow>
          </ListItem>
        ))}
      </List>
    )}
  </Fragment>
)
