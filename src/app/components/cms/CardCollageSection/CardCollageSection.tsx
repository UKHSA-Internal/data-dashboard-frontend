/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx'
import { snakeCase } from 'lodash'
import Link from 'next/link'

import { Card, Chart } from '@/app/components/ui/ukhsa'
import { renderBlock } from '@/app/utils/cms.utils'
import { getPath } from '@/app/utils/cms/slug'

type CardCollageSectionProps = {
  value: any
  heading: string
  showMoreSections: string[]
}

export function CardCollageSection({ value, heading: _heading, showMoreSections: _showMoreSections }: CardCollageSectionProps) {
  const columns = value.columns || []
  const columnCount = columns.length

  // Determine grid columns based on number of columns (2 or 3)
  const gridColsClass = clsx('mb-3 grid gap-4 sm:mb-6', {
    'md:grid-cols-[1fr_1fr]': columnCount === 2,
    'lg:grid-cols-[1fr_1fr_1fr] md:grid-cols-[1fr_1fr]': columnCount === 3,
  })

  return (
    <div className={gridColsClass}>
      {columns.map((column: any) => {
        const columnValue = column.value

        // Handle chart card column
        if (columnValue.type === 'chart_card') {
          const topicPagePath = getPath(columnValue.value.topic_page)

          return (
            <div key={column.id} data-testid="card-wrapper">
              <Card
                asChild
                aria-labelledby={`chart-row-card-heading-${snakeCase(columnValue.value.title)}`}
                className="ukhsa-chart-card relative flex flex-col bg-[var(--colour-chart-background)] no-underline transition-colors duration-200 ukhsa-focus hover:bg-[var(--colour-chart-background-hover)] focus:bg-[var(--colour-chart-background-hover)]"
              >
                <Link href={topicPagePath} prefetch>
                  <h3
                    id={`chart-row-card-heading-${snakeCase(columnValue.value.title)}`}
                    className="govuk-heading-m mb-1"
                  >
                    {columnValue.value.title}
                  </h3>
                  <p className="govuk-body-s mb-3 text-grey-1">{columnValue.value.sub_title}</p>

                  <div>
                    <Chart
                      enableInteractive={false}
                      data={columnValue.value}
                      sizes={[
                        {
                          minWidth: 1200,
                          size: columnCount === 2 ? 'half' : 'third',
                        },
                        {
                          size: columnCount === 2 ? 'half' : 'third',
                          default: true,
                        },
                      ]}
                    />
                  </div>
                </Link>
              </Card>
            </div>
          )
        }

        // Handle headline components column
        if (columnValue.type === 'headline_components') {
          return (
            <div key={column.id} data-testid="headline-components-wrapper">
              <Card className="ukhsa-chart-card relative flex flex-col bg-[var(--colour-chart-background)]">
                <div className="flex flex-col gap-y-4">
                  {columnValue.value.components.map((component: any) =>
                    renderBlock({ ...component, date_prefix: columnValue.value.date_prefix })
                  )}
                </div>
              </Card>
            </div>
          )
        }

        return null
      })}
    </div>
  )
}
