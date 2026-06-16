/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx'
import { snakeCase } from 'lodash'
import Link from 'next/link'

import { hasSource, SourceFooter } from '@/app/components/cms/SourceFooter/SourceFooter'
import { Card, Chart } from '@/app/components/ui/ukhsa'
import { getPath } from '@/app/utils/cms/slug'

type ChartWithDescriptionCardProps = {
  readonly value: any
}

export function ChartWithDescriptionCard({ value }: ChartWithDescriptionCardProps) {
  const topicPagePath = getPath(value.topic_page)
  const showSource = hasSource(value.source)

  return (
    <div className="group flex h-full flex-col">
      <Card
        asChild
        aria-labelledby={`chart-with-description-card-heading-${snakeCase(value.title)}`}
        className={clsx(
          'ukhsa-chart-card relative flex min-h-0 flex-1 flex-col border border-grey-2 bg-[var(--colour-home-chart-background)] no-underline transition-colors duration-200 ukhsa-focus focus:border-grey-2 focus:bg-[var(--colour-home-chart-background-hover)] group-hover:bg-[var(--colour-home-chart-background-hover)]',
          showSource && 'border-b-0 pb-2'
        )}
      >
        <Link href={topicPagePath} prefetch className="flex h-full min-h-0 flex-col">
          <h3
            id={`chart-with-description-card-heading-${snakeCase(value.title)}`}
            className="govuk-heading-m mb-1 text-blue"
          >
            {value.title}
          </h3>
          <p className="govuk-body-s mb-5 text-grey-1">{value.sub_title}</p>

          <Chart
            enableInteractive={false}
            data={value}
            sizes={[
              {
                size: 'half',
                default: true,
              },
            ]}
          />

          {value.description && (
            <p className="govuk-body-s mb-0 mt-5 text-grey-1" data-testid="chart-description">
              {value.description}
              <span className="govuk-link govuk-link--no-visited-state ml-1 text-blue hover:text-dark-blue">
                Visit {value.title} to find out more
              </span>
            </p>
          )}
        </Link>
      </Card>

      <SourceFooter
        source={value.source}
        className="border-x border-b border-grey-2 bg-[var(--colour-home-chart-background)] !px-4 !py-2 pb-4 transition-colors duration-200 group-hover:bg-[var(--colour-home-chart-background-hover)]"
        testId="chart-source"
      />
    </div>
  )
}
