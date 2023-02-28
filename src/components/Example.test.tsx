import { Example } from '@/components/Example'
import { render, screen } from '@testing-library/react'

test('Example', () => {
  render(<Example />)
  expect(
    screen.getByRole('heading', { level: 1, name: /Hello/i })
  ).toBeDefined()
})
