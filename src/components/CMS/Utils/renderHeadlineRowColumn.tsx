import { z } from 'zod'
import { WithHeadlineNumbersRowCard } from '@/api/models/cms/Page'
import { CardColumn } from '@/components/Card'
import { Blocks } from '@/components/CMS'

/**
 * This map utility handles rendering individual columns within the headline row card.
 */
export const renderHeadlineRowColumn = (column: z.infer<typeof WithHeadlineNumbersRowCard>['columns'][number]) => {
  const { type, value, id } = column

  if (type === 'headline_and_trend_component') {
    const {
      title,
      headline_number: { body: headlineHeading },
      trend_number: { body: trendHeading },
    } = value

    return (
      <CardColumn heading={title} key={id} data-testid={`column-${title.toLowerCase()}`}>
        <Blocks.Headline heading={headlineHeading} id={id} />
        <Blocks.Trend heading={trendHeading} id={id} />
      </CardColumn>
    )
  }

  if (type === 'dual_headline_component') {
    const {
      title,
      top_headline_number: { body: topHeading },
      bottom_headline_number: { body: bottomHeading },
    } = value

    return (
      <CardColumn heading={title} key={id} data-testid={`column-${title.toLowerCase()}`}>
        <Blocks.Headline heading={topHeading} id={id} position="top" />
        <Blocks.Headline heading={bottomHeading} id={id} position="bottom" />
      </CardColumn>
    )
  }

  if (type === 'single_headline_component') {
    const {
      title,
      headline_number: { body: heading },
    } = value

    return (
      <CardColumn heading={title} key={id} data-testid={`column-${title.toLowerCase()}`}>
        <Blocks.Headline heading={heading} id={id} />
      </CardColumn>
    )
  }
}
