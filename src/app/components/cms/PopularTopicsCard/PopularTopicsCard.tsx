import clsx from 'clsx'
import { snakeCase } from 'lodash'
import Link from 'next/link'
import type { z } from 'zod'

import { PopularTopicsCardValue as popularTopicsCardSchema } from '@/api/models/cms/Page/Body'
import { Card, Chart } from '@/app/components/ui/ukhsa'
import { renderBlock } from '@/app/utils/cms.utils'
import { getPath } from '@/app/utils/cms/slug'

import { ChartWithDescriptionCard } from '../ChartWithDescriptionCard/ChartWithDescriptionCard'
import { Headline } from '../Headline/Headline'
import { Trend } from '../Trend/Trend'
import { WeatherHealthAlertCard } from '../WeatherHealthAlertCard/WeatherHealthAlertCard'

/** CMS popular topics card payload; inferred from zod so it stays aligned with `Body.ts`. */
type PopularTopicsCardData = z.infer<typeof popularTopicsCardSchema>

type PopularTopicsCardProps = {
  readonly value: PopularTopicsCardData
}

export function PopularTopicsCard({ value }: PopularTopicsCardProps) {
  return (
    <div className="govuk-!-margin-bottom-6 grid items-stretch gap-6 lg:grid-cols-2" data-testid="popular-topics-card">
      <div className="flex h-full flex-col gap-6">
        {value.left_column.map((item: PopularTopicsCardData['left_column'][number]) => {
          if (item.type === 'chart_card_with_description') {
            return <ChartWithDescriptionCard key={item.id} value={item.value} cardsCount={2} />
          }
          return (
            <WeatherHealthAlertCard
              key={item.id}
              value={item.value}
              className="mb-0 w-full flex-1 lg:w-full xl:w-full"
            />
          )
        })}
      </div>

      <div className="flex h-full flex-col gap-6">
        {/* Right column: top row (chart cards) + bottom row (headline metric cards) */}
        {value.right_column_top_row.length > 0 && (
          <div
            className={clsx('grid h-full gap-4', {
              'grid-cols-1': value.right_column_top_row.length === 1,
              'md:grid-cols-2': value.right_column_top_row.length >= 2,
            })}
          >
            {value.right_column_top_row.map((card: PopularTopicsCardData['right_column_top_row'][number]) => {
              const topicPagePath = getPath(card.value.topic_page)
              return (
                <Card
                  key={card.id}
                  asChild
                  aria-labelledby={`popular-topic-right-chart-${snakeCase(card.value.title)}`}
                  className="ukhsa-chart-card relative flex h-full flex-col border border-grey-2 bg-[var(--colour-home-chart-background)] no-underline transition-colors duration-200 ukhsa-focus hover:bg-[var(--colour-home-chart-background-hover)] focus:border-grey-2 focus:bg-[var(--colour-home-chart-background-hover)]"
                >
                  <Link href={topicPagePath} prefetch className="flex h-full flex-col">
                    <h3
                      id={`popular-topic-right-chart-${snakeCase(card.value.title)}`}
                      className="govuk-heading-m mb-1 text-blue"
                    >
                      {card.value.title}
                    </h3>
                    {card.value.sub_title && <p className="govuk-body-s mb-3 text-grey-1">{card.value.sub_title}</p>}
                    <div className="mt-auto">
                      <Chart
                        enableInteractive={false}
                        data={card.value as Parameters<typeof Chart>[0]['data']}
                        sizes={[
                          { minWidth: 1200, size: 'third' },
                          { size: 'third', default: true },
                        ]}
                      />
                    </div>
                  </Link>
                </Card>
              )
            })}
          </div>
        )}

        {value.right_column_bottom_row.length > 0 && (
          <div
            className={clsx('grid h-full gap-4', {
              'grid-cols-1': value.right_column_bottom_row.length === 1,
              'md:grid-cols-2': value.right_column_bottom_row.length >= 2,
            })}
          >
            {value.right_column_bottom_row.map((card: PopularTopicsCardData['right_column_bottom_row'][number]) => {
              const topicPagePath = getPath(card.value.topic_page)
              return (
                <Card
                  key={card.id}
                  asChild
                  aria-labelledby={`popular-topic-right-metric-${snakeCase(card.value.title)}`}
                  className="ukhsa-headline-metric-card govuk-!-margin-bottom-0 relative h-full border border-grey-2 bg-[var(--colour-home-chart-background)] no-underline transition-colors duration-200 ukhsa-focus hover:bg-[var(--colour-home-chart-background-hover)] focus:border-grey-2 focus:bg-[var(--colour-home-chart-background-hover)]"
                  data-testid={`headline-metric-card-${card.id}`}
                >
                  <Link href={topicPagePath} prefetch className="flex h-full flex-col">
                    <h3
                      id={`popular-topic-right-metric-${snakeCase(card.value.title)}`}
                      className="govuk-heading-s mb-2 text-blue md:mb-3"
                    >
                      {card.value.title}
                    </h3>
                    <div className="flex flex-col gap-y-2 md:gap-y-4">
                      {card.value.headline_metrics.map(
                        (
                          block: PopularTopicsCardData['right_column_bottom_row'][number]['value']['headline_metrics'][number]
                        ) => (
                          <div key={block.id}>
                            {block.type === 'headline_number' ? (
                              <Headline
                                data={block.value}
                                datePrefix={card.value.date_prefix}
                                headingClassName="govuk-heading-s mb-2 md:mb-3"
                                valueClassName="govuk-!-font-weight-bold govuk-!-font-size-36 text-grey-1"
                              />
                            ) : block.type === 'trend_number' ? (
                              <Trend
                                data={block.value}
                                datePrefix={card.value.date_prefix}
                                headingClassName="text-black"
                              />
                            ) : (
                              renderBlock({
                                ...(block as Record<string, unknown>),
                                date_prefix: card.value.date_prefix,
                              } as Parameters<typeof renderBlock>[0])
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </Link>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
