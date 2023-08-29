import clsx from 'clsx'
import { ReactNode } from 'react'

import { useTranslation } from '../../../../i18n'

interface RelatedLinksProps {
  children: ReactNode[]
  className?: string
}

export async function RelatedLinks({ children, className }: RelatedLinksProps) {
  const { t } = await useTranslation('common')

  if (children.length === 0) return null

  return (
    <div
      className={clsx(
        'govuk-!-margin-top-8 govuk-!-margin-bottom-4 govuk-!-padding-3 govuk-!-padding-bottom-2 border-t-[10px] border-blue',
        className
      )}
    >
      <h2 className="govuk-heading-l">{t('relatedLinksHeading')}</h2>
      <ul className="govuk-list govuk-list--spaced">{children}</ul>
    </div>
  )
}

interface RelatedLinkProps {
  title: string
  url: string
  children: string
  className?: string
}

export function RelatedLink({ title, url, children, className }: RelatedLinkProps) {
  return (
    <li className={clsx('', className)}>
      <a href={url} rel="noreferrer noopener" target="_blank" aria-label={`${title} (opens in a new window)`}>
        {title}
      </a>
      <div dangerouslySetInnerHTML={{ __html: children }} />
    </li>
  )
}
