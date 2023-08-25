import ReactMarkdown from 'react-markdown'

import {
  coreComponents,
  corePlugins,
  linkedHeadingsComponents,
  linkedHeadingsPlugins,
  RehypePlugins,
} from '@/app/utils/rich-text.utils'

interface RichTextProps {
  children: string
  linkedHeadings?: boolean
}

export const RichText = ({ children, linkedHeadings }: RichTextProps) => {
  const rehypePlugins: RehypePlugins = corePlugins || []

  if (linkedHeadings && children.includes('<h2>')) {
    rehypePlugins.push(...(linkedHeadingsPlugins || []))
  }

  const components = { ...coreComponents, ...(linkedHeadings && linkedHeadingsComponents) }

  return (
    <>
      <ReactMarkdown rehypePlugins={corePlugins} components={components}>
        {children}
      </ReactMarkdown>
    </>
  )
}
