import { Metadata } from 'next'

import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RichText } from '@/app/components/cms'
import { Contents, ContentsItem, View } from '@/app/components/ui/ukhsa'
import { useTranslation } from '@/app/i18n'

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> {
  const {
    meta: { seo_title, search_description },
  } = await getPageBySlug(slug, PageType.MetricsChild, { fields: '*' })

  return {
    title: seo_title,
    description: search_description,
  }
}

export default async function MetricsChildPage({ params: { slug } }: { params: { slug: string } }) {
  const { t } = await useTranslation('metrics')

  const { title, definition, rationale, methodology, caveats, category, topic, apiName, last_published_at } =
    await getPageBySlug(slug, PageType.MetricsChild)

  return (
    <View heading={title} lastUpdated={last_published_at} backLink="/metrics">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          <Contents>
            <ContentsItem heading={'Summary'}>
              <dl className="govuk-summary-list govuk-!-width-two-thirds">
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Topic</dt>
                  <dd className="govuk-summary-list__value">{topic}</dd>
                </div>
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Category</dt>
                  <dd className="govuk-summary-list__value">{category}</dd>
                </div>
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">API name</dt>
                  <dd className="govuk-summary-list__value">{apiName}</dd>
                </div>
              </dl>
            </ContentsItem>
            <ContentsItem heading={'Definition'}>
              {definition ? (
                <RichText>{definition}</RichText>
              ) : (
                <p className="govuk-body">{t('emptyDescriptionText', { value: 'definition' })}</p>
              )}
            </ContentsItem>
            <ContentsItem heading={'Rationale'}>
              {rationale ? (
                <RichText>{rationale}</RichText>
              ) : (
                <p className="govuk-body">{t('emptyDescriptionText', { value: 'rationale' })}</p>
              )}
            </ContentsItem>
            <ContentsItem heading={'Methodology'}>
              {methodology ? (
                <RichText>{methodology}</RichText>
              ) : (
                <p className="govuk-body">{t('emptyDescriptionText', { value: 'methodology' })}</p>
              )}
            </ContentsItem>
            <ContentsItem heading={'Caveats'}>
              {caveats ? (
                <RichText>{caveats}</RichText>
              ) : (
                <p className="govuk-body">{t('emptyDescriptionText', { value: 'caveats' })}</p>
              )}
            </ContentsItem>
          </Contents>
        </div>
      </div>
    </View>
  )
}
