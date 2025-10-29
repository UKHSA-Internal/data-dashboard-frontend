import clsx from 'clsx'
import { kebabCase } from 'lodash'
import { z } from 'zod'

import { WithHeadlineNumbersRowCard } from '@/api/models/cms/Page/Body'
import { Card } from '@/app/components/ui/ukhsa'
import { renderBlock } from '@/app/utils/cms.utils'

type HeadlineNumbersRowCardProps = {
  value: z.infer<typeof WithHeadlineNumbersRowCard>
}

export function HeadlineNumbersRowCard({ value }: HeadlineNumbersRowCardProps) {
  return (
    <Card className="ukhsa-headline-numbers-row-card govuk-!-margin-bottom-6" data-testid="headline-row">
      <div
        className={clsx(`grid grid-cols-2 gap-y-6 sm:grid-cols-3 md:gap-x-5`, {
          [`md:grid-cols-5`]: value.columns.length === 5,
        })}
      >
        {value.columns.map((column: z.infer<typeof WithHeadlineNumbersRowCard>['columns'][number]) => (
          <div key={column.id} data-testid={`headline-column-${kebabCase(column.value.title)}`}>
            <h3 className="govuk-body-m mb-2 text-dark-grey md:mb-3">{column.value.title}</h3>
            <div className="flex flex-col gap-y-2 md:gap-y-4">
              {column.value.rows.map((row) => renderBlock({ ...row, date_prefix: column.value.date_prefix }))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
