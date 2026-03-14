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
import { getPageTypeBySlug } from '@/app/utils/cms'

// Common page rendering for CMS pages, used by both preview and published page routes
// We need this common layer to be able to handle
// caching control independentlyfor the preview route
function isAssetPath(slugPath: string): boolean {
  return /\.(woff|woff2|ttf|eot|svg|png|jpg|jpeg|gif|ico|css|js)$/i.test(slugPath)
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

export async function renderCmsPage(props: { params: Promise<PageParams>; searchParams: Promise<SearchParams> }) {
  const searchParams = await props.searchParams
  const params = await props.params
  const { slug = [] } = params
  const slugPath = slug?.join('/') || ''

  const pageType = await getPageTypeBySlug(slug)
  const PageComponent = PageComponents[pageType]

  if (!PageComponent || isAssetPath(slugPath)) {
    return notFound()
  }

  return <PageComponent slug={slug} searchParams={searchParams} />
}
