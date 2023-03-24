import { H1, H2, H3, Link, ListItem, UnorderedList } from 'govuk-react'
import rehypeRaw from 'rehype-raw'
import rehypeToc from '@jsdevtools/rehype-toc'
import rehypeSlug from 'rehype-slug'
import type ReactMarkdown from 'react-markdown'
import { Container } from './FormattedContent.styles'
import { Contents } from '../Contents'
import { ComponentProps } from 'react'

type ReactMarkdownProps = ComponentProps<typeof ReactMarkdown>
type Plugins = ReactMarkdownProps['rehypePlugins']
type Components = ReactMarkdownProps['components']

/**
 * The below plugins & component mappings apply by default whenever using this component
 */
const corePlugins: Plugins = [rehypeRaw]
const coreComponents: Components = {
  h1: ({ ...props }) => <H1>{props.children}</H1>,
  h2: ({ ...props }) => <H2>{props.children}</H2>,
  h3: ({ ...props }) => <H3>{props.children}</H3>,
  a: ({ ...props }) => <Link href={props.href}>{props.children}</Link>,
  ul: ({ ...props }) => <UnorderedList>{props.children}</UnorderedList>,
  li: ({ ...props }) => <ListItem>{props.children}</ListItem>,
}

/**
 * Plugins and components when a table of contents is needed by using the `hasLinkedHeadings` prop
 */
const linkedHeadingsPlugins: Plugins = [rehypeSlug, [rehypeToc, { headings: ['h2'] }]]
const linkedHeadingsComponents: Components = {
  a: ({ ...props }) => <Link href={props.href}>{props.children}</Link>,
  h2: ({ ...props }) => <Contents.SectionHeading id={props.id ?? ''}>{props.children}</Contents.SectionHeading>,
  nav: ({ ...props }) => {
    if (props.className?.includes('toc')) {
      return <Contents.Nav>{props.children}</Contents.Nav>
    }
    return <nav>{props.children}</nav>
  },
  li: ({ ...props }) => {
    if (props.className?.includes('toc')) {
      return <Contents.NavListItem id={props.id ?? ''}>{props.children}</Contents.NavListItem>
    }
    return <ListItem>{props.children}</ListItem>
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
      <Container hasLinkedHeadings={hasLinkedHeadings} rehypePlugins={rehypePlugins} components={components}>
        {children}
      </Container>
    </>
  )
}
