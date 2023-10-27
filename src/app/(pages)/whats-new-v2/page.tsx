import clsx from 'clsx'
import dayjs from 'dayjs'
import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { SafeParseSuccess } from 'zod'

import { getWhatsNewPages, PageType, WhatsNewPagesResponse } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RichText } from '@/app/components/cms'
import { Details } from '@/app/components/ui/govuk'
import { RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
import { useTranslation } from '@/app/i18n'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const {
    meta: { seo_title, search_description },
  } = await getPageBySlug('whats-new-v2', PageType.WhatsNewParent)

  return {
    title: seo_title,
    description: search_description,
  }
}

export default async function WhatsNewParentPage() {
  const { t } = await useTranslation('common')

  const {
    title,
    body,
    last_published_at: lastUpdated,
    related_links: relatedLinks,
  } = await getPageBySlug('whats-new-v2', PageType.WhatsNewParent)

  const whatsNewEntries = await getWhatsNewPages()

  if (!whatsNewEntries.success) {
    return redirect('/error')
  }

  const {
    data: { items },
  } = whatsNewEntries

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
  const entriesByDate = Object.entries(datesByMonth)

  return (
    <View heading={title} lastUpdated={lastUpdated}>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          <RichText linkedHeadings>{body}</RichText>

          <ul className="govuk-list govuk-!-margin-top-7">
            {entriesByDate.map(([date, entries], idx) => {
              return (
                <li
                  key={idx}
                  className={clsx('border-grey-2 [&:not(:last-child)]:border-b', {
                    'govuk-!-margin-bottom-7 govuk-!-padding-bottom-5': idx < entriesByDate.length - 1,
                  })}
                >
                  <header>
                    <h2 className="govuk-heading-m govuk-!-margin-bottom-6">
                      <time dateTime={date}>
                        <span className="govuk-visually-hidden">List of changes in the month of</span>
                        {date}
                      </time>
                    </h2>
                  </header>
                  <ul className="govuk-list govuk-!-margin-0">
                    {entries.map((item, entryIndex) => {
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
                                <span className="govuk-visually-hidden">Date:</span>
                                {t('whatsNew.entry.date', { value: item.date_posted })}
                              </time>
                            </small>

                            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 whitespace-nowrap">
                              <div className={`govuk-tag govuk-tag--${item.badge.colour}`}>
                                <span className="govuk-visually-hidden">Category:</span>
                                {item.badge.text}
                              </div>
                              <Link className="whitespace-normal" href={`/whats-new/${item.meta.slug}`}>
                                {item.title}
                              </Link>
                            </div>
                          </h3>
                          <div className="govuk-body-s govuk-!-margin-bottom-0 govuk-!-margin-top-3">
                            <RichText>{item.body}</RichText>
                          </div>
                          {item.additional_details && (
                            <Details label="Additional information">
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
        </div>
      </div>

      <RelatedLinks>
        {relatedLinks.map(({ title, body, url, id }) => (
          <RelatedLink key={id} url={url} title={title}>
            {body}
          </RelatedLink>
        ))}
      </RelatedLinks>
    </View>
  )
}
