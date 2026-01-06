import ReactMarkdown from 'react-markdown'

import { coreComponents, corePlugins } from '@/app/utils/rich-text.utils'

interface RichTextProps {
  children: string
  className?: string
  components?: typeof coreComponents
}

export const RichText = ({ children, components, className }: RichTextProps) => {
  return (
    <div className={className}>
      <ReactMarkdown rehypePlugins={corePlugins} components={{ ...coreComponents, ...components }}>
        {children}
      </ReactMarkdown>
    </div>
  )
}
