import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import VirusSummary from './VirusSummary'

jest.mock('next/router', () => require('next-router-mock'))

const mockData = {
  virus: 'TestVirus',
  description: 'description for test virus',
  points: [],
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

test("The table dropdown content doesn't show initially", () => {
  render(
    <VirusSummary
      virus={mockData.virus}
      description={mockData.description}
      points={mockData.points}
    />
  )

  expect(screen.getByText('Monthly TestVirus cases')).not.toBeVisible()
})

test('Click button, and dropdown content to be shown', async () => {
  const user = userEvent.setup()

  render(
    <VirusSummary
      virus={mockData.virus}
      description={mockData.description}
      points={mockData.points}
    />
  )

  const dropdownButton = screen.getByText('View data in a tabular format')
  await user.click(dropdownButton)

  expect(screen.getByText('Monthly TestVirus cases')).toBeVisible()
})
