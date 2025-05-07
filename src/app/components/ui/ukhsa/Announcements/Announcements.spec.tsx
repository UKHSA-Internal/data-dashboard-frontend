import { render } from '@/config/test-utils'

import { BannerVariant } from '../GlobalBanner/GlobalBanner'
import { Announcements } from './Announcements'

test('renders multiple announcements when provided', async () => {
  const announcementsData = [
    {
      id: '1',
      banner_type: 'Information' as BannerVariant,
      title: 'Test information heading',
      body: '<p>Information content for announcement</p>',
    },
    {
      id: '2',
      banner_type: 'Warning' as BannerVariant,
      title: 'Test warning heading',
      body: '<p>Warning content for announcement</p>',
    },
  ]

  const { getByText, getAllByRole } = render(<Announcements announcements={announcementsData} className="test-class" />)

  // Should render both announcements
  expect(getAllByRole('status').length + getAllByRole('alert').length).toBe(2)

  // Check content is rendered correctly
  expect(getByText('Test information heading')).toBeVisible()
  expect(getByText('Information content for announcement')).toBeVisible()
  expect(getByText('Test warning heading')).toBeVisible()
  expect(getByText('Warning content for announcement')).toBeVisible()
})

test('renders nothing when no announcements are provided', () => {
  const { container } = render(<Announcements announcements={[]} />)
  expect(container.firstChild).toBeNull()
})

test('renders nothing when announcements is undefined', () => {
  const { container } = render(<Announcements announcements={undefined} />)
  expect(container.firstChild).toBeNull()
})
