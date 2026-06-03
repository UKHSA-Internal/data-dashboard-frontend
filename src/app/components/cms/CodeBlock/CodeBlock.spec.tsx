import userEvent from '@testing-library/user-event'

import { render, screen } from '@/config/test-utils'

import { CodeBlock, CodeBlockSnippet } from './CodeBlock'

const htmlSnippet: CodeBlockSnippet = {
  id: 'html-1',
  language: 'html',
  code: '<body><h1>hello world</h1></body>',
}

const jsSnippet: CodeBlockSnippet = {
  id: 'js-1',
  language: 'javascript',
  code: 'const greeting = "hello world"',
}

const pythonSnippet: CodeBlockSnippet = {
  id: 'py-1',
  language: 'python',
  code: 'greeting = "hello world"',
}

test('Displays the code block for a single snippet without a language dropdown', () => {
  const { container } = render(<CodeBlock snippets={[htmlSnippet]} />)

  expect(container.querySelector('pre')).toHaveClass('language-html')
  expect(screen.queryByTestId('code-block-language-select')).not.toBeInTheDocument()
  expect(container).toMatchSnapshot()
})

test('Renders the heading when provided', () => {
  render(<CodeBlock heading="Example request" snippets={[jsSnippet]} />)

  expect(screen.getByRole('heading', { level: 4, name: 'Example request' })).toBeInTheDocument()
})

describe('multiple snippets', () => {
  test('Displays a language dropdown with one option per snippet', () => {
    render(<CodeBlock snippets={[jsSnippet, pythonSnippet]} />)

    const select = screen.getByTestId('code-block-language-select')
    expect(select).toBeInTheDocument()

    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(2)
    expect(options[0]).toHaveTextContent('Javascript')
    expect(options[1]).toHaveTextContent('Python')
  })

  test('Defaults to highlighting the first snippet', () => {
    const { container } = render(<CodeBlock snippets={[jsSnippet, pythonSnippet]} />)

    expect(container.querySelector('pre')).toHaveClass('language-javascript')
  })

  test('Switches the highlighted snippet when a different language is selected', async () => {
    const user = userEvent.setup()
    const { container } = render(<CodeBlock snippets={[jsSnippet, pythonSnippet]} />)

    await user.selectOptions(screen.getByTestId('code-block-language-select'), pythonSnippet.id)

    expect(container.querySelector('pre')).toHaveClass('language-python')
  })
})
