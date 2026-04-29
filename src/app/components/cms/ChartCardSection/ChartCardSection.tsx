/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx'
import { kebabCase } from 'lodash'
import Link from 'next/link'

import { getShowMoreURL } from '@/app/utils/show-more.utils'

import { ChartWithDescriptionCard } from '../ChartWithDescriptionCard/ChartWithDescriptionCard'
import { SimplifiedChartWithLinkCard } from '../SimplifiedChartWithLinkCard/SimplifiedChartWithLinkCard'

type ChartCardSectionProps = {
  readonly value: any
  readonly heading: string
  readonly showMoreSections: string[]
}

const SHOW_MORE_SECTION_COLUMNS = 2

export function ChartCardSection({ value, heading, showMoreSections }: ChartCardSectionProps) {
  return (
    <div
      className={clsx('grid gap-4 md:grid-cols-[1fr_1fr]', {
        'lg:grid-cols-[1fr_1fr]': value.cards.length > SHOW_MORE_SECTION_COLUMNS,
      })}
    >
      {value.cards.map((card: any, index: number) => {
        if (
          value.cards.length > SHOW_MORE_SECTION_COLUMNS &&
          index === SHOW_MORE_SECTION_COLUMNS &&
          !showMoreSections.includes(kebabCase(heading))
        ) {
          const showMoreURL = getShowMoreURL(showMoreSections, kebabCase(heading))

          return (
            <div key={index}>
              <Link className="govuk-link--no-visited-state bg-fill_arrow_right_blue bg-no-repeat" href={showMoreURL}>
                <span className="pl-4">Show More</span>
              </Link>
            </div>
          )
        }

        if (index > SHOW_MORE_SECTION_COLUMNS && !showMoreSections.includes(kebabCase(heading))) return null

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
