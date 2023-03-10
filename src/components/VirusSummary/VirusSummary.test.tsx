import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import VirusSummary from './VirusSummary'

jest.mock('next/router', () => require('next-router-mock'))

const mockData = {
  virus: 'TestVirus',
  description: 'description for test virus',
  points: [
    {
      date: '2022-02-10',
      value: 33388,
    },
    {
      date: '2022-01-17',
      value: 29214,
    },
  ],
}

test('Displays the title, description, shows a download button, and table dropdown button ', () => {
  render(
    <VirusSummary
      virus={mockData.virus}
      description={mockData.description}
      points={mockData.points}
    />
  )

  // Title
  const title = screen.getByText('TestVirus')
  expect(title).toBeInTheDocument()
  expect(title).toHaveAttribute('href', '/viruses/TestVirus')

  // Download button
  expect(screen.getByRole('button', { name: 'Download' })).toBeInTheDocument()

  // Description
  expect(screen.getByText('description for test virus')).toBeInTheDocument()

  // Dropdown button
  expect(screen.getByText('View data in a tabular format')).toBeInTheDocument()
})

test('Clicking the "View data in a tabular format" button, shows the graph in a tabular format', async () => {
  const user = userEvent.setup()

  render(
    <VirusSummary
      virus={mockData.virus}
      description={mockData.description}
      points={mockData.points}
    />
  )

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
