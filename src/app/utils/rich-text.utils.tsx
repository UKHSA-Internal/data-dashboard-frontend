import rehypeToc, { HtmlElementNode } from '@jsdevtools/rehype-toc'
import Link from 'next/link'
import { ComponentProps } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'

type ReactMarkdownProps = ComponentProps<typeof ReactMarkdown>
type Components = ReactMarkdownProps['components']
export type RehypePlugins = NonNullable<ReactMarkdownProps['rehypePlugins']>

/**
 * Default Plugins and components for rich text
 */
export const corePlugins: RehypePlugins = [rehypeRaw]

export const coreComponents: Components = {
  h1: ({ children }) => <h1>{children}</h1>,
  h2: ({ children }) => <h2 className="govuk-heading-l">{children}</h2>,
  h3: ({ children }) => <h3 className="govuk-heading-m">{children}</h3>,
  h4: ({ children }) => <h4 className="govuk-heading-s">{children}</h4>,
  a: ({ children, href }) => {
    if (href?.includes('change-settings=1')) {
      return (
        <Link href={href} className="govuk-link">
          {children}
        </Link>
      )
    }
    return (
      <a href={href} className="govuk-link">
        {children}
      </a>
    )
  },
  ul: ({ children }) => <ul className="govuk-list govuk-list--bullet govuk-list--spaced">{children}</ul>,
  ol: ({ children }) => <ol className="govuk-list govuk-list--number govuk-list--spaced">{children}</ol>,
  li: ({ children }) => <li>{children}</li>,
  p: ({ children }) => <p className="govuk-body">{children}</p>,
  code: ({ children }) => (
    <code className="inline-block max-w-full break-words bg-[var(--colour-code-background)] px-[3px] py-[1px] font-[var(--ukhsa-font-code)] text-[var(--colour-code-dark-red)] text-shadow-[0_1px_white]">
      {children}
    </code>
  ),
}

/**
 * Plugins and components for when a table of contents is required
 */
export const linkedHeadingsPlugins: RehypePlugins = [
  rehypeSlug,
  [
    rehypeToc,
    {
      headings: ['h2'],
      customizeTOC: (toc: HtmlElementNode) => {
        // Ensure that the toc plugin only applies when needed. Without this it will add unused HTML to the DOM
        if (toc && toc.children) {
          const firstChild = toc.children[0] as HtmlElementNode
          if (firstChild && !firstChild.children?.length) {
            return false
          }
        }
        return toc
      },
    },
  ],
]

export const linkedHeadingsComponents: Components = {
  a: ({ children, href }) => {
    if (href?.includes('change-settings=1')) {
      return (
        <Link href={href} className="govuk-link">
          {children}
        </Link>
      )
    }
    return (
      <a href={href} className="govuk-link--no-visited-state govuk-body govuk-!-margin-bottom-0">
        {children}
      </a>
    )
  },
  h2: ({ children, id }) => (
    <h2 className="govuk-!-margin-bottom-0 govuk-heading-l">
      <Link
        href={`#${id}`}
        id={id}
        className="govuk-!-margin-bottom-4 govuk-!-margin-top-3 govuk-link--no-visited-state inline-block"
      >
        {children}
      </Link>
    </h2>
  ),
  nav: ({ children, className }) => {
    if (className?.includes('toc')) {
      return (
        <nav aria-label="Contents" className="govuk-!-margin-bottom-5">
          <h2 className="govuk-body-m govuk-!-margin-bottom-1">Contents</h2>
          {children}
        </nav>
      )
    }
    return <nav>{children}</nav>
  },
  li: ({ children, className, id }) => {
    if (className?.includes('toc')) {
      return (
        <li
          id={id ?? ''}
          className="govuk-!-margin-left-2 govuk-!-margin-bottom-1 bg-dash bg-[left_center] bg-no-repeat pl-6"
        >
          {children}
        </li>
      )
    }
    return <li>{children}</li>
  },
}
