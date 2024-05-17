import { render } from '@testing-library/react'

import {
  ListItemStatusContent,
  ListItemStatusIcon,
  ListItemStatusLink,
  ListItemStatusTag,
  ListItemStatusTimestamp,
} from './ListItemStatus'

describe('correct health alerts icons displaying', () => {
  test('heat health alert green icon', async () => {
    const { getByTitle } = render(ListItemStatusIcon({ level: 'green', type: 'heat' }))

    expect(getByTitle('Heat health alerts green')).toBeInTheDocument()
  })

  test('heat health alert yellow icon', async () => {
    const { getByTitle } = render(ListItemStatusIcon({ level: 'yellow', type: 'heat' }))

    expect(getByTitle('Heat health alerts yellow')).toBeInTheDocument()
  })

  test('heat health alert amber icon', async () => {
    const { getByTitle } = render(ListItemStatusIcon({ level: 'amber', type: 'heat' }))

    expect(getByTitle('Heat health alerts amber')).toBeInTheDocument()
  })

  test('heat health alert red icon', async () => {
    const { getByTitle } = render(ListItemStatusIcon({ level: 'red', type: 'heat' }))

    expect(getByTitle('Heat health alerts red')).toBeInTheDocument()
  })

  test('cold health alert green icon', async () => {
    const { getByTitle } = render(ListItemStatusIcon({ level: 'green', type: 'cold' }))

    expect(getByTitle('Cold health alerts green')).toBeInTheDocument()
  })

  test('cold health alert yellow icon', async () => {
    const { getByTitle } = render(ListItemStatusIcon({ level: 'yellow', type: 'cold' }))

    expect(getByTitle('Cold health alerts yellow')).toBeInTheDocument()
  })

  test('cold health alert amber icon', async () => {
    const { getByTitle } = render(ListItemStatusIcon({ level: 'amber', type: 'cold' }))

    expect(getByTitle('Cold health alerts amber')).toBeInTheDocument()
  })

  test('cold health alert red icon', async () => {
    const { getByTitle } = render(ListItemStatusIcon({ level: 'red', type: 'cold' }))

    expect(getByTitle('Cold health alerts red')).toBeInTheDocument()
  })
})

test('content wrapped in flex container', async () => {
  const { getByText } = render(await ListItemStatusContent({ children: 'status content' }))

  expect(getByText('status content')).toHaveClass('flex flex-col')
})

test('renders heading, link within & overlay', async () => {
  const { getByRole } = render(await ListItemStatusLink({ children: 'link content', href: '/link-test' }))

  expect(getByRole('heading', { name: 'link content' })).toBeInTheDocument()
  expect(getByRole('link', { name: 'link content' })).toHaveAttribute('href', '/link-test')
  expect(getByRole('link', { name: 'link content' })).toHaveClass(
    'govuk-link govuk-link--no-visited-state after:absolute after:inset-0'
  )
})

test('renders timestamp classes as expected', async () => {
  const { getByText } = render(await ListItemStatusTimestamp({ children: 'timestamp test' }))

  expect(getByText('timestamp test')).toHaveClass('govuk-body-s')
})

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
