import clsx from 'clsx'
import dayjs from 'dayjs'
import { kebabCase } from 'lodash'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { Trans } from 'react-i18next/TransWithoutContext'
import { SafeParseSuccess } from 'zod'

import { getWhatsNewPages, PageType, WhatsNewPagesResponse } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RichText } from '@/app/components/cms'
import {
  Details,
  Pagination,
  PaginationListItem,
  PaginationListItems,
  PaginationNext,
  PaginationPrevious,
} from '@/app/components/ui/govuk'
import { usePaginationList } from '@/app/components/ui/govuk/Pagination/hooks/usePaginationList'
import { RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
import { WHATS_NEW_PAGE_SIZE } from '@/app/constants/app.constants'
import { useReturnPathWithParams } from '@/app/hooks/useReturnPathWithParams'
import { useTranslation } from '@/app/i18n'
import { logger } from '@/lib/logger'

interface WhatsNewParentPageProps {
  searchParams: {
    page?: number
  }
}

export async function generateMetadata({ searchParams: { page = 1 } }: WhatsNewParentPageProps): Promise<Metadata> {
  const { t } = await useTranslation('whatsNew')

  const {
    meta: { seo_title, search_description },
  } = await getPageBySlug('whats-new', { type: PageType.WhatsNewParent })

  const whatsNewEntries = await getWhatsNewPages({ page })

  if (!whatsNewEntries.success) {
    logger.info(whatsNewEntries.error.message)
    return redirect('/error')
  }

  const {
    data: {
      meta: { total_count: totalItems },
    },
  } = whatsNewEntries

  const totalPages = Math.ceil(totalItems / WHATS_NEW_PAGE_SIZE) || 1

  const title = seo_title.replace('|', t('documentTitlePagination', { page, totalPages }))

  return {
    title,
    description: search_description,
  }
}

export default async function WhatsNewParentPage({ searchParams: { page } }: WhatsNewParentPageProps) {
  const { t } = await useTranslation('whatsNew')

  const setReturnPath = useReturnPathWithParams()

  const {
    title,
    body,
    last_published_at: lastUpdated,
    related_links: relatedLinks,
  } = await getPageBySlug<PageType.WhatsNewParent>('whats-new', { type: PageType.WhatsNewParent })

  const whatsNewEntries = await getWhatsNewPages({ page })

  if (!whatsNewEntries.success) {
    logger.info(whatsNewEntries.error.message)
    return redirect('/error')
  }

  if (!whatsNewEntries.data.items.length) {
    logger.error('No whats-new entries found, redirecting to 404 page')
    return notFound()
  }

  const {
    data: {
      items,
      meta: { total_count: totalItems },
    },
  } = whatsNewEntries

  const { previousPageHref, nextPageHref, pages, currentPage } = usePaginationList({
    totalItems,
    initialPage: page ?? 1,
    initialPageSize: WHATS_NEW_PAGE_SIZE,
  })

  type Page = SafeParseSuccess<WhatsNewPagesResponse>['data']['items']

  const datesByMonth: Record<string, Page> = {}

  // Iterate through the dates and group them by month
  items.forEach((item) => {
    const month = dayjs(item.date_posted).format('MMMM YYYY')

    if (!datesByMonth[month]) {
      datesByMonth[month] = []
    }

    datesByMonth[month].push(item)
  })

  // Convert the grouped dates into an array of lists ordered by month
  const entriesByDate = Object.entries(datesByMonth).sort(
    ([first], [second]) => new Date(second).valueOf() - new Date(first).valueOf()
  )

  return (
    <View heading={title} lastUpdated={lastUpdated}>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          <RichText>{body}</RichText>

          <ul className="govuk-list govuk-!-margin-top-7" aria-label={title}>
            {entriesByDate.map(([date, entries], idx) => {
              const entriesNewest = entries.sort(
                (first, second) => new Date(second.date_posted).valueOf() - new Date(first.date_posted).valueOf()
              )

              return (
                <li
                  key={date}
                  aria-describedby={`month-${kebabCase(date)}`}
                  className={clsx('border-grey-2 [&:not(:last-child)]:border-b', {
                    'govuk-!-margin-bottom-7 govuk-!-padding-bottom-5': idx < entriesByDate.length - 1,
                  })}
                >
                  <header>
                    <h2 id={`month-${kebabCase(date)}`} className="govuk-heading-m govuk-!-margin-bottom-6">
                      <time dateTime={date}>
                        <Trans
                          i18nKey="monthHeader"
                          t={t}
                          components={[<span key={0} className="govuk-visually-hidden" />]}
                          values={{ value: date }}
                        />
                      </time>
                    </h2>
                  </header>
                  <ul className="govuk-list govuk-!-margin-0">
                    {entriesNewest.map((item, entryIndex) => {
                      return (
                        <li
                          key={item.id}
                          className={clsx('govuk-body-s govuk-!-margin-top-4', {
                            'govuk-!-margin-bottom-8': entryIndex < entries.length - 1,
                          })}
                        >
                          <h3 className="govuk-heading-s govuk-!-margin-bottom-3">
                            <small className="govuk-caption-m govuk-!-margin-bottom-2">
                              <time dateTime={item.date_posted}>
                                <Trans
                                  i18nKey="entryDate"
                                  t={t}
                                  components={[<span key={0} className="govuk-visually-hidden" />]}
                                  values={{ value: item.date_posted }}
                                />
                              </time>
                            </small>

                            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 whitespace-nowrap">
                              {item.badge ? (
                                <div className={`govuk-tag govuk-tag--${item.badge.colour}`}>
                                  <Trans
                                    i18nKey="entryCategory"
                                    t={t}
                                    components={[<span key={0} className="govuk-visually-hidden" />]}
                                    values={{ value: item.badge.text }}
                                  />
                                </div>
                              ) : null}
                              <Trans
                                i18nKey="entryTitle"
                                t={t}
                                components={[
                                  <Link
                                    key={0}
                                    className="whitespace-normal"
                                    href={setReturnPath(`whats-new/${item.meta.slug}`)}
                                  >
                                    <span className="govuk-visually-hidden" key={1} />
                                  </Link>,
                                ]}
                                values={{ value: item.title }}
                              />
                            </div>
                          </h3>
                          <div className="govuk-body-s govuk-!-margin-bottom-0 govuk-!-margin-top-3">
                            <RichText>{item.body}</RichText>
                          </div>
                          {item.additional_details && (
                            <Details label={t('additionalInformationLabel')}>
                              <RichText>{item.additional_details}</RichText>
                            </Details>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </li>
              )
            })}
          </ul>

          {pages.length > 0 && (
            <Pagination variant="list-item" className="govuk-!-margin-top-8">
              {previousPageHref && <PaginationPrevious variant="list-item" href={previousPageHref} />}

              <PaginationListItems>
                {pages.map(({ page, href }) => (
                  <PaginationListItem key={page} href={href} current={currentPage === page}>
                    {page}
                  </PaginationListItem>
                ))}
              </PaginationListItems>

              {nextPageHref && <PaginationNext variant="list-item" href={nextPageHref} />}
            </Pagination>
          )}
        </div>
      </div>

      <RelatedLinks variant="footer">
        {relatedLinks.map(({ title, body, url, id }) => (
          <RelatedLink key={id} url={url} title={title}>
            {body}
          </RelatedLink>
        ))}
      </RelatedLinks>
    </View>
  )
}
