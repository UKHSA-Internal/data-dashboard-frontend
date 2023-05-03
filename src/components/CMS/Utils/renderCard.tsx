import { z } from 'zod'
import type { ContentTypes } from '@/api/models/cms/Page'
import { Cards, Utils } from '@/components/CMS'

/**
 * This map utility is responsible for rendering top level cards returned from the CMS page body.
 */
export const renderCard = ({ type, value, id }: z.infer<typeof ContentTypes>) => {
  switch (type) {
    case 'text_card': {
      const { body } = value
      return <Cards.Text key={id}>{body}</Cards.Text>
    }
    case 'headline_numbers_row_card': {
      const { columns } = value
      return (
        <Cards.HeadlineNumbersRow
          key={id}
          columns={columns.map(Utils.renderHeadlineRowColumn)}
          cardProps={{
            'data-testid': 'summary-section',
          }}
        />
      )
    }
    case 'chart_row_card': {
      const { columns } = value
      return <Cards.ChartRow key={id} columns={columns.map(Utils.renderChartRowColumn)} />
    }
    default: {
      return null
    }
  }
}
