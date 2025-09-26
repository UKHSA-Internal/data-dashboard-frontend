import { render, screen } from '@/config/test-utils'

import { FilterLinkedSubplot } from './FilterLinkedSubplot'

// Mock the SubplotFilterCardContainer component
jest.mock('@/app/components/ui/ukhsa/FilterLinkedCards/SubplotFilterCardContainer', () => ({
  SubplotFilterCardContainer: () => <div>Mocked subplot filter card container</div>,
}))

describe('FilterLinkedSubplot', () => {
  test('renders subplot filter component', () => {
    render(<FilterLinkedSubplot />)

    expect(screen.getByText('Mocked subplot filter card container')).toBeInTheDocument()
  })
})
