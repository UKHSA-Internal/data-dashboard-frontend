import { render } from '@/config/test-utils'

import { AlertBanner } from './AlertBanner'

describe('correct alert banner displaying', () => {
  test('green heat banner', async () => {
    const { getByRole, getByText } = render(AlertBanner({ level: 'Green', type: 'heat' }))

    expect(getByRole('heading', { level: 2, name: 'Heat warning' })).toBeInTheDocument()
    expect(getByText('Heat warnings may occur')).toBeInTheDocument()
  })

  test('yellow cold banner', async () => {
    const { getByRole, getByText } = render(AlertBanner({ level: 'Yellow', type: 'cold' }))

    expect(getByRole('heading', { level: 2, name: 'Cold warning' })).toBeInTheDocument()
    expect(getByText('Cold warnings are possible')).toBeInTheDocument()
  })

  test('amber heat banner', async () => {
    const { getByRole, getByText } = render(AlertBanner({ level: 'Amber', type: 'heat' }))

    expect(getByRole('heading', { level: 2, name: 'Extreme Heat warning' })).toBeInTheDocument()
    expect(getByText('Heat warnings are likely')).toBeInTheDocument()
  })

  test('red cold banner', async () => {
    const { getByRole, getByText } = render(AlertBanner({ level: 'Red', type: 'cold' }))

    expect(getByRole('heading', { level: 2, name: 'Extreme Cold warning' })).toBeInTheDocument()
    expect(getByText('Cold warnings are extremely likely')).toBeInTheDocument()
  })
})
