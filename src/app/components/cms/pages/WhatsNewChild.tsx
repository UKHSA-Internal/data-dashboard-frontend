import { Trans } from 'react-i18next/TransWithoutContext'

import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RichText } from '@/app/components/cms'
import { View } from '@/app/components/ui/ukhsa'
import { getServerTranslation } from '@/app/i18n'
import { PageComponentBaseProps } from '@/app/types'
import { extractRootSlug } from '@/app/utils/cms/slug'

export default async function WhatsNewChildPage({
  slug,
  searchParams,
}: PageComponentBaseProps<{ returnUrl?: string }>) {
  const { t } = await getServerTranslation('whatsNew')

  const {
    title,
    body,
    badge,
    additional_details,
    date_posted: datePosted,
    last_updated_at: lastUpdated,
  } = await getPageBySlug<PageType.WhatsNewChild>(slug, { type: PageType.WhatsNewChild, fields: '*' })

  const backLink = searchParams.returnUrl || extractRootSlug(slug)

  return (
    <View backLink={backLink} lastUpdated={lastUpdated}>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          <small className="govuk-caption-m govuk-!-margin-bottom-3">
            <time dateTime={datePosted}>
              <Trans
                i18nKey="entryDate"
                t={t}
                components={[<span key={0} className="govuk-visually-hidden" />]}
                values={{ value: datePosted }}
              />
            </time>
          </small>

          {badge ? (
            <div className={`govuk-tag govuk-tag--${badge.colour} govuk-!-margin-bottom-3`}>
              <Trans
                i18nKey="entryCategory"
                t={t}
                components={[<span key={0} className="govuk-visually-hidden" />]}
                values={{ value: badge.text }}
              />
            </div>
          ) : null}

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

          <span className="govuk-visually-hidden">{t('entryDescription')}</span>
          <RichText>{body}</RichText>
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
