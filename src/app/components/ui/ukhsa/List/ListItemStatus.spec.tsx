import { render } from '@testing-library/react'

import { ListItemStatusTag } from './ListItemStatus'

describe('renders correct tag', () => {
  test('renders green tag', async () => {
    const { getByText } = render(await ListItemStatusTag({ alertLevel: 'green' }))

    expect(getByText('GREEN')).toHaveClass('govuk-tag--green')
  })

  test('renders yellow tag', async () => {
    const { getByText } = render(await ListItemStatusTag({ alertLevel: 'yellow' }))

    expect(getByText('YELLOW')).toHaveClass('govuk-tag--yellow')
  })

  test('renders amber tag', async () => {
    const { getByText } = render(await ListItemStatusTag({ alertLevel: 'amber' }))

    expect(getByText('AMBER')).toHaveClass('govuk-tag--orange')
  })

  test('renders red tag', async () => {
    const { getByText } = render(await ListItemStatusTag({ alertLevel: 'red' }))

    expect(getByText('RED')).toHaveClass('govuk-tag--red')
  })

  test('renders no alerts tag', async () => {
    const { getByText } = render(await ListItemStatusTag({ alertLevel: 'no alerts' }))

    expect(getByText('NO ALERTS')).toHaveClass('govuk-tag--grey')
  })
})
