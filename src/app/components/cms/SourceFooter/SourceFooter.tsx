import clsx from 'clsx'
import Link from 'next/link'

export type CmsSource = {
  readonly link_display_text?: string | null
  readonly page?: string | null
  readonly external_url?: string | null
}

export type SourceFooterProps = {
  readonly source?: CmsSource | null
  readonly resolvePageHref?: (page: string) => string
  readonly className?: string
  readonly linkClassName?: string
  readonly testId?: string
}

export function hasSource(source?: CmsSource | null): boolean {
  return Boolean(source && (source.external_url || source.page) && source?.link_display_text)
}

export function SourceFooter({
  source,
  resolvePageHref = (page: string) => page,
  className,
  linkClassName,
  testId = 'cms-source',
}: SourceFooterProps) {
  if (!hasSource(source)) return null

  let href: string | null = null
  if (source?.external_url) {
    href = source.external_url
  } else if (source?.page) {
    href = resolvePageHref(source.page)
  }
  const text = source?.link_display_text ?? null
  const isExternal = Boolean(source?.external_url && !source?.page)

  if (!href || !text) return null

  return (
    <div className={className} data-testid={testId}>
      <p className="govuk-body-s mb-0 text-grey-1">
        Source:{' '}
        <Link
          className={clsx('govuk-link govuk-link--no-visited-state', linkClassName)}
          href={href}
          prefetch={!isExternal}
          {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
        >
          {text}
        </Link>
      </p>
    </div>
  )
}
