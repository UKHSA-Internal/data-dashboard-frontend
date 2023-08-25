import { render, screen, within } from '@testing-library/react'

import { RichText } from './RichText'

const mockData =
  '<h1>Primary test</h1><h2>Secondary test</h2><h3>Tertiary test</h3><a href="/test">Link test</a><ul><li>List item test</li></ul>'

test('Converts vanilla HTML into Gov UK React components', () => {
  render(<RichText>{mockData}</RichText>)

  expect(screen.getByRole('heading', { name: 'Primary test', level: 1 })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Secondary test', level: 2 })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Tertiary test', level: 3 })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Link test' })).toHaveAttribute('href', '/test')
  expect(screen.getAllByRole('listitem')).toHaveLength(1)
})

test('Renders a table of contents using the H2 elements within the provided HTML', () => {
  render(<RichText linkedHeadings>{mockData}</RichText>)

  const nav = screen.getByRole('navigation')
  const listitems = within(nav).getAllByRole('listitem')

  expect(listitems).toHaveLength(1)
  expect(within(nav).getByRole('heading', { name: 'Contents', level: 2 }))
  expect(within(listitems[0]).getByText('Secondary test')).toHaveAttribute('href', '#secondary-test')
  expect(screen.getByRole('heading', { name: 'Secondary test', level: 2 })).toBeInTheDocument()
})

test('Converts a hashed cms cookie settings link into the correct cookie settings link format', () => {
  const { getByRole } = render(
    <RichText linkedHeadings>{`<a href="/cookies?change-settings=1">Change cookie settings</a>`}</RichText>
  )

  expect(getByRole('link', { name: 'Change cookie settings' })).toHaveAttribute('href', '/cookies?change-settings=1')
})
