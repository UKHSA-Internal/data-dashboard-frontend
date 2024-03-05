import ReactMarkdown from 'react-markdown'

import { coreComponents, corePlugins } from '@/app/utils/rich-text.utils'

interface RichTextProps {
  children: string
}

export const RichText = ({ children }: RichTextProps) => {
  return (
    <ReactMarkdown rehypePlugins={corePlugins} components={coreComponents}>
      {children}
    </ReactMarkdown>
  )
}
