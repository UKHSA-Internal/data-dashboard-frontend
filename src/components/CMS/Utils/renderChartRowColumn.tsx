import { z } from 'zod'
import { ChartRowColumns } from '@/api/models/cms/Page'
import { Cards, Blocks } from '@/components/CMS'
import { GridCol, GridRow } from 'govuk-react'

/**
 * This map utility handles rendering individual chart cards within each column for the chart row card.
 */
export const renderChartRowColumn = (column: z.infer<typeof ChartRowColumns>[number]) => {
  const {
    id,
    type,
    value: { title, body },
  } = column

  if (type === 'chart_with_headline_and_trend_card') {
    const {
      value: { headline_number_columns: blocks },
    } = column

    return (
      <Cards.ChartColumn
        key={id}
        heading={title}
        description={body}
        chart={<Blocks.Chart id={id} />}
        cardProps={{ 'data-testid': `${title.toLowerCase()}-section` }}
      >
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
}
