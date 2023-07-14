import Link from 'next/link'
import { z } from 'zod'

import { Body, ContentTypes } from '@/api/models/cms/Page'
import { Blocks } from '@/api/models/cms/Page/Blocks'

import { Chart, Headline, Percentage, Trend } from '../components/cms'
import { Timestamp } from '../components/cms/Timestamp/Timestamp'
import { Card } from '../components/ui/ukhsa'

export const renderSection = (section: z.infer<typeof Body>[number]) => {
  return (
    <div key={section.id} className="govuk-!-margin-bottom-9">
      <h2 className="govuk-heading-l govuk-!-margin-bottom-4">
        <Link href={`/choose-topic/${section.value.heading.toLowerCase()}`} className="govuk-link--no-visited-state">
          {section.value.heading}
        </Link>
      </h2>
      {section.value.content.map(renderCard)}
    </div>
  )
}

export const renderCard = (card: z.infer<typeof ContentTypes>) => {
  return (
    <div key={card.id}>
      {card.type === 'text_card' && <div dangerouslySetInnerHTML={{ __html: card.value.body }} />}

      {card.type === 'headline_numbers_row_card' && (
        <Card className="govuk-!-margin-bottom-6">
          <div
            className={`grid grid-cols-2 gap-y-6 sm:grid-cols-3 md:grid-cols-${card.value.columns.length} md:gap-x-5`}
          >
            {card.value.columns.map((column) => {
              return (
                <div key={column.id} className="">
                  <h3 className="govuk-body-m mb-2 text-dark-grey md:mb-3">{column.value.title}</h3>
                  <div className="flex flex-col gap-y-2 md:gap-y-4">{column.value.rows.map(renderBlock)}</div>
                </div>
              )
            })}
          </div>
        </Card>
      )}

      {card.type === 'chart_row_card' && (
        <div className="govuk-grid-row">
          {card.value.columns.map((column) => {
            const size = card.value.columns.length === 1 ? 'wide' : 'narrow'
            return (
              <div key={column.id} className="govuk-grid-column-one-half-from-desktop govuk-!-margin-bottom-6 md:mb-0">
                <Card>
                  <div className="md:min-h-[125px]">
                    <h3 className="govuk-body-m mb-2 text-dark-grey">{column.value.title}</h3>
                    <p className="govuk-heading-m govuk-!-margin-bottom-2 pt-0">{column.value.body}</p>
                    {column.type === 'chart_with_headline_and_trend_card' && (
                      <Timestamp data={column.value} size={size} />
                    )}
                  </div>
                  {column.type === 'chart_with_headline_and_trend_card' && (
                    <>
                      <div className="md:min-h-[54px]">
                        <div className="govuk-!-margin-top-4 flex items-end gap-2">
                          {column.value.headline_number_columns.map(renderBlock)}
                        </div>
                      </div>
                      <Chart data={column.value} size={size} />
                    </>
                  )}
                </Card>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export const renderBlock = (block: z.infer<typeof Blocks>[number]) => {
  return (
    <div key={block.id}>
      {block.type === 'percentage_number' && <Percentage data={block.value} />}
      {block.type === 'headline_number' && <Headline data={block.value} />}
      {block.type === 'trend_number' && <Trend data={block.value} />}
    </div>
  )
}
