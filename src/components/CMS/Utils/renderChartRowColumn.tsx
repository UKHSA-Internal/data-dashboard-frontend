import { Blocks, Cards } from '@/components/CMS'
import { GridCol, GridRow } from 'govuk-react'

import { ChartDownload } from '@/components/ChartDownload'
import type { ChartRowColumns } from '@/api/models/cms/Page'
import kebabCase from 'lodash/kebabCase'
import { z } from 'zod'

/**
 * This map utility handles rendering individual chart cards within each column for the chart row card.
 */
type Column = z.infer<typeof ChartRowColumns>[number]

export const renderChartRowColumn = (column: Column, _: number, columns: Array<Column>) => {
  const {
    id,
    type,
    value: { title, body, chart },
  } = column

  const chartSize = columns.length === 1 ? 'wide' : 'narrow'

  if (type === 'chart_with_headline_and_trend_card') {
    const {
      value: { headline_number_columns: blocks },
    } = column

    return (
      <Cards.ChartColumn
        key={id}
        heading={title}
        description={body}
        chart={<Blocks.Chart id={id} size={chartSize} />}
        download={<ChartDownload chart={chart} />}
        cardProps={{ 'data-testid': `${kebabCase(title)}-section` }}
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
            if (type === 'percentage_number') {
              return (
                <GridCol key={id} setDesktopWidth={'one-third'}>
                  <Blocks.Percentage heading={body} id={id} />
                </GridCol>
              )
            }
          })}
        </GridRow>
      </Cards.ChartColumn>
    )
  }

  if (type === 'chart_card') {
    return (
      <Cards.ChartColumn
        key={id}
        heading={title}
        description={body}
        chart={<Blocks.Chart id={id} size={chartSize} />}
        cardProps={{ 'data-testid': `${kebabCase(title)}-section` }}
      />
    )
  }
}
