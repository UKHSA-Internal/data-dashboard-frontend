'use client'

import clsx from 'clsx'
import upperFirst from 'lodash/upperFirst'
import { Highlight } from 'prism-react-renderer'
import Prism from 'prismjs'
import { useId, useState } from 'react'

import { theme } from './themes/govuk.theme'

export interface CodeBlockSnippet {
  id: string
  language: string
  code: string
}

interface CodeBlockProps {
  snippets: CodeBlockSnippet[]
  className?: string
  heading?: string
}

;(typeof global !== 'undefined' ? global : window).Prism = Prism
require('prismjs/components/prism-json')
require('prismjs/components/prism-python')
require('prismjs/components/prism-r')

export const CodeBlock = ({ snippets, className, heading }: CodeBlockProps) => {
  const selectId = useId()
  const [selectedId, setSelectedId] = useState<string>(snippets[0]?.id ?? '')

  if (snippets.length === 0) return null

  const activeSnippet = snippets.find((snippet) => snippet.id === selectedId) ?? snippets[0]
  const lang = activeSnippet.language.toLowerCase()

  return (
    <>
      {heading && <h4 className="govuk-heading-m">{heading}</h4>}

      {snippets.length > 1 && (
        <div className="govuk-form-group govuk-!-margin-bottom-0 hidden js:block">
          <label className="govuk-visually-hidden" htmlFor={selectId}>
            Select language
          </label>
          <select
            id={selectId}
            className="govuk-select border-none bg-grey-3 pl-3"
            data-testid="code-block-language-select"
            value={activeSnippet.id}
            onChange={(event) => setSelectedId(event.target.value)}
          >
            {snippets.map((snippet) => (
              <option key={snippet.id} value={snippet.id}>
                {upperFirst(snippet.language)}
              </option>
            ))}
          </select>
        </div>
      )}

      <Highlight prism={Prism} theme={theme} code={activeSnippet.code} language={lang}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            style={style}
            // eslint-disable-next-line tailwindcss/no-custom-classname
            className={clsx(
              className,
              `language-${lang} govuk-!-padding-4 govuk-!-margin-bottom-6 print:text-shadow-none overflow-auto`,
              `whitespace-pre-wrap break-all font-[var(--ukhsa-font-code)] text-[var(--colour-code-text)] text-shadow-[0_1px_white]`
            )}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </>
  )
}
