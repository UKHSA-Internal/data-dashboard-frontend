import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ComponentType } from 'react'

import { PageType } from '@/api/requests/cms/getPages'
import CompositePage from '@/app/components/cms/pages/Composite'
import FeedbackPage from '@/app/components/cms/pages/Feedback'
import LandingPage from '@/app/components/cms/pages/Landing'
import MetricsChildPage from '@/app/components/cms/pages/MetricsDocumentationChild'
import MetricsParentPage from '@/app/components/cms/pages/MetricsDocumentationParent'
import TopicPage from '@/app/components/cms/pages/Topic'
import WhatsNewChildPage from '@/app/components/cms/pages/WhatsNewChild'
import WhatsNewParentPage from '@/app/components/cms/pages/WhatsNewParent'
import { PageComponentBaseProps, PageParams, SearchParams } from '@/app/types'
import { getPageMetadata, getPageTypeBySlug } from '@/app/utils/cms'

/**
 * Generates metadata for the page based on the dynamic slug.
 */
export async function generateMetadata(
  props: {
    params: Promise<PageParams>
    searchParams: Promise<SearchParams>
  }
): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { slug = [] } = params
  const pageType = await getPageTypeBySlug(slug)
  return await getPageMetadata(slug, searchParams, pageType)
}

const PageComponents: Record<PageType, ComponentType<PageComponentBaseProps>> = {
  [PageType.Landing]: LandingPage,
  [PageType.Feedback]: FeedbackPage,
  [PageType.Common]: CompositePage,
  [PageType.Composite]: CompositePage,
  [PageType.Topic]: TopicPage,
  [PageType.MetricsParent]: MetricsParentPage,
  [PageType.MetricsChild]: MetricsChildPage,
  [PageType.WhatsNewParent]: WhatsNewParentPage,
  [PageType.WhatsNewChild]: WhatsNewChildPage,
}

/**
 * Renders the page component based on the dynamic slug.
 * Determines the page type from the CMS and conditionally renders the appropriate components.
 */

export default async function Page(
  props: { params: Promise<PageParams>; searchParams: Promise<SearchParams> }
) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { slug = [] } = params

  const pageType = await getPageTypeBySlug(slug)

  const PageComponent = PageComponents[pageType]

  if (!PageComponent) {
    return notFound()
  }

  return <PageComponent slug={slug} searchParams={searchParams} />
}
