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

  return (
    <Card
      asChild
      aria-labelledby={`chart-with-description-card-heading-${snakeCase(value.title)}`}
      className="ukhsa-chart-card relative flex flex-col border border-grey-2 bg-[var(--colour-home-chart-background)] no-underline transition-colors duration-200 ukhsa-focus hover:border-[var(--colour-home-chart-background-hover)] hover:bg-[var(--colour-home-chart-background-hover)] focus:border-grey-2 focus:bg-[var(--colour-home-chart-background-hover)]"
    >
      <Link href={topicPagePath} prefetch>
        <h3 id={`chart-with-description-card-heading-${snakeCase(value.title)}`} className="govuk-heading-m mb-1">
          {value.title}
        </h3>
        <p className="govuk-body-s mb-3 text-grey-1">{value.sub_title}</p>

        <div>
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
        </div>

        {value.description && (
          <p className="govuk-body-s mb-0 mt-3 text-grey-1" data-testid="chart-description">
            {value.description}
            <Link className="govuk-link govuk-link--no-visited-state ml-1" href={topicPagePath} prefetch tabIndex={-1}>
              Visit {value.title} to find out more
            </Link>
          </p>
        )}

        {value.source && value.source.external_url && (
          <p className="govuk-body-s mb-0 mt-3 text-grey-1" data-testid="chart-source">
            Source:
            <Link href={value.source.external_url} prefetch>
              {value.source.link_display_text}
            </Link>
          </p>
        )}
      </Link>
    </Card>
  )
}
