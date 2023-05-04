import { render, screen } from '@/config/test-utils'
import { HeadlineNumbersRow } from './HeadlineNumbersRow'

test('Displays provided columns', () => {
  render(
    <HeadlineNumbersRow
      columns={[<div key={1}>Column 1</div>, <div key={2}>Column 2</div>, <div key={3}>Column 3</div>]}
    />
  )
  expect(screen.getByText('Column 1')).toBeInTheDocument()
  expect(screen.getByText('Column 2')).toBeInTheDocument()
  expect(screen.getByText('Column 3')).toBeInTheDocument()
})

test('Supports custom props (e.g. test attributes)', () => {
  render(<HeadlineNumbersRow cardProps={{ 'data-testid': 'content' }} columns={[<div key={1}>Column 1</div>]} />)
  expect(screen.getByTestId('content')).toBeInTheDocument()
})
