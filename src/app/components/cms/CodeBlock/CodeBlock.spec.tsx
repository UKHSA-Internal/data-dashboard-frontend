import { render } from '@/config/test-utils'

import { CodeBlock } from './CodeBlock'

const mockCodeSnippet =
  '<h1>Primary test</h1><h2>Secondary test</h2><h3>Tertiary test</h3><a href="/test">Link test</a><ul><li>List item test</li></ul>'

test('Displays the code block', () => {
  const { container } = render(<CodeBlock language="html">{mockCodeSnippet}</CodeBlock>)

  expect(container).not.toBeEmptyDOMElement()
})
