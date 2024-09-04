import clsx from 'clsx'
import { ReactNode } from 'react'

import { List } from '@/app/components/ui/ukhsa/List/List'
import { ListItem } from '@/app/components/ui/ukhsa/List/ListItem'
import { getServerTranslation } from '@/app/i18n'

import { ListItemArrow, ListItemArrowLink } from '../../List/ListItemArrow'

interface RelatedLinksProps {
  children: ReactNode[]
  className?: string
  variant: 'footer' | 'sidebar'
  heading?: string
}

export async function RelatedLinks({ children, className, variant, heading }: RelatedLinksProps) {
  const { t } = await getServerTranslation('common')

  if (children.length === 0) return null

  return (
    <div
      className={clsx('govuk-!-padding-bottom-2 border-blue', className, {
        'govuk-!-margin-top-9 govuk-!-margin-bottom-4 border-t-[3px] ': variant === 'footer',
        'border-t-[2px] govuk-!-padding-3': variant === 'sidebar',
      })}
    >
      <h2
        className={clsx({
          'govuk-heading-l govuk-!-margin-top-8 govuk-!-margin-bottom-0': variant === 'footer',
          'govuk-heading-s': variant === 'sidebar',
        })}
      >
        {heading ? heading : t('relatedLinksHeading')}
      </h2>
      <h3
        className={clsx({
          'govuk-body-m govuk-!-margin-top-2 govuk-!-margin-bottom-7 text-grey-1': variant === 'footer',
          hidden: variant === 'sidebar',
        })}
      >
        {/* TODO: This should come from CMS */}
        Learn more about dashboard topics
      </h3>
      {variant === 'sidebar' ? (
        <ul className="govuk-list govuk-list--spaced govuk-!-font-size-16">{children}</ul>
      ) : (
        <List>{children}</List>
      )}
    </div>
  )
}

interface RelatedLinkProps {
  title: string
  url: string
  children?: string
  className?: string
}

export function RelatedLink({ title, url, children }: RelatedLinkProps) {
  return (
    <ListItem>
      <ListItemArrow>
        <ListItemArrowLink href={url} className="govuk-!-margin-bottom-2">
          {title}
        </ListItemArrowLink>
        {children && <div dangerouslySetInnerHTML={{ __html: children }} className="govuk-body-m break-words" />}
      </ListItemArrow>
    </ListItem>
  )
}

export function RelatedSidebarLink({ title, url, children, className }: RelatedLinkProps) {
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
