/* eslint-disable @typescript-eslint/no-explicit-any */
import { snakeCase } from 'lodash'
import Link from 'next/link'

import { Card, Chart } from '@/app/components/ui/ukhsa'
import { getPath } from '@/app/utils/cms/slug'

type SimplifiedChartWithLinkCardProps = {
  value: any
  cardsCount: number
}

export function SimplifiedChartWithLinkCard({ value, cardsCount }: SimplifiedChartWithLinkCardProps) {
  const topicPagePath = getPath(value.topic_page)

  return (
    <Card
      asChild
      aria-labelledby={`chart-row-card-heading-${snakeCase(value.title)}`}
      className="ukhsa-chart-card relative flex flex-col border border-black bg-[var(--colour-home-chart-background)] no-underline transition-colors duration-200 ukhsa-focus hover:bg-[var(--colour-home-chart-background-hover)] focus:border-black focus:bg-[var(--colour-home-chart-background-hover)]"
    >
      <Link href={topicPagePath} prefetch>
        <h3 id={`chart-row-card-heading-${snakeCase(value.title)}`} className="govuk-heading-m mb-1">
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
      </Link>
    </Card>
  )
}
