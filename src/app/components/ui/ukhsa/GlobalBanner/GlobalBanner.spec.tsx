import { render } from '@/config/test-utils'

import { GlobalBanner } from './GlobalBanner'

test('renders "information variant" announcement', async () => {
  const { getByRole, getByText } = render(
    await GlobalBanner({
      variant: 'Information',
      heading: 'Test information heading',
      children: '<p>Summary information content for announcement</p>',
      className: 'testing-new-classname',
    })
  )

  expect(getByText('Information')).toHaveClass('govuk-tag')

  const announcementElement = getByRole('status')
  expect(announcementElement).toHaveClass('govuk-inset-text govuk-!-margin-top-0 border-blue testing-new-classname')

  expect(getByText('Test information heading')).toHaveClass('govuk-heading-s govuk-!-margin-bottom-0')
  expect(getByText('Summary information content for announcement')).toBeVisible()
})

test('renders "warning variant" announcement', async () => {
  const { getByText, getByRole } = render(
    await GlobalBanner({
      variant: 'Warning',
      heading: 'Test warning heading',
      children: '<p>Summary warning content for announcement</p>',
    })
  )

  expect(getByText('Warning')).toHaveClass('govuk-tag govuk-tag--red')

  const announcementElement = getByRole('alert')
  expect(announcementElement).toHaveClass('govuk-inset-text govuk-!-margin-top-0 border-red')

  expect(getByText('Test warning heading')).toHaveClass('govuk-heading-s govuk-!-margin-bottom-0')
  expect(getByText('Summary warning content for announcement')).toBeVisible()
})
