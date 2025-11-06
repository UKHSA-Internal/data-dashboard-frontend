'use client'

import clsx from 'clsx'
import { Highlight } from 'prism-react-renderer'
import Prism from 'prismjs'

import { theme } from './themes/govuk.theme'

interface CodeBlockProps {
  children: string
  language: string
  className?: string
  heading?: string
}

;(typeof global !== 'undefined' ? global : window).Prism = Prism
require('prismjs/components/prism-json')
require('prismjs/components/prism-python')

export const CodeBlock = ({ children, language, className, heading }: CodeBlockProps) => {
  const lang = language.toLowerCase()
  return (
    <>
      {heading && <h4 className="govuk-heading-m">{heading}</h4>}
      <Highlight prism={Prism} theme={theme} code={children} language={lang}>
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
