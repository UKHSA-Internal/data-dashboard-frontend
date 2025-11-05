/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx'
import { kebabCase, snakeCase } from 'lodash'
import Link from 'next/link'

import { Chart } from '@/app/components/cms'
import { Card } from '@/app/components/ui/ukhsa'
import { getPath } from '@/app/utils/cms/slug'
import { getShowMoreURL } from '@/app/utils/show-more.utils'
import { use } from 'react'

type ChartCardSectionProps = {
  value: any
  heading: string
  showMoreSections: string[]
  timeseriesFilter: string
  chartId?: string
}

export function ChartCardSection({
  value,
  heading,
  showMoreSections,
  timeseriesFilter,
  chartId,
}: ChartCardSectionProps) {
  return (
    <div
      className={clsx('mb-3 grid gap-4 sm:mb-6 ', {
        'md:grid-cols-[1fr_1fr]': value.cards.length <= 2,
        'lg:grid-cols-[1fr_1fr_1fr] md:grid-cols-[1fr_1fr]': value.cards.length > 2,
      })}
    >
      {value.cards.map((card: any, index: number) => {
        if (value.cards.length > 3 && index === 3 && !showMoreSections.includes(kebabCase(heading))) {
          const showMoreURL = use(getShowMoreURL(showMoreSections, kebabCase(heading)))

          return (
            <div key={index}>
              <Link className="govuk-link--no-visited-state bg-fill_arrow_right_blue bg-no-repeat" href={showMoreURL}>
                <span className="pl-4">Show More</span>
              </Link>
            </div>
          )
        }

        if (index > 3 && !showMoreSections.includes(kebabCase(heading))) return null

        const topicPagePath = getPath(card.value.topic_page)

        return (
          <div key={card.id} data-testid="card-wrapper">
            <Card
              asChild
              aria-labelledby={`chart-row-card-heading-${snakeCase(card.value.title)}`}
              className="ukhsa-chart-card relative flex flex-col bg-[var(--colour-chart-background)] no-underline transition-colors duration-200 ukhsa-focus hover:bg-[var(--colour-chart-background-hover)] focus:bg-[var(--colour-chart-background-hover)]"
            >
              <Link href={topicPagePath} prefetch>
                <h3 id={`chart-row-card-heading-${snakeCase(card.value.title)}`} className="govuk-heading-m mb-1">
                  {card.value.title}
                </h3>
                <p className="govuk-body-s mb-3 text-grey-1">{card.value.sub_title}</p>

                <div>
                  <Chart
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
  )
}
