import Link from 'next/link'

import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { Announcements, View } from '@/app/components/ui/ukhsa'
import { RelatedLinksWrapper } from '@/app/components/ui/ukhsa/RelatedLinks/RelatedLinksWrapper'
import { Heading } from '@/app/components/ui/ukhsa/View/Heading/Heading'
import { getServerTranslation } from '@/app/i18n'
import { PageComponentBaseProps } from '@/app/types'

import { RichText } from '../RichText/RichText'

export default async function AuthErrorPage({ slug }: PageComponentBaseProps) {
  const {
    title,
    error_line: errorLine,
    error_text: errorText,
    sub_text: errorSubText,
    related_links: relatedLinks,
    related_links_layout: relatedLinksLayout,
    active_announcements: activeAnnouncements,
  } = await getPageBySlug<PageType.AuthError>(slug)

  const { t } = await getServerTranslation('auth')

  return (
    <View>
      <Announcements announcements={activeAnnouncements} />
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop pt-5">
          <div className="border-l-[9px] border-l-red pl-9">
            <Heading heading={title} />
            <p className="pb-3 font-bold text-red">{errorLine}</p>
            <RichText>{errorText}</RichText>
          </div>
          <RichText className="mt-6">{errorSubText}</RichText>
          <Link href="/start">
            <div className="flex items-center gap-1">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="underline">{t('backButtonText')}</p>
            </div>
          </Link>
        </div>

        {relatedLinksLayout === 'Sidebar' ? (
          <div className="govuk-grid-column-one-quarter-from-desktop govuk-!-margin-top-2 sticky top-2">
            <RelatedLinksWrapper layout={relatedLinksLayout} links={relatedLinks} />
          </div>
        ) : null}
      </div>

      {relatedLinksLayout === 'Footer' ? (
        <RelatedLinksWrapper layout={relatedLinksLayout} links={relatedLinks} />
      ) : null}
    </View>
  )
}
