/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx'
import { kebabCase } from 'lodash'
import Link from 'next/link'

import { getShowMoreURL } from '@/app/utils/show-more.utils'

import { ChartWithDescriptionCard } from '../ChartWithDescriptionCard/ChartWithDescriptionCard'
import { SimplifiedChartWithLinkCard } from '../SimplifiedChartWithLinkCard/SimplifiedChartWithLinkCard'

type ChartCardSectionProps = {
  value: any
  heading: string
  showMoreSections: string[]
}

export function ChartCardSection({ value, heading, showMoreSections }: ChartCardSectionProps) {
  return (
    <div
      className={clsx('mb-3 grid gap-4 sm:mb-6 ', {
        'md:grid-cols-[1fr_1fr]': value.cards.length <= 2,
        'lg:grid-cols-[1fr_1fr_1fr] md:grid-cols-[1fr_1fr]': value.cards.length > 2,
      })}
    >
      {value.cards.map((card: any, index: number) => {
        if (value.cards.length > 3 && index === 3 && !showMoreSections.includes(kebabCase(heading))) {
          const showMoreURL = getShowMoreURL(showMoreSections, kebabCase(heading))

          return (
            <div key={index}>
              <Link className="govuk-link--no-visited-state bg-fill_arrow_right_blue bg-no-repeat" href={showMoreURL}>
                <span className="pl-4">Show More</span>
              </Link>
            </div>
          )
        }

        if (index > 3 && !showMoreSections.includes(kebabCase(heading))) return null

        if (card.type === 'chart_with_description_card') {
          return (
            <div key={card.id} className="ukhsa-chart-card-section" data-testid="card-wrapper">
              <ChartWithDescriptionCard value={card.value} cardsCount={value.cards.length} />
            </div>
          )
        }

        if (card.type === 'simplified_chart_with_link') {
          return (
            <div key={card.id} className="ukhsa-chart-card-section" data-testid="card-wrapper">
              <SimplifiedChartWithLinkCard value={card.value} cardsCount={value.cards.length} />
            </div>
          )
        }

        return null
      })}
    </div>
  )
}
