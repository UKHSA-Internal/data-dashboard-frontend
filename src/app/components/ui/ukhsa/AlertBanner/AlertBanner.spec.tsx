import { render } from '@/config/test-utils'

import { AlertBanner } from './AlertBanner'

describe('correct alert banner displaying', () => {
  test('green heat banner', async () => {
    const { getByRole, getByText } = render(
      AlertBanner({ level: 'Green', type: 'heat', dateFrom: '12 Jun 24', dateTo: '14 Jun 24' })
    )

    expect(getByRole('heading', { level: 2, name: 'Green Heat-health alert has been issued' })).toBeInTheDocument()
    expect(getByText('Alert is in effect from 12 Jun 24 to 14 Jun 24')).toBeInTheDocument()
  })

  test('yellow cold banner', async () => {
    const { getByRole, getByText } = render(
      AlertBanner({ level: 'Yellow', type: 'cold', dateFrom: '08 Dec 24', dateTo: '-' })
    )

    expect(getByRole('heading', { level: 2, name: 'Yellow Cold-health alert has been issued' })).toBeInTheDocument()
    expect(getByText('Alert is in effect from 08 Dec 24 to -')).toBeInTheDocument()
  })

  test('amber heat banner', async () => {
    const { getByRole } = render(
      AlertBanner({ level: 'Amber', type: 'heat', dateFrom: '12 Jun 24', dateTo: '14 Jun 24' })
    )

    expect(getByRole('heading', { level: 2, name: 'Amber Heat-health alert has been issued' })).toBeInTheDocument()
  })

  test('red cold banner', async () => {
    const { getByRole } = render(
      AlertBanner({ level: 'Red', type: 'cold', dateFrom: '12 Jun 24', dateTo: '14 Jun 24' })
    )

    expect(getByRole('heading', { level: 2, name: 'Red Cold-health alert has been issued' })).toBeInTheDocument()
  })
})
