import { render, screen } from '@testing-library/react'

import { Chart } from './Chart'

test('Displays the chart via the provided src', () => {
  render(<Chart src="/svg/data/uri" />)
  expect(screen.getByAltText('')).toHaveAttribute('src', '/svg/data/uri')
})
