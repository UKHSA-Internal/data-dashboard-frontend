import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React, { ComponentType } from 'react'

import { PageType } from '@/api/requests/cms/getPages'
import CompositePage from '@/app/components/cms/pages/Composite'
import HomePage from '@/app/components/cms/pages/Home'
import MetricsChildPage from '@/app/components/cms/pages/MetricsDocumentationChild'
import MetricsParentPage from '@/app/components/cms/pages/MetricsDocumentationParent'
import { PageComponentBaseProps, PageParams, SearchParams } from '@/app/types'
import { getPageMetadata, getPageTypeBySlug } from '@/app/utils/cms'

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
  return await getPageMetadata(slug, searchParams, pageType)
}

const PageComponents: Record<PageType, ComponentType<PageComponentBaseProps> | null> = {
  [PageType.Home]: HomePage,
  [PageType.Common]: CompositePage,
  [PageType.Composite]: CompositePage,
  [PageType.MetricsParent]: MetricsParentPage,
  [PageType.MetricsChild]: MetricsChildPage,
  [PageType.WhatsNewParent]: null,
  [PageType.WhatsNewChild]: null,
  [PageType.Topic]: null,
}

/**
 * Renders the page component based on the dynamic slug.
 * Determines the page type from the CMS and conditionally renders the appropriate components.
 */
export default async function Page({ params, searchParams }: { params: PageParams; searchParams: SearchParams }) {
  const { slug = [] } = params
  const pageType = await getPageTypeBySlug(slug)
  const PageComponent = PageComponents[pageType]

  if (!PageComponent) {
    return notFound()
  }

  return <PageComponent slug={slug} searchParams={searchParams} />
}
