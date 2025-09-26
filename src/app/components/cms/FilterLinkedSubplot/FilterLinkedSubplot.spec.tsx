import { render, screen } from '@/config/test-utils'

import { FilterLinkedSubplot } from './FilterLinkedSubplot'

// Mock the FilterLinkedCardWrapper component
jest.mock('@/app/components/ui/ukhsa/FilterLinkedCards/FilterLinkedCardWrapper', () => ({
  FilterLinkedCardWrapper: ({ cardType }: { cardType: string }) => (
    <div>Mocked filter linked card wrapper with cardType: {cardType}</div>
  ),
}))

describe('FilterLinkedSubplot', () => {
  test('renders subplot filter component', () => {
    render(<FilterLinkedSubplot />)

    expect(screen.getByText('Mocked filter linked card wrapper with cardType: subplot')).toBeInTheDocument()
  })
})
