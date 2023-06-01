import { render, screen } from '@/config/test-utils'
import userEvent from '@testing-library/user-event'
import { Chart } from './Chart'
import StoreProvider from '@/lib/StoreProvider'
import { StoreState } from '@/lib/store'

test('Displays a chart & related tabular data from the store that was successfully fetched', async () => {
  const user = userEvent.setup()

  const charts: StoreState['charts'] = {
    'mocked-charts': {
      success: true,
      data: 'mocked-svg-data',
    },
  }
  const tabular: StoreState['tabular'] = {
    'mocked-tabular': {
      success: true,
      data: [
        {
          date: '2022-11-30',
          values: [
            {
              label: 'Plot1',
              value: 12345,
            },
          ],
        },
        {
          date: '2022-12-30',
          values: [
            {
              label: 'Plot1',
              value: 6789.0,
            },
          ],
        },
      ],
    },
  }

  render(
    <StoreProvider {...{ charts, tabular }}>
      <Chart id="mocked" size="narrow" />
    </StoreProvider>
  )

  expect(screen.getByAltText('')).toHaveAttribute('src', 'data:image/svg+xml;utf8,mocked-svg-data')
  expect(screen.getByRole('group', { name: 'View data in a tabular format' })).toBeInTheDocument()

  // Table is not visible by default
  expect(screen.getByRole('table', { name: '' })).not.toBeVisible()

  const dropdownButton = screen.getByText('View data in a tabular format')
  await user.click(dropdownButton)

  const table = screen.getByRole('table', { name: '' })
  expect(table).toBeVisible()
})

test('Does not display a chart from the store that failed to fetch', () => {
  const charts: StoreState['charts'] = {
    'mocked-charts': {
      success: false,
    },
  }
  const tabular: StoreState['tabular'] = {
    'mocked-tabular': {
      success: true,
      data: [
        {
          date: '123',
          values: [
            {
              label: 'Plot1',
              value: 456,
            },
          ],
        },
      ],
    },
  }
  render(
    <StoreProvider {...{ charts, tabular }}>
      <Chart id="mocked" size="narrow" />
    </StoreProvider>
  )

  expect(screen.queryByAltText('')).not.toBeInTheDocument()
  expect(screen.getByRole('group', { name: 'View data in a tabular format' })).toBeInTheDocument()
})

test('Displays a chart despite the tabular data not being available', () => {
  const charts: StoreState['charts'] = {
    'mocked-charts': {
      success: true,
      data: 'mocked-svg-data',
    },
  }
  const tabular: StoreState['tabular'] = {
    'mocked-tabular': {
      success: false,
    },
  }
  render(
    <StoreProvider {...{ charts, tabular }}>
      <Chart id="mocked" size="narrow" />
    </StoreProvider>
  )

  expect(screen.getByAltText('')).toHaveAttribute('src', 'data:image/svg+xml;utf8,mocked-svg-data')
  expect(screen.queryByRole('group', { name: 'View data in a tabular format' })).not.toBeInTheDocument()
})
