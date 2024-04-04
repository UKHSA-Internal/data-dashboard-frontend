import ReactMarkdown from 'react-markdown'

import { coreComponents, corePlugins } from '@/app/utils/rich-text.utils'

interface RichTextProps {
  children: string
  className?: string
}

export const RichText = ({ children, className }: RichTextProps) => {
  return (
    <ReactMarkdown rehypePlugins={corePlugins} components={coreComponents} className={className}>
      {children}
    </ReactMarkdown>
  )
}
