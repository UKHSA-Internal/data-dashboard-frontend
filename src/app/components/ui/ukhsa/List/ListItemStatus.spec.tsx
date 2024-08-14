import { render } from '@/config/test-utils'

import {
  ListItemStatusContent,
  ListItemStatusIcon,
  ListItemStatusLink,
  ListItemStatusTimestamp,
} from './ListItemStatus'
import ListItemStatusTag from './ListItemStatusTag'

describe('correct health alerts icons displaying', () => {
  test('heat health alert green icon', async () => {
    const { getByTitle } = render(ListItemStatusIcon({ level: 'Green', type: 'heat' }))

    expect(getByTitle('Heat health alerts green')).toBeInTheDocument()
  })

  test('heat health alert yellow icon', async () => {
    const { getByTitle } = render(ListItemStatusIcon({ level: 'Yellow', type: 'heat' }))

    expect(getByTitle('Heat health alerts yellow')).toBeInTheDocument()
  })

  test('heat health alert amber icon', async () => {
    const { getByTitle } = render(ListItemStatusIcon({ level: 'Amber', type: 'heat' }))

    expect(getByTitle('Heat health alerts amber')).toBeInTheDocument()
  })

  test('heat health alert red icon', async () => {
    const { getByTitle } = render(ListItemStatusIcon({ level: 'Red', type: 'heat' }))

    expect(getByTitle('Heat health alerts red')).toBeInTheDocument()
  })

  test('cold health alert green icon', async () => {
    const { getByTitle } = render(ListItemStatusIcon({ level: 'Green', type: 'cold' }))

    expect(getByTitle('Cold health alerts green')).toBeInTheDocument()
  })

  test('cold health alert yellow icon', async () => {
    const { getByTitle } = render(ListItemStatusIcon({ level: 'Yellow', type: 'cold' }))

    expect(getByTitle('Cold health alerts yellow')).toBeInTheDocument()
  })

  test('cold health alert amber icon', async () => {
    const { getByTitle } = render(ListItemStatusIcon({ level: 'Amber', type: 'cold' }))

    expect(getByTitle('Cold health alerts amber')).toBeInTheDocument()
  })

  test('cold health alert red icon', async () => {
    const { getByTitle } = render(ListItemStatusIcon({ level: 'Red', type: 'cold' }))

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
  test('renders green tag', () => {
    const { getByText } = render(<ListItemStatusTag type="heat" level="Green" region="East of England" />)

    expect(getByText('Green')).toHaveClass('govuk-tag--green')
    expect(getByText('Green')).toHaveAttribute(
      'aria-label',
      'There is currently a Green heat alert status for East of England'
    )
  })

  test('renders yellow tag', () => {
    const { getByText } = render(<ListItemStatusTag type="heat" level="Yellow" region="South East" />)

    expect(getByText('Yellow')).toHaveClass('govuk-tag--yellow')
    expect(getByText('Yellow')).toHaveAttribute(
      'aria-label',
      'There is currently a Yellow heat alert status for South East'
    )
  })

  test('renders amber tag', () => {
    const { getByText } = render(<ListItemStatusTag type="cold" level="Amber" region="West Midlands" />)

    expect(getByText('Amber')).toHaveClass('govuk-tag--orange')
    expect(getByText('Amber')).toHaveAttribute(
      'aria-label',
      'There is currently an Amber cold alert status for West Midlands'
    )
  })

  test('renders red tag', () => {
    const { getByText } = render(<ListItemStatusTag type="cold" level="Red" region="East Midlands" />)

    expect(getByText('Red')).toHaveClass('govuk-tag--red')
    expect(getByText('Red')).toHaveAttribute(
      'aria-label',
      'There is currently a Red cold alert status for East Midlands'
    )
  })

  test('renders no alerts tag', () => {
    const { getByText } = render(<ListItemStatusTag type="heat" level="No alerts" region="London" />)

    expect(getByText('No alerts')).not.toHaveClass('govuk-tag')
    expect(getByText('No alerts')).toHaveAttribute('aria-label', 'There are currently no alerts for London')
  })
})
