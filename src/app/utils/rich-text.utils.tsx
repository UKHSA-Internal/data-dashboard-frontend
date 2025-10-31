/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */

import rehypeToc, { HtmlElementNode } from '@jsdevtools/rehype-toc'
import Link from 'next/link'
import { ComponentProps, ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'

type ReactMarkdownProps = ComponentProps<typeof ReactMarkdown>
export type RehypePlugins = NonNullable<ReactMarkdownProps['rehypePlugins']>

/**
 * Default Plugins and components for rich text
 */
export const corePlugins: any = [rehypeRaw]

export const coreComponents: any = {
  h1: ({ children }: { children: ReactNode }) => <h1>{children}</h1>,
  h2: ({ children }: { children: ReactNode }) => <h2 className="govuk-heading-l">{children}</h2>,
  h3: ({ children }: { children: ReactNode }) => <h3 className="govuk-heading-m">{children}</h3>,
  h4: ({ children }: { children: ReactNode }) => <h4 className="govuk-heading-s">{children}</h4>,
  a: ({ children, ...props }: { children: ReactNode; [key: string]: any }) => {
    const href = 'href' in props ? props.href : undefined
    if (typeof href === 'string' && href.includes('change-settings=1')) {
      return (
        <Link href={href} className="govuk-link">
          {children}
        </Link>
      )
    }
    return (
      <a href={typeof href === 'string' ? href : undefined} className="govuk-link">
        {children}
      </a>
    )
  },
  ul: ({ children }: { children: ReactNode }) => (
    <ul className="govuk-list govuk-list--bullet govuk-list--spaced">{children}</ul>
  ),
  ol: ({ children }: { children: ReactNode }) => (
    <ol className="govuk-list govuk-list--number govuk-list--spaced">{children}</ol>
  ),
  li: ({ children }: { children: ReactNode }) => <li>{children}</li>,
  p: ({ children }: { children: ReactNode }) => <p className="govuk-body">{children}</p>,
  code: ({ children }: { children: ReactNode }) => (
    <code className="inline-block max-w-full break-words bg-[var(--colour-code-background)] px-[3px] py-[1px] font-[var(--ukhsa-font-code)] text-[var(--colour-code-dark-red)] text-shadow-[0_1px_white]">
      {children}
    </code>
  ),
}

/**
 * Plugins and components for when a table of contents is required
 */
export const linkedHeadingsPlugins: any = [
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

export const linkedHeadingsComponents: any = {
  a: ({ children, ...props }: { children: ReactNode; [key: string]: any }) => {
    const href = 'href' in props ? (props.href as string) : undefined
    if (typeof href === 'string' && href.includes('change-settings=1')) {
      return (
        <Link href={href} className="govuk-link">
          {children}
        </Link>
      )
    }
    return (
      <a
        href={typeof href === 'string' ? href : undefined}
        className="govuk-link--no-visited-state govuk-body govuk-!-margin-bottom-0"
      >
        {children}
      </a>
    )
  },
  h2: ({ children, ...props }: { children: ReactNode; [key: string]: any }) => {
    const id = 'id' in props ? (props.id as string) : undefined
    return (
      <h2 className="govuk-!-margin-bottom-0 govuk-heading-l">
        <Link
          href={`#${id}`}
          id={typeof id === 'string' ? id : undefined}
          className="govuk-!-margin-bottom-4 govuk-!-margin-top-3 govuk-link--no-visited-state inline-block"
        >
          {children}
        </Link>
      </h2>
    )
  },
  nav: ({ children, ...props }: { children: ReactNode; [key: string]: any }) => {
    const className = 'className' in props ? (props.className as string) : undefined
    if (typeof className === 'string' && className.includes('toc')) {
      return (
        <nav aria-label="Contents" className="govuk-!-margin-bottom-5">
          <h2 className="govuk-body-m govuk-!-margin-bottom-1">Contents</h2>
          {children}
        </nav>
      )
    }
    return <nav>{children}</nav>
  },
  li: ({ children, ...props }: { children: ReactNode; [key: string]: any }) => {
    const className = 'className' in props ? (props.className as string) : undefined
    const id = 'id' in props ? (props.id as string) : undefined
    if (typeof className === 'string' && className.includes('toc')) {
      return (
        <li
          id={typeof id === 'string' ? id : ''}
          className="govuk-!-margin-left-2 govuk-!-margin-bottom-1 bg-dash bg-[left_center] bg-no-repeat pl-6"
        >
          {children}
        </li>
      )
    }
    return <li>{children}</li>
  },
}
