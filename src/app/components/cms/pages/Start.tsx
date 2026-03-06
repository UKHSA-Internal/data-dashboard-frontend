import { redirect } from 'next/navigation'
import React from 'react'

import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { Announcements, View } from '@/app/components/ui/ukhsa'
import { RelatedLinksWrapper } from '@/app/components/ui/ukhsa/RelatedLinks/RelatedLinksWrapper'
import { RichTextAutoHeadings } from '@/app/components/ui/ukhsa/RichTextAutoHeadings/RichTextAutoHeadings'
import UserSignIn from '@/app/components/ui/ukhsa/UserSignIn/UserSignIn'
import { Heading } from '@/app/components/ui/ukhsa/View/Heading/Heading'
import { getServerTranslation } from '@/app/i18n'
import { PageComponentBaseProps } from '@/app/types'
import { auth } from '@/auth'

/**
 * The non-public dashboard signup page
 */
export default async function StartPage({ searchParams: { logout } }: PageComponentBaseProps<{ logout?: 'success' }>) {
  const session = await auth()

  if (session) redirect('/')

  const { t } = await getServerTranslation('auth')

  const {
    title,
    body,
    related_links: relatedLinks,
    related_links_layout: relatedLinksLayout,
    active_announcements: activeAnnouncements,
  } = await getPageBySlug<PageType.Common>('start', { type: PageType.Common })

  return (
    <View>
      {logout === 'success' ? (
        <div
          className="govuk-notification-banner govuk-notification-banner--success"
          role="alert"
          aria-labelledby="govuk-notification-banner-title"
        >
          <div className="govuk-notification-banner__header">
            <h2 className="govuk-notification-banner__title" id="govuk-notification-banner-title">
              {t('startPage.signOutBannerTitle')}
            </h2>
          </div>
          <div className="govuk-notification-banner__content">
            <h3 className="govuk-notification-banner__heading">{t('startPage.signOutBannerHeading')}</h3>
            <p className="govuk-body">{t('startPage.signOutBannerDescription')}</p>
          </div>
        </div>
      ) : (
        <div>
          <Heading heading={title} />
          <Announcements announcements={activeAnnouncements} />
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-three-quarters-from-desktop">
              <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
              <RichTextAutoHeadings>{body}</RichTextAutoHeadings>
              <UserSignIn />
            </div>

            {relatedLinksLayout === 'Sidebar' ? (
              <div className="govuk-grid-column-one-quarter-from-desktop govuk-!-margin-top-6 sticky top-2">
                <RelatedLinksWrapper layout={relatedLinksLayout} links={relatedLinks} />
              </div>
            ) : null}
          </div>

          {relatedLinksLayout === 'Footer' ? (
            <RelatedLinksWrapper layout={relatedLinksLayout} links={relatedLinks} />
          ) : null}
        </div>
      )}
    </View>
  )
}
