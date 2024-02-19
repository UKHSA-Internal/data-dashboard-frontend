import { render } from '@/config/test-utils'

import { CodeBlock } from './CodeBlock'

const mockCodeSnippet = `<body><h1>hello world</h1></body>`

test('Displays the code block', () => {
  const { container } = render(<CodeBlock language="html">{mockCodeSnippet}</CodeBlock>)

  expect(container.firstChild).toHaveClass('language-html')
  expect(container).toMatchSnapshot()
})

test('Custom class name', () => {
  const { container } = render(
    <CodeBlock language="javascript" className="govuk-!-margin-4">
      {mockCodeSnippet}
    </CodeBlock>
  )

  expect(container.firstChild).toHaveClass('language-javascript')
  expect(container.firstChild).toHaveClass('govuk-!-margin-4')
})
