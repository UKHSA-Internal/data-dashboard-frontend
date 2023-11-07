import { Metadata } from 'next'

import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RichText } from '@/app/components/cms'
import { View } from '@/app/components/ui/ukhsa'
import { useTranslation } from '@/app/i18n'

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> {
  const {
    meta: { seo_title, search_description },
  } = await getPageBySlug(`whats-new/${slug}`, PageType.WhatsNewChild)

  return {
    title: seo_title,
    description: search_description,
  }
}

export default async function WhatsNewChildPage({ params: { slug } }: { params: { slug: string } }) {
  const { t } = await useTranslation('whatsNew')

  const { title, body, badge, additional_details, date_posted } = await getPageBySlug(
    `whats-new/${slug}`,
    PageType.WhatsNewChild
  )

  return (
    <View heading={title} backLink="/whats-new" lastUpdated={date_posted}>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          <div className={`govuk-tag govuk-tag--${badge.colour} govuk-!-margin-bottom-3`}>{badge.text}</div>
          <div className="govuk-body-s">
            <RichText>{body}</RichText>
          </div>
        </div>
      </div>

      {additional_details && (
        <>
          <h2 className="govuk-heading-l govuk-!-margin-top-4">{t('additionalInformationLabel')}</h2>
          <RichText>{additional_details}</RichText>
        </>
      )}
    </View>
  )
}
