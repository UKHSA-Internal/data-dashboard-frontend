import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'
import { BLACK } from 'govuk-colours'

interface MetaProps {
  title: string
}

export const Meta = ({ title }: MetaProps) => {
  const { t } = useTranslation('common')

  return (
    <NextSeo
      title={t<string>('meta.title', { title })}
      description={t<string>('meta.description')}
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
        url: process.env.NEXT_PUBLIC_BASE_URL,
      }}
      twitter={{
        site: t<string>('meta.twitterId'),
        cardType: 'summary_large_image',
      }}
      themeColor={BLACK}
      additionalMetaTags={[
        { name: 'copyrightNotice', content: t<string>('meta.copyright') },
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
