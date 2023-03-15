import { render, screen } from '@testing-library/react'
import { Statistic } from './Statistic'

test('Shows a heading and value', () => {
  render(<Statistic heading="Weekly" value="100" />)

  expect(screen.getByText('Weekly')).toBeInTheDocument()
  expect(screen.getByText('100')).toBeInTheDocument()
})

test('Allows the value to be omitted and custom content shown instead', () => {
  render(<Statistic heading="Weekly">trend data</Statistic>)

  expect(screen.getByText('Weekly')).toBeInTheDocument()
  expect(screen.getByText('trend data')).toBeInTheDocument()
})
