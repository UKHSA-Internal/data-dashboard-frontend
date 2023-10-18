'use client'
import 'highlight.js/styles/default.css'
import './highlight.css'

import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'
import { useEffect } from 'react'
hljs.registerLanguage('javascript', javascript)

interface CodeBlockProps {
  code: string
}

const CodeBlock = ({ code }: CodeBlockProps) => {
  useEffect(() => {
    hljs.initHighlighting()
  }, [])

  return (
    <pre>
      <code className="language-javascript">{code}</code>
    </pre>
  )
}

export default CodeBlock
