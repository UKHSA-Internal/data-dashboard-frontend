import { render } from '@testing-library/react'

import { ListItemStatusTag, ListItemStatusTimestamp } from './ListItemStatus'

describe('renders correct tag', () => {
  test('renders green tag', async () => {
    const { getByText } = render(await ListItemStatusTag({ level: 'green', region: 'East of England' }))

    expect(getByText('green')).toHaveClass('govuk-tag--green')
    expect(getByText('green')).toHaveAttribute(
      'aria-label',
      'There is currently a green heat alert status for East of England'
    )
  })

  test('renders yellow tag', async () => {
    const { getByText } = render(await ListItemStatusTag({ level: 'yellow', region: 'South East' }))

    expect(getByText('yellow')).toHaveClass('govuk-tag--yellow')
    expect(getByText('yellow')).toHaveAttribute(
      'aria-label',
      'There is currently a yellow heat alert status for South East'
    )
  })

  test('renders amber tag', async () => {
    const { getByText } = render(await ListItemStatusTag({ level: 'amber', region: 'West Midlands' }))

    expect(getByText('amber')).toHaveClass('govuk-tag--orange')
    expect(getByText('amber')).toHaveAttribute(
      'aria-label',
      'There is currently an amber heat alert status for West Midlands'
    )
  })

  test('renders red tag', async () => {
    const { getByText } = render(await ListItemStatusTag({ level: 'red', region: 'East Midlands' }))

    expect(getByText('red')).toHaveClass('govuk-tag--red')
    expect(getByText('red')).toHaveAttribute(
      'aria-label',
      'There is currently a red heat alert status for East Midlands'
    )
  })

  test('renders no alerts tag', async () => {
    const { getByText } = render(await ListItemStatusTag({ level: 'no alerts', region: 'London' }))

    expect(getByText('no alerts')).toHaveClass('govuk-tag--grey')
    expect(getByText('no alerts')).toHaveAttribute('aria-label', 'There are currently no alerts for London')
  })
})

test('renders timestamp classes as expected', async () => {
  const { getByText } = render(await ListItemStatusTimestamp({ children: 'timestamp test' }))

  expect(getByText('timestamp test')).toHaveClass('govuk-body-s')
})
