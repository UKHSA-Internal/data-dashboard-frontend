import clsx from 'clsx'
import dayjs from 'dayjs'
import { kebabCase } from 'lodash'
import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Trans } from 'react-i18next/TransWithoutContext'
import { SafeParseSuccess } from 'zod'

import { getWhatsNewPages, PageType, WhatsNewPagesResponse } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RichText } from '@/app/components/cms'
import { Details } from '@/app/components/ui/govuk'
import { RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
import { useTranslation } from '@/app/i18n'
import { logger } from '@/lib/logger'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const {
    meta: { seo_title, search_description },
  } = await getPageBySlug('whats-new', PageType.WhatsNewParent)

  return {
    title: seo_title,
    description: search_description,
  }
}

export default async function WhatsNewParentPage() {
  const { t } = await useTranslation('whatsNew')

  const {
    title,
    body,
    last_published_at: lastUpdated,
    related_links: relatedLinks,
  } = await getPageBySlug('whats-new', PageType.WhatsNewParent)

  const whatsNewEntries = await getWhatsNewPages()

  if (!whatsNewEntries.success) {
    logger.info(whatsNewEntries.error.message)
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
                                  <Link key={0} className="whitespace-normal" href={`whats-new/${item.meta.slug}`}>
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
