import type { Metadata } from 'next'
import React from 'react'

import { PageType } from '@/api/requests/cms/getPages'
import CompositePage from '@/app/components/cms/pages/Composite'
import HomePage from '@/app/components/cms/pages/Home'
import { PageParams, SearchParams } from '@/app/types'
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

/**
 * Renders the page component based on the dynamic slug.
 * Determines the page type from the CMS and conditionally renders the appropriate components.
 */
export default async function Page({ params, searchParams }: { params: PageParams; searchParams: SearchParams }) {
  const { slug = [] } = params
  const pageType = await getPageTypeBySlug(slug)

  const isHomePage = pageType === PageType.Home
  const isCompositePage = pageType === PageType.Common || pageType === PageType.Composite

  const props = { slug, searchParams }

  return (
    <>
      {isHomePage ? <HomePage /> : null}
      {isCompositePage ? <CompositePage {...props} /> : null}
    </>
  )
}
