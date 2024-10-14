import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React, { cache, ComponentType } from 'react'

import { PageType } from '@/api/requests/cms/getPages'
import CompositePage from '@/app/components/cms/pages/Composite'
import HomePage from '@/app/components/cms/pages/Home'
import LandingPage from '@/app/components/cms/pages/Landing'
import MetricsChildPage from '@/app/components/cms/pages/MetricsDocumentationChild'
import MetricsParentPage from '@/app/components/cms/pages/MetricsDocumentationParent'
import TopicPage from '@/app/components/cms/pages/Topic'
import WhatsNewChildPage from '@/app/components/cms/pages/WhatsNewChild'
import WhatsNewParentPage from '@/app/components/cms/pages/WhatsNewParent'
import { PageComponentBaseProps, PageParams, SearchParams } from '@/app/types'
import { getPageMetadata, getPageTypeBySlug } from '@/app/utils/cms'

const getPageType = cache(getPageTypeBySlug)
const getPageMeta = cache(getPageMetadata)

/**
 * Generates metadata for the page based on the dynamic slug.
 */
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: PageParams
  searchParams: SearchParams
}): Promise<Metadata> {
  const { slug = [] } = params
  const pageType = await getPageTypeBySlug(slug)
  return await getPageMeta(slug, searchParams, pageType)
}

const PageComponents: Record<PageType, ComponentType<PageComponentBaseProps>> = {
  [PageType.Home]: HomePage,
  [PageType.Landing]: LandingPage,
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

export default async function Page({ params, searchParams }: { params: PageParams; searchParams: SearchParams }) {
  const { slug = [] } = params
  const pageType = await getPageType(slug)
  const PageComponent = PageComponents[pageType]

  if (!PageComponent) {
    return notFound()
  }

  return <PageComponent slug={slug} searchParams={searchParams} />
}
