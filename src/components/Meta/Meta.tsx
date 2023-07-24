import { BLACK } from 'govuk-colours'
import { useTranslation } from 'next-i18next'
import { NextSeo } from 'next-seo'

interface MetaProps {
  title: string
  description: string
}

export const Meta = ({ title, description }: MetaProps) => {
  const { t } = useTranslation('common')

  return (
    <NextSeo
      title={t('meta.title', { title })}
      description={t('meta.description', { description })}
      openGraph={{
        type: 'website',
        locale: 'en_GB',
        images: [
          {
            url: '/assets/summary/images/opengraph-image.png',
            width: 1200,
            height: 630,
            alt: 'gov.uk',
          },
        ],
      }}
      twitter={{
        site: t('meta.twitterId'),
        cardType: 'summary_large_image',
      }}
      themeColor={BLACK}
      additionalMetaTags={[
        { name: 'copyrightNotice', content: t('meta.copyright') },
        { name: 'logo', content: '/assets/summary/icon/favicon.png' },
      ]}
      additionalLinkTags={[
        {
          rel: 'icon',
          href: '/assets/summary/icon/favicon.ico',
        },
        {
          rel: 'apple-touch-icon',
          href: '/assets/summary/icon/favicon.png',
        },
      ]}
    />
  )
}
