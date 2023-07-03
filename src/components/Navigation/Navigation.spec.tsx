import { render, screen, within } from '@testing-library/react'
import mockRouter from 'next-router-mock'

import { Navigation } from './Navigation'

jest.mock('next/router', () => require('next-router-mock'))

test('Displays primary and secondary links', () => {
  render(
    <Navigation
      links={[
        { title: 'Home', url: '/' },
        { title: 'Covid', url: '/covid' },
      ]}
    />
  )

  const nav = screen.getByRole('navigation', { name: 'Menu' })

  expect(within(nav).getByText('Home')).toHaveAttribute('href', '/')
  expect(within(nav).getByText('Covid')).toHaveAttribute('href', '/covid')
})

test('Supports a custom aria-label', () => {
  mockRouter.push('/flu')

  render(<Navigation label="Awesome nav!" links={[]} />)

  expect(screen.getByRole('navigation', { name: 'Awesome nav!' }))
})
