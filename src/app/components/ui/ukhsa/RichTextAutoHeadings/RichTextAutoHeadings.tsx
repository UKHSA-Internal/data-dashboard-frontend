import ReactMarkdown from 'react-markdown'

import {
  coreComponents,
  corePlugins,
  linkedHeadingsComponents,
  linkedHeadingsPlugins,
} from '@/app/utils/rich-text.utils'

interface RichTextAutoHeadingsProps {
  children: string
}

export const RichTextAutoHeadings = ({ children }: RichTextAutoHeadingsProps) => {
  return (
    <ReactMarkdown
      rehypePlugins={[...corePlugins, ...linkedHeadingsPlugins]}
      components={{ ...coreComponents, ...linkedHeadingsComponents }}
    >
      {children}
    </ReactMarkdown>
  )
}
