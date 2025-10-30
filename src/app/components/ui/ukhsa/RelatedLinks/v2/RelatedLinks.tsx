import clsx from 'clsx'
import { ReactNode } from 'react'

import { RichText } from '@/app/components/cms/RichText/RichText'
import { List } from '@/app/components/ui/ukhsa/List/List'
import { ListItem, ListItemExternalLink } from '@/app/components/ui/ukhsa/List/ListItem'
import { getServerTranslation } from '@/app/i18n'

import { ListItemArrow, ListItemArrowExternalLink } from '../../List/ListItemArrow'

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
        {t('relatedLinksSubHeading')}
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
        <ListItemArrowExternalLink asChild href={url} className="govuk-!-margin-bottom-2 govuk-heading-l">
          {title}
        </ListItemArrowExternalLink>
        {children && (
          <RichText
            components={{
              p: ({ children }: { children: ReactNode }) => <p className="govuk-body-m break-words">{children}</p>,
            }}
          >
            {children}
          </RichText>
        )}
      </ListItemArrow>
    </ListItem>
  )
}

export function RelatedSidebarLink({ title, url, children, className }: RelatedLinkProps) {
  return (
    <ListItem className={className} showRule={false}>
      <ListItemExternalLink href={url} className={'govuk-link govuk-body-s govuk-link--no-visited-state mb-2'}>
        {title}
      </ListItemExternalLink>
      {children && (
        <RichText
          components={{
            p: ({ children }: { children: ReactNode }) => <p className="govuk-body-m break-words">{children}</p>,
          }}
        >
          {children}
        </RichText>
      )}
    </ListItem>
  )
}
