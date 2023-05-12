import { render, screen, within } from '@/config/test-utils'
import userEvent from '@testing-library/user-event'
import { ChartTable } from './ChartTable'

test('Clicking the "View data in a tabular format" button, shows the graph in a tabular format', async () => {
  const user = userEvent.setup()

  render(
    <ChartTable
      caption="Coronavirus positivity"
      rows={[
        {
          date: '2022-10-31',
          value: 560.0,
        },
        {
          date: '2022-11-30',
          value: 368.0,
        },
        {
          date: '2022-12-31',
          value: 426.0,
        },
      ]}
    />
  )

  // Table is not visible by default
  expect(screen.getByRole('table', { name: 'Coronavirus positivity' })).not.toBeVisible()

  const dropdownButton = screen.getByText('View data in a tabular format')
  await user.click(dropdownButton)

  const table = screen.getByRole('table', { name: 'Coronavirus positivity' })
  expect(table).toBeVisible()

  // Table column headers
  const headers = within(table).getAllByRole('columnheader')
  expect(within(headers[0]).getByText('Month'))
  expect(within(headers[1]).getByText('Amount'))

  // Table rows
  const rows = within(table).getAllByRole('row')
  expect(rows).toHaveLength(4) // 1 header row, 2 body rows

  expect(within(rows[1]).getByText('October'))
  expect(within(rows[1]).getByText('560'))

  expect(within(rows[2]).getByText('November'))
  expect(within(rows[2]).getByText('368'))

  expect(within(rows[3]).getByText('December'))
  expect(within(rows[3]).getByText('426'))
})
