import { render, screen } from '@testing-library/react'
import mockRouter from 'next-router-mock'
import { NavigationLink } from './NavigationLink'

vi.mock('next/router', () => require('next-router-mock'))

test('Nav link', () => {
  render(<NavigationLink title="Covid" url="/covid" type="primary" />)

  const link = screen.getByText('Covid')
  expect(link).toHaveAttribute('href', '/covid')
  expect(link).not.toHaveAttribute('aria-current')
})

test('Active Nav link', () => {
  mockRouter.push('/flu')

  render(<NavigationLink title="Flu" url="/flu" type="primary" />)

  const link = screen.getByText('Flu')
  expect(link).toHaveAttribute('href', '/flu')
  expect(link).toHaveAttribute('aria-current', 'page')
})
