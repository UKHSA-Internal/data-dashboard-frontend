import { render, screen, within } from '@testing-library/react'
import mockRouter from 'next-router-mock'
import { Navigation } from './Navigation'

jest.mock('next/router', () => require('next-router-mock'))

test('Displays primary and secondary links', () => {
  render(
    <Navigation
      primaryLinks={[
        { title: 'Home', url: '/' },
        { title: 'Covid', url: '/covid' },
      ]}
      secondaryLinks={[
        { title: 'About', url: '/about' },
        { title: 'Dev guide', url: '/dev-guide' },
      ]}
    />
  )

  const nav = screen.getByRole('navigation', { name: 'Menu' })

  expect(within(nav).getByText('Home')).toHaveAttribute('href', '/')
  expect(within(nav).getByText('Covid')).toHaveAttribute('href', '/covid')
  expect(within(nav).getByText('About')).toHaveAttribute('href', '/about')
  expect(within(nav).getByText('Dev guide')).toHaveAttribute(
    'href',
    '/dev-guide'
  )
})

test('Supports a custom aria-label', () => {
  mockRouter.push('/flu')

  render(
    <Navigation label="Awesome nav!" primaryLinks={[]} secondaryLinks={[]} />
  )

  expect(screen.getByRole('navigation', { name: 'Awesome nav!' }))
})
