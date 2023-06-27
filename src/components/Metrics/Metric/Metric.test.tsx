import { render, screen } from '@/config/test-utils'

import { Metric } from './Metric'

test('Wraps individual metrics to apply consistent styling', () => {
  render(<Metric>Metric component inside</Metric>)

  expect(screen.getByText('Metric component inside')).toBeInTheDocument()
})
