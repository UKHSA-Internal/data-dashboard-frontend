import { render, within } from '@/config/test-utils'

import { RichText } from './RichText'

const mockData =
  '<h1>Primary test</h1><h2>Secondary test</h2><h3>Tertiary test</h3><a href="/test">Link test</a><ul><li>List item test</li></ul>'

test('Converts vanilla HTML into Gov UK React components', () => {
  const { getByRole, getAllByRole } = render(<RichText>{mockData}</RichText>)

  expect(getByRole('heading', { name: 'Primary test', level: 1 })).toBeInTheDocument()
  expect(getByRole('heading', { name: 'Secondary test', level: 2 })).toBeInTheDocument()
  expect(getByRole('heading', { name: 'Tertiary test', level: 3 })).toBeInTheDocument()
  expect(getByRole('link', { name: 'Link test' })).toHaveAttribute('href', '/test')
  expect(getAllByRole('listitem')).toHaveLength(1)
})

test('Does not render a table of contents using if the the cms page does not contain any H2s', () => {
  const { queryByRole } = render(<RichText linkedHeadings>{`<p>hello</p>`}</RichText>)
  expect(queryByRole('navigation')).not.toBeInTheDocument()
})

test('Renders a table of contents using the H2 elements within the provided HTML', () => {
  const { getByRole } = render(<RichText linkedHeadings>{mockData}</RichText>)

  const nav = getByRole('navigation')
  const listitems = within(nav).getAllByRole('listitem')

  expect(listitems).toHaveLength(1)
  expect(within(nav).getByRole('heading', { name: 'Contents', level: 2 }))
  expect(within(listitems[0]).getByText('Secondary test')).toHaveAttribute('href', '#secondary-test')
  expect(getByRole('heading', { name: 'Secondary test', level: 2 })).toBeInTheDocument()
})

test('Converts a cms cookie settings anchor into the nextjs link', () => {
  const { getByRole } = render(
    <RichText linkedHeadings>{`<a href="/cookies?change-settings=1">Change cookie settings</a>`}</RichText>
  )

  expect(getByRole('link', { name: 'Change cookie settings' })).toHaveAttribute('href', '/cookies?change-settings=1')
})
