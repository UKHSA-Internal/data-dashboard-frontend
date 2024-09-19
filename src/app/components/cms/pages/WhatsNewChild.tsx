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
    date_posted,
    last_published_at: lastUpdated,
  } = await getPageBySlug<PageType.WhatsNewChild>(slug, { type: PageType.WhatsNewChild, fields: '*' })

  const backLink = searchParams.returnUrl || extractRootSlug(slug)

  return (
    <View backLink={backLink} lastUpdated={lastUpdated} heading={title}>
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
