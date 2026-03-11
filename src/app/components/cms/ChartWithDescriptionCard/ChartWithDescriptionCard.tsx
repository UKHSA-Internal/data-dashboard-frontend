/* eslint-disable @typescript-eslint/no-explicit-any */
import { snakeCase } from 'lodash'
import Link from 'next/link'

import { Card, Chart } from '@/app/components/ui/ukhsa'
import { getPath } from '@/app/utils/cms/slug'

type ChartWithDescriptionCardProps = {
  value: any
  cardsCount: number
}

export function ChartWithDescriptionCard({ value, cardsCount }: ChartWithDescriptionCardProps) {
  const topicPagePath = getPath(value.topic_page)
  const hasSource = value.source && value.source.external_url

  return (
    <div className="group flex h-full flex-col">
      <Card
        asChild
        aria-labelledby={`chart-with-description-card-heading-${snakeCase(value.title)}`}
        className={[
          'ukhsa-chart-card relative flex min-h-0 flex-1 flex-col border border-grey-2 bg-[var(--colour-home-chart-background)] no-underline transition-colors duration-200 ukhsa-focus group-hover:bg-[var(--colour-home-chart-background-hover)] focus:border-grey-2 focus:bg-[var(--colour-home-chart-background-hover)]',
          hasSource && 'border-b-0 pb-2',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <Link href={topicPagePath} prefetch className="flex h-full min-h-0 flex-col">
          <h3 id={`chart-with-description-card-heading-${snakeCase(value.title)}`} className="govuk-heading-m mb-1">
            {value.title}
          </h3>
          <p className="govuk-body-s mb-3 text-grey-1">{value.sub_title}</p>

          <Chart
            enableInteractive={false}
            data={value}
            sizes={[
              {
                minWidth: 1200,
                size: cardsCount < 3 ? 'half' : 'third',
              },
              {
                size: 'third',
                default: true,
              },
            ]}
          />

          {value.description && (
            <p className="govuk-body-s mb-0 mt-3 text-grey-1" data-testid="chart-description">
              {value.description}
              <span className="govuk-link govuk-link--no-visited-state ml-1 text-blue hover:text-dark-blue">
                Visit {value.title} to find out more
              </span>
            </p>
          )}
        </Link>
      </Card>

      {hasSource && (
        <div
          className="border-x border-b border-grey-2 bg-[var(--colour-home-chart-background)] !px-4 !py-2 pb-4 transition-colors duration-200 group-hover:bg-[var(--colour-home-chart-background-hover)]"
          data-testid="chart-source"
        >
          <p className="govuk-body-s mb-0 text-grey-1">
            Source:{' '}
            <Link className="govuk-link govuk-link--no-visited-state" href={value.source.external_url} prefetch>
              {value.source.link_display_text}
            </Link>
          </p>
        </div>
      )}
    </div>
  )
}
