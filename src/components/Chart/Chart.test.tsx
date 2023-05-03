import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// import { Chart } from './Chart'

jest.mock('next/router', () => require('next-router-mock'))

test('Displays the chart via the provided src', () => {
  // render(<Chart src="/svg/data/uri" />)
  expect(screen.getByAltText('')).toHaveAttribute('src', '/svg/data/uri')
})

// Skipped until this is re-implemented in JIRA: CDD-534
test.skip('Clicking the "View data in a tabular format" button, shows the graph in a tabular format', async () => {
  const user = userEvent.setup()

  // render(<Chart src="" />)

  // Table is not visible by default
  expect(screen.getByText('Monthly TestVirus cases')).not.toBeVisible()

  const dropdownButton = screen.getByText('View data in a tabular format')
  await user.click(dropdownButton)

  const table = screen.getByRole('table', { name: 'Monthly TestVirus cases' })
  expect(table).toBeVisible()

  // Table column headers
  const headers = within(table).getAllByRole('columnheader')
  expect(within(headers[0]).getByText('Month'))
  expect(within(headers[1]).getByText('Amount'))

  // Table rows
  const rows = within(table).getAllByRole('row')
  expect(rows).toHaveLength(3) // 1 header row, 2 body rows

  expect(within(rows[1]).getByText('2022-02-10'))
  expect(within(rows[1]).getByText('33388'))
  expect(within(rows[2]).getByText('2022-01-17'))
  expect(within(rows[2]).getByText('29214'))
})
