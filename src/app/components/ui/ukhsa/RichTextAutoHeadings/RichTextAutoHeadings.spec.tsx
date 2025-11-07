import { render, within } from '@/config/test-utils'

import { RichTextAutoHeadings } from './RichTextAutoHeadings'

const mockData =
  '<h1>Primary test</h1><h2>Secondary test</h2><h3>Tertiary test</h3><a href="/test">Link test</a><ul><li>List item test</li></ul>'

test('Converts vanilla HTML into Gov UK React components', () => {
  const { getByRole } = render(<RichTextAutoHeadings>{mockData}</RichTextAutoHeadings>)

  expect(getByRole('heading', { name: 'Primary test', level: 1 })).toBeInTheDocument()
  expect(getByRole('heading', { name: 'Secondary test', level: 2 })).toBeInTheDocument()
  expect(getByRole('heading', { name: 'Tertiary test', level: 3 })).toBeInTheDocument()
})

test('Does not render a table of contents using if the the cms page does not contain any H2s', () => {
  const { queryByRole } = render(<RichTextAutoHeadings>{`<p>hello</p>`}</RichTextAutoHeadings>)
  expect(queryByRole('navigation')).not.toBeInTheDocument()
  expect(queryByRole('heading', { name: 'Contents', level: 2 })).not.toBeInTheDocument()
})

test('Renders a table of contents using the H2 elements within the provided HTML', () => {
  const { getByRole } = render(<RichTextAutoHeadings>{mockData}</RichTextAutoHeadings>)

  const nav = getByRole('navigation')
  const listitems = within(nav).getAllByRole('listitem')

  expect(listitems).toHaveLength(1)
  expect(within(nav).getByRole('heading', { name: 'Contents', level: 2 }))
  expect(within(listitems[0]).getByText('Secondary test')).toHaveAttribute('href', '#secondary-test')
  expect(getByRole('heading', { name: 'Secondary test', level: 2 })).toBeInTheDocument()
})

test('Debug: Check what is being rendered', () => {
  const { container } = render(<RichTextAutoHeadings>{mockData}</RichTextAutoHeadings>)

  // Check if component is rendering at all
  expect(container.firstChild).toBeInTheDocument()

  // Check if the content is there
  expect(container.textContent).toContain('Secondary test')
})

test('Converts a cms cookie settings anchor into the nextjs link', () => {
  const { getByRole } = render(
    <RichTextAutoHeadings>{`<a href="/cookies?change-settings=1">Change cookie settings</a>`}</RichTextAutoHeadings>
  )

  expect(getByRole('link', { name: 'Change cookie settings' })).toHaveAttribute('href', '/cookies?change-settings=1')
})
