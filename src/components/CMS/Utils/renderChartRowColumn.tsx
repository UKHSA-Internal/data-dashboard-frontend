import { z } from 'zod'
import { WithChartHeadlineAndTrendCard } from '@/api/models/cms/Page'
import { Cards, Blocks } from '@/components/CMS'
import { GridCol, GridRow } from 'govuk-react'

/**
 * This map utility handles rendering individual chart cards within each column for the chart row card.
 */
export const renderChartRowColumn = (column: z.infer<typeof WithChartHeadlineAndTrendCard>['columns'][number]) => {
  const {
    id,
    value: { title, body, headline_number_columns: blocks },
  } = column
  return (
    <Cards.ChartColumn key={id} heading={title} description={body} chart={<Blocks.Chart id={id} />}>
      <GridRow>
        {blocks.map((block) => {
          const {
            type,
            value: { body },
            id,
          } = block
          if (type === 'headline_number') {
            return (
              <GridCol key={id} setDesktopWidth={'one-third'}>
                <Blocks.Headline heading={body} id={id} />
              </GridCol>
            )
          }
          if (type === 'trend_number') {
            return (
              <GridCol key={id} setDesktopWidth={'one-third'}>
                <Blocks.Trend heading={body} id={id} />
              </GridCol>
            )
          }
        })}
      </GridRow>
    </Cards.ChartColumn>
  )
}
