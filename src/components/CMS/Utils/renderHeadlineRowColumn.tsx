import { z } from 'zod'

import { WithHeadlineNumbersRowCard } from '@/api/models/cms/Page'
import { CardColumn } from '@/components/Card'
import { Blocks } from '@/components/CMS'

/**
 * This map utility handles rendering individual columns within the headline row card.
 */
export const renderHeadlineRowColumn = (column: z.infer<typeof WithHeadlineNumbersRowCard>['columns'][number]) => {
  const {
    id,
    value: { title, rows },
  } = column

  return (
    <CardColumn heading={title} key={id} data-testid={`column-${title.toLowerCase()}`}>
      {rows.map(({ value: { body }, id, type }) => {
        if (type === 'headline_number') {
          return <Blocks.Headline key={id} heading={body} id={id} />
        }
        if (type === 'trend_number') {
          return <Blocks.Trend key={id} heading={body} id={id} />
        }
        if (type === 'percentage_number') {
          return <Blocks.Percentage key={id} heading={body} id={id} />
        }
        return null
      })}
    </CardColumn>
  )
}
