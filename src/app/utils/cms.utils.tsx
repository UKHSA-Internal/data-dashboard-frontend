import clsx from 'clsx'
import Link from 'next/link'
import { z } from 'zod'

import { Body, ContentTypes } from '@/api/models/cms/Page'
import { Blocks } from '@/api/models/cms/Page/Blocks'

import { Chart, Headline, Percentage, Table, Trend } from '../components/cms'
import { Timestamp } from '../components/cms/Timestamp/Timestamp'
import { Details } from '../components/ui/govuk'
import { Card } from '../components/ui/ukhsa'

export const renderSection = ({ id, value: { heading, content } }: z.infer<typeof Body>[number]) => (
  <div key={id} className="govuk-!-margin-bottom-9">
    <h2 className="govuk-heading-l govuk-!-margin-bottom-4">
      <Link href={`/choose-topic/${heading.toLowerCase()}`} className="govuk-link--no-visited-state">
        {heading}
      </Link>
    </h2>
    {content.map(renderCard)}
  </div>
)

export const renderCard = ({ id, type, value }: z.infer<typeof ContentTypes>) => (
  <div key={id}>
    {type === 'text_card' && <div dangerouslySetInnerHTML={{ __html: value.body }} />}

    {type === 'headline_numbers_row_card' && (
      <Card className="govuk-!-margin-bottom-6">
        <div
          className={clsx(`grid grid-cols-2 gap-y-6 sm:grid-cols-3 md:gap-x-5`, {
            [`md:grid-cols-5`]: value.columns.length === 5,
          })}
        >
          {value.columns.map((column) => (
            <div key={column.id}>
              <h3 className="govuk-body-m mb-2 text-dark-grey md:mb-3">{column.value.title}</h3>
              <div className="flex flex-col gap-y-2 md:gap-y-4">{column.value.rows.map(renderBlock)}</div>
            </div>
          ))}
        </div>
      </Card>
    )}

    {type === 'chart_row_card' && (
      <div className="govuk-grid-row">
        {value.columns.map((column) => {
          const size = value.columns.length === 1 ? 'wide' : 'narrow'
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
                    <Details label="View data in a tabular format">
                      <Table data={column.value} size={size} />
                    </Details>
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

export const renderBlock = ({ id, type, value }: z.infer<typeof Blocks>[number]) => (
  <div key={id}>
    {type === 'percentage_number' && <Percentage data={value} />}
    {type === 'headline_number' && <Headline data={value} />}
    {type === 'trend_number' && <Trend data={value} />}
  </div>
)
