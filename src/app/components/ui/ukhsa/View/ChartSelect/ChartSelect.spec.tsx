import { render } from '@/config/test-utils'

import ChartSelect from './ChartSelect'

jest.mock('next/navigation', () => {
  useRouter: jest.fn()
  useSearchParams: jest.fn()
})

// const pushMock = jest.fn()
// useRouter.mockReturnValue({
// push: pushMock
// })

test('renders expected response for 12 months', () => {
  const { getByRole } = render(<ChartSelect timespan={{ years: 1, months: 0 }} chartId="123" />)

  expect(getByRole('combobox', { name: 'Filter data by' })).toBeVisible()
})
