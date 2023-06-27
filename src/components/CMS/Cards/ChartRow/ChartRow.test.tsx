import { render, screen } from '@/config/test-utils'

import { ChartRow } from './ChartRow'

test('Displays provided columns', () => {
  render(<ChartRow columns={[<div key={1}>Column 1</div>, <div key={2}>Column 2</div>, <div key={3}>Column 3</div>]} />)
  expect(screen.getByText('Column 1')).toBeInTheDocument()
  expect(screen.getByText('Column 2')).toBeInTheDocument()
  expect(screen.getByText('Column 3')).toBeInTheDocument()
})
