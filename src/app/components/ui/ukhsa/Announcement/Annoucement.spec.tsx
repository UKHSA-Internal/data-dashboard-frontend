import { render } from '@/config/test-utils'

import { Announcement } from './Announcement'

test('renders "information variant" announcement', async () => {
  const { getByText, container } = render(
    await Announcement({
      variant: 'Information',
      heading: 'Test information heading',
      summary: 'Summary information content for announcement',
    })
  )

  expect(getByText('Information')).toHaveClass('govuk-tag')

  const announcementElement = container.firstChild
  expect(announcementElement).toHaveClass('govuk-inset-text govuk-!-margin-top-0 border-blue')

  expect(getByText('Test information heading')).toHaveClass('govuk-heading-s govuk-!-margin-bottom-0')
  expect(getByText('Summary information content for announcement')).toBeVisible()
})

test('renders "warning variant" announcement', async () => {
  const { getByText, container } = render(
    await Announcement({
      variant: 'Warning',
      heading: 'Test warning heading',
      summary: 'Summary warning content for announcement',
    })
  )

  expect(getByText('Warning')).toHaveClass('govuk-tag govuk-tag--red')

  const announcementElement = container.firstChild
  expect(announcementElement).toHaveClass('govuk-inset-text govuk-!-margin-top-0 border-red')

  expect(getByText('Test warning heading')).toHaveClass('govuk-heading-s govuk-!-margin-bottom-0')
  expect(getByText('Summary warning content for announcement')).toBeVisible()
})
