import { render, screen } from '@/config/test-utils'

import { HeadlineTrend } from './HeadlineTrend'

test('Shows a heading text and trend component', () => {
  render(<HeadlineTrend heading="Last 7 days" direction="up" colour="green" change={24692} percentage={-3.0} />)

  expect(screen.getByText('Last 7 days')).toBeInTheDocument()
  expect(screen.getByText('24,692 (-3%)')).toBeInTheDocument()
})

test('Shows screen reader specifc text to convey sentiment', () => {
  // Positive increase trend
  const { rerender } = render(
    <HeadlineTrend heading="Last 7 days" direction="up" colour="green" change={692} percentage={-3.0} />
  )
  expect(screen.getByText('Last 7 days: 692 (-3%), upward positive trend')).toBeInTheDocument()

  // Positive decrease trend
  rerender(<HeadlineTrend heading="Last 7 days" direction="down" colour="green" change={692} percentage={-3.0} />)
  expect(screen.getByText('Last 7 days: 692 (-3%), downward positive trend')).toBeInTheDocument()

  // Negative increase trend
  rerender(<HeadlineTrend heading="Last 7 days" direction="up" colour="red" change={692} percentage={-3.0} />)
  expect(screen.getByText('Last 7 days: 692 (-3%), upward negative trend')).toBeInTheDocument()

  // Negative decrease trend
  rerender(<HeadlineTrend heading="Last 7 days" direction="down" colour="red" change={692} percentage={-3.0} />)
  expect(screen.getByText('Last 7 days: 692 (-3%), downward negative trend')).toBeInTheDocument()

  // Neutral
  rerender(<HeadlineTrend heading="Last 7 days" direction="neutral" colour="neutral" change={692} percentage={-3.0} />)
  expect(screen.getByText('Last 7 days: 692 (-3%), no change compared to the previous 7 days')).toBeInTheDocument()
})
