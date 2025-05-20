import { Metadata } from 'next'

import { HealthAlertTypes } from '@/api/models/Alerts'
import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RelatedLinksWrapper } from '@/app/components/ui/ukhsa/RelatedLinks/RelatedLinksWrapper'
import { cachingEnabled } from '@/config/constants'

import AlertBody from './AlertBody'

export const dynamic = cachingEnabled ? 'auto' : 'force-dynamic'

export async function generateMetadata({ params: { region } }: { params: { region: string } }): Promise<Metadata> {
  return {
    title: `Weather alert for ${region} | UKHSA data dashboard`,
    description: `Weather alert for ${region}`,
  }
}

interface WeatherHealthAlertProps {
  params: {
    weather: HealthAlertTypes
    region: string
  }
}

export default async function Alert({ params: { weather, region } }: WeatherHealthAlertProps) {
  const { related_links: relatedLinks, related_links_layout: relatedLinksLayout } =
    await getPageBySlug<PageType.Composite>(weather)

  return (
    <AlertBody
      weather={weather}
      region={region}
      relatedLinks={<RelatedLinksWrapper layout={relatedLinksLayout} links={relatedLinks} />}
      relatedLinksLayout={relatedLinksLayout}
    />
  )
}
