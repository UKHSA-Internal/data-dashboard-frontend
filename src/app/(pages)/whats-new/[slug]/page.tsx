import { Metadata } from 'next'
import { Trans } from 'react-i18next/TransWithoutContext'

import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RichText } from '@/app/components/cms'
import { Details } from '@/app/components/ui/govuk'
import { View } from '@/app/components/ui/ukhsa'
import { useTranslation } from '@/app/i18n'

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> {
  const {
    meta: { seo_title, search_description },
  } = await getPageBySlug(slug, PageType.WhatsNewChild)

  return {
    title: seo_title,
    description: search_description,
  }
}

export default async function WhatsNewChildPage({ params: { slug } }: { params: { slug: string } }) {
  const { t } = await useTranslation('whatsNew')

  const { title, body, badge, additional_details, date_posted } = await getPageBySlug(slug, PageType.WhatsNewChild)

  return (
    <View backLink="/whats-new">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          <small className="govuk-caption-m govuk-!-margin-bottom-3">
            <time dateTime={date_posted}>
              <Trans
                i18nKey="entryDate"
                t={t}
                components={[<span key={0} className="govuk-visually-hidden" />]}
                values={{ value: date_posted }}
              />
            </time>
          </small>

          <div className={`govuk-tag govuk-tag--${badge.colour} govuk-!-margin-bottom-3`}>
            <Trans
              i18nKey="entryCategory"
              t={t}
              components={[<span key={0} className="govuk-visually-hidden" />]}
              values={{ value: badge.text }}
            />
          </div>

          <Trans
            i18nKey="entryTitle"
            t={t}
            components={[
              <h1 className="govuk-heading-xl govuk-!-margin-bottom-6" key={0}>
                <span className="govuk-visually-hidden" key={0} />
              </h1>,
            ]}
            values={{ value: title }}
          />
          <RichText>{body}</RichText>
        </div>
      </div>

      {additional_details && (
        <>
          <h2 className="govuk-heading-l govuk-!-margin-top-4">{t('additionalInformationLabel')}</h2>
          <Details label={t('additionalInformationLabel')}>
            <RichText>{additional_details}</RichText>
          </Details>
        </>
      )}
    </View>
  )
}
