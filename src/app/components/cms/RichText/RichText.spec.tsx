import { render } from '@/config/test-utils'

import { RichText } from './RichText'

const mockData =
  '<h1>Primary test</h1><h2>Secondary test</h2><h3>Tertiary test</h3><a href="/test">Link test</a><ul><li>List item test</li></ul>'

test('Converts vanilla HTML into Gov UK React components', () => {
  const { getByRole, getAllByRole, container } = render(<RichText className="test-classname">{mockData}</RichText>)

  expect(getByRole('heading', { name: 'Primary test', level: 1 })).toBeInTheDocument()
  expect(getByRole('heading', { name: 'Secondary test', level: 2 })).toBeInTheDocument()
  expect(getByRole('heading', { name: 'Tertiary test', level: 3 })).toBeInTheDocument()
  expect(getByRole('link', { name: 'Link test' })).toHaveAttribute('href', '/test')
  expect(getAllByRole('listitem')).toHaveLength(1)
  expect(container.firstChild).toHaveClass('test-classname')
})

test('Does not render a table of contents when the cms page does NOT contain any h2s', () => {
  const { queryByRole } = render(<RichText>{`<p>hello</p>`}</RichText>)
  expect(queryByRole('navigation')).not.toBeInTheDocument()
  expect(queryByRole('heading', { name: 'Contents', level: 2 })).not.toBeInTheDocument()
})

test('Does not render a table of contents when the cms page DOES contain h2s', () => {
  const { getByRole, queryByRole } = render(<RichText>{mockData}</RichText>)

  expect(queryByRole('navigation')).not.toBeInTheDocument()
  expect(getByRole('heading', { name: 'Secondary test', level: 2 })).toBeInTheDocument()
})

test('Converts a cms cookie settings anchor into the nextjs link', () => {
  const { getByRole } = render(<RichText>{`<a href="/cookies?change-settings=1">Change cookie settings</a>`}</RichText>)

  expect(getByRole('link', { name: 'Change cookie settings' })).toHaveAttribute('href', '/cookies?change-settings=1')
})
