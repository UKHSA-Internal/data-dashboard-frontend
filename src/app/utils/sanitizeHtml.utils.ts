/**
 * Strips down an HTML string to a small, safe subset of tags.
 * Anything not in `allowedTags` gets unwrapped (its children are kept,
 * just not the tag itself), and every attribute is stripped from
 * whatever tags do survive. Comments and other weird node types are
 * dropped entirely.
 *
 * Only works in the browser since it relies on DOMParser — on the
 * server it just returns an empty string.
 */
export function sanitizeHtml(html: string, allowedTags: string[] = ['b', 'i', 'em', 'strong', 'ul', 'li']): string {
  if (typeof window === 'undefined') {
    return ''
  }

  const allowed = new Set(allowedTags.map((tag) => tag.toLowerCase()))
  const doc = new DOMParser().parseFromString(html, 'text/html')

  const stripNode = (parent: Node) => {
    const children = Array.from(parent.childNodes)

    for (const node of children) {
      if (node.nodeType === Node.TEXT_NODE) {
        continue
      }

      if (node.nodeType !== Node.ELEMENT_NODE) {
        node.parentNode?.removeChild(node)
        continue
      }

      const element = node as Element
      const tagName = element.tagName.toLowerCase()

      stripNode(element)

      if (!allowed.has(tagName)) {
        const children = Array.from(element.childNodes)
        element.replaceWith(...children)
        continue
      }

      for (const attr of Array.from(element.attributes)) {
        element.removeAttribute(attr.name)
      }
    }
  }

  stripNode(doc.body)
  return doc.body.innerHTML
}
