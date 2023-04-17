import { render, screen } from '@/config/test-utils'
import { HeadlineTrend } from './HeadlineTrend'

test('Shows a heading text and trend component', () => {
  render(<HeadlineTrend heading="Last 7 days" direction="up" colour="green" value="692 (-3.0%)" />)

  expect(screen.getByText('Last 7 days')).toBeInTheDocument()
  expect(screen.getByText('692 (-3.0%)')).toBeInTheDocument()
})

test('Shows screen reader specifc text to convey sentiment', () => {
  // Positive increase trend
  const { rerender } = render(<HeadlineTrend heading="Last 7 days" direction="up" colour="green" value="692 (-3.0%)" />)
  expect(screen.getByText('Last 7 days: 692 (-3.0%), upward positive trend')).toBeInTheDocument()

  // Positive decrease trend
  rerender(<HeadlineTrend heading="Last 7 days" direction="down" colour="green" value="692 (-3.0%)" />)
  expect(screen.getByText('Last 7 days: 692 (-3.0%), downward positive trend')).toBeInTheDocument()

  // Negative increase trend
  rerender(<HeadlineTrend heading="Last 7 days" direction="up" colour="red" value="692 (-3.0%)" />)
  expect(screen.getByText('Last 7 days: 692 (-3.0%), upward negative trend')).toBeInTheDocument()

  // Negative decrease trend
  rerender(<HeadlineTrend heading="Last 7 days" direction="down" colour="red" value="692 (-3.0%)" />)
  expect(screen.getByText('Last 7 days: 692 (-3.0%), downward negative trend')).toBeInTheDocument()
})
