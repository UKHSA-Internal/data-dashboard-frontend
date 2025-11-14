import React, { createElement } from 'react'

interface ReactMarkdownProps {
  children: string
  className?: string
  components?: Record<string, React.ComponentType<any>>
  remarkPlugins?: any[]
  rehypePlugins?: any[]
}

/**
 * Generates a URL-friendly slug from text
 */
const generateSlug = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

/**
 * Extracts plain text from HTML string
 */
const getTextContent = (html: string): string => {
  return html.replace(/<[^>]*>/g, '').trim()
}

/**
 * Mock implementation of react-markdown that simulates rehype plugins
 *
 * This mock handles:
 * - rehypeSlug: Adds IDs to heading elements
 * - rehypeToc: Generates table of contents from H2 headings
 */
const ReactMarkdown: React.FC<ReactMarkdownProps> = ({ children, className, components = {}, rehypePlugins = [] }) => {
  // Detect if TOC plugin is present (looks for array format: [plugin, options])
  const shouldGenerateTOC = rehypePlugins.some((plugin) => Array.isArray(plugin) && plugin.length > 0)

  /**
   * Extracts all H2 headings and generates IDs for them
   * Simulates what rehypeSlug does
   */
  const extractH2Headings = (html: string): Array<{ text: string; id: string }> => {
    const h2Regex = /<h2[^>]*>(.*?)<\/h2>/gs
    const headings: Array<{ text: string; id: string }> = []
    let match

    while ((match = h2Regex.exec(html)) !== null) {
      const text = getTextContent(match[1])
      const id = generateSlug(text)
      headings.push({ text, id })
    }

    return headings
  }

  /**
   * Parses HTML string and converts to React elements
   * Applies custom components and adds IDs to headings
   */
  const parseHTML = (html: string): React.ReactNode => {
    const elements: React.ReactNode[] = []
    const h2Headings = extractH2Headings(html)

    const regex = /<(\w+)([^>]*)>(.*?)<\/\1>/gs
    let lastIndex = 0
    let match
    let h2Index = 0

    while ((match = regex.exec(html)) !== null) {
      // Add text before the tag
      if (match.index > lastIndex) {
        const text = html.slice(lastIndex, match.index)
        if (text.trim()) elements.push(text)
      }

      const [, tagName, attrsString, content] = match
      const Component = components[tagName]

      // Parse attributes
      const attrs: Record<string, string> = {}
      const attrRegex = /(\w+)="([^"]*)"/g
      let attrMatch
      while ((attrMatch = attrRegex.exec(attrsString)) !== null) {
        attrs[attrMatch[1]] = attrMatch[2]
      }

      // Simulate rehypeSlug: Add ID to h2 elements
      if (tagName === 'h2' && h2Index < h2Headings.length) {
        attrs.id = h2Headings[h2Index].id
        h2Index++
      }

      // Recursively parse content
      const childContent = parseHTML(content)

      if (Component) {
        elements.push(createElement(Component, { key: match.index, ...attrs }, childContent))
      } else {
        elements.push(createElement(tagName, { key: match.index, ...attrs }, childContent))
      }

      lastIndex = regex.lastIndex
    }

    // Add remaining text
    if (lastIndex < html.length) {
      const text = html.slice(lastIndex)
      if (text.trim()) elements.push(text)
    }

    return elements.length === 1 ? elements[0] : <>{elements}</>
  }

  /**
   * Generates table of contents from H2 headings
   * Simulates what rehypeToc does
   */
  const generateTOC = () => {
    const headings = extractH2Headings(children)

    if (headings.length === 0) {
      return null
    }

    const NavComponent = components.nav
    const LiComponent = components.li
    const AComponent = components.a

    const tocItems = headings.map((heading, index) => {
      const linkElement = AComponent
        ? createElement(AComponent, { key: `link-${index}`, href: `#${heading.id}` }, heading.text)
        : createElement('a', { key: `link-${index}`, href: `#${heading.id}` }, heading.text)

      return LiComponent
        ? createElement(
            LiComponent,
            { key: index, className: 'toc-level toc-level-1', id: `toc-${heading.id}` },
            linkElement
          )
        : createElement('li', { key: index, className: 'toc-level toc-level-1', id: `toc-${heading.id}` }, linkElement)
    })

    const olElement = createElement('ol', { className: 'toc-list' }, tocItems)

    return NavComponent
      ? createElement(NavComponent, { className: 'toc', 'aria-label': 'Contents' }, olElement)
      : createElement('nav', { className: 'toc', 'aria-label': 'Contents' }, olElement)
  }

  const parsedContent = parseHTML(children)
  const toc = shouldGenerateTOC ? generateTOC() : null

  return (
    <div className={className} data-testid="react-markdown">
      {toc}
      {parsedContent}
    </div>
  )
}

export default ReactMarkdown
