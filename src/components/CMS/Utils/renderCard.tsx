import { z } from 'zod'
import type { ContentTypes } from '@/api/models/cms/Page'
import { Cards, Utils } from '@/components/CMS'

/**
 * This map utility is responsible for rendering top level cards returned from the CMS page body.
 */
export const renderCard = ({ type, value, id }: z.infer<typeof ContentTypes>) => {
  if (type === 'text_card') {
    return <Cards.Text key={id}>{value.body}</Cards.Text>
  }

  if (type === 'headline_numbers_row_card') {
    return (
      <Cards.HeadlineNumbersRow
        key={id}
        columns={value.columns.map(Utils.renderHeadlineRowColumn)}
        cardProps={{
          'data-testid': 'summary-section',
        }}
      />
    )
  }

  if (type === 'chart_row_card') {
    return <Cards.ChartRow key={id} columns={value.columns.map(Utils.renderChartRowColumn)} />
  }
}
