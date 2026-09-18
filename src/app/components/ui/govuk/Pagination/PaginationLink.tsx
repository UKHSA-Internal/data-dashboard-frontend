import { format, type UrlObject } from 'node:url'

import Link from 'next/link'
import type { AnchorHTMLAttributes, ReactNode } from 'react'

interface PaginationLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  children: ReactNode
  href: string | UrlObject
  reloadDocument?: boolean
}

export const PaginationLink = ({ children, href, reloadDocument = false, ...props }: PaginationLinkProps) => {
  if (reloadDocument) {
    return (
      <a {...props} href={typeof href === 'string' ? href : format(href)}>
        {children}
      </a>
    )
  }

  return (
    <Link {...props} href={href} prefetch={false}>
      {children}
    </Link>
  )
}
