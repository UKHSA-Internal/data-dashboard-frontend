import clsx from 'clsx'
import { ReactNode } from 'react'

import { useTranslation } from '../../../../i18n'

interface RelatedLinksProps {
  children: ReactNode[]
  className?: string
  variant?: 'footer' | 'sidebar'
  heading?: string
}

export async function RelatedLinks({ children, className, variant = 'footer', heading }: RelatedLinksProps) {
  const { t } = await useTranslation('common')

  if (children.length === 0) return null

  return (
    <div
      className={clsx('govuk-!-padding-3 govuk-!-padding-bottom-2 border-blue', className, {
        'govuk-!-margin-top-8 govuk-!-margin-bottom-4 border-t-[10px] ': variant === 'footer',
        'border-t-[2px]': variant === 'sidebar',
      })}
    >
      <h2 className={clsx({ 'govuk-heading-l': variant === 'footer', 'govuk-heading-s': variant === 'sidebar' })}>
        {heading ? heading : t('relatedLinksHeading')}
      </h2>
      <ul
        className={clsx('govuk-list govuk-list--spaced', {
          'govuk-!-font-size-16': variant === 'sidebar',
        })}
      >
        {children}
      </ul>
    </div>
  )
}

interface RelatedLinkProps {
  title: string
  url: string
  children?: string
  className?: string
}

export function RelatedLink({ title, url, children, className }: RelatedLinkProps) {
  return (
    <li className={className}>
      <a
        href={url}
        className={'govuk-link govuk-link--no-visited-state'}
        rel="noreferrer noopener"
        target="_blank"
        aria-label={`${title} (opens in a new window)`}
      >
        {title}
      </a>
      {children && <div dangerouslySetInnerHTML={{ __html: children }} className="break-words" />}
    </li>
  )
}
