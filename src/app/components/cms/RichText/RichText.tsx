import { Fragment, useId } from 'react'
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

  const id = useId()

  const showLinkedHeadings = linkedHeadings && children.includes('h2')

  if (showLinkedHeadings) {
    rehypePlugins.push(...(linkedHeadingsPlugins || []))
  }

  const components = { ...coreComponents, ...(showLinkedHeadings && linkedHeadingsComponents) }

  return (
    <Fragment key={id}>
      <ReactMarkdown rehypePlugins={corePlugins} components={components}>
        {children}
      </ReactMarkdown>
    </Fragment>
  )
}
