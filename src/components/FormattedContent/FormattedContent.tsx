import rehypeToc from '@jsdevtools/rehype-toc'
import { H1, H2, H3, Link, ListItem, UnorderedList } from 'govuk-react'
import { ComponentProps } from 'react'
import type ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'

import { Contents } from '../Contents'
import { Container } from './FormattedContent.styles'

type ReactMarkdownProps = ComponentProps<typeof ReactMarkdown>
type Plugins = ReactMarkdownProps['rehypePlugins']
type Components = ReactMarkdownProps['components']

/**
 * The below plugins & component mappings apply by default whenever using this component
 */
const corePlugins: Plugins = [rehypeRaw]
const coreComponents: Components = {
  h1: ({ children }) => <H1>{children}</H1>,
  h2: ({ children }) => <H2>{children}</H2>,
  h3: ({ children }) => <H3>{children}</H3>,
  a: ({ children, href }) => (
    <Link href={href} target="_blank">
      {children}
    </Link>
  ),
  ul: ({ children }) => <UnorderedList>{children}</UnorderedList>,
  li: ({ children }) => <ListItem>{children}</ListItem>,
}

/**
 * Plugins and components when a table of contents is needed by using the `hasLinkedHeadings` prop
 */
const linkedHeadingsPlugins: Plugins = [rehypeSlug, [rehypeToc, { headings: ['h2'] }]]
const linkedHeadingsComponents: Components = {
  a: ({ children, href }) => <Link href={href}>{children}</Link>,
  h2: ({ children, id }) => <Contents.SectionHeading id={id ?? ''}>{children}</Contents.SectionHeading>,
  nav: ({ children, className }) => {
    if (className?.includes('toc')) {
      return <Contents.Nav>{children}</Contents.Nav>
    }
    return <nav>{children}</nav>
  },
  li: ({ children, className, id }) => {
    if (className?.includes('toc')) {
      return <Contents.NavListItem id={id ?? ''}>{children}</Contents.NavListItem>
    }
    return <ListItem>{children}</ListItem>
  },
}

interface FormattedContentProps {
  children: string
  hasLinkedHeadings?: boolean
}

export const FormattedContent = ({ children, hasLinkedHeadings = false }: FormattedContentProps) => {
  const rehypePlugins: Plugins = corePlugins

  if (hasLinkedHeadings) {
    rehypePlugins.push(...linkedHeadingsPlugins)
  }

  const components = { ...coreComponents, ...(hasLinkedHeadings && linkedHeadingsComponents) }

  return (
    <>
      <Container $hasLinkedHeadings={hasLinkedHeadings} rehypePlugins={rehypePlugins} components={components}>
        {children}
      </Container>
    </>
  )
}
