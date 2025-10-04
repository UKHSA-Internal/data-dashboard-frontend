import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getPage, PageResponse } from '@/api/requests/cms/getPage'
import { getMetricsPages, getPages, getWhatsNewPages, PagesResponse, PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { getServerTranslation } from '@/app/i18n'
import { SearchParams, Slug } from '@/app/types'
import { logger } from '@/lib/logger'

import { getSiteUrl, slug2String, trimTrailingSlash } from '../app.utils'
import { getPathSegments } from './slug'

export async function validateUrlWithCms(urlSlug: Slug, pageType: PageType) {
  // Landing page
  if (pageType === PageType.Landing) {
    const pageData: PageResponse<PageType> = await getLandingPage()
    return pageData
  }

  // All other pages
  const pageData = await getPageBySlug(urlSlug)

  if (!pageData) {
    return notFound()
  }

  const {
    meta: { html_url: url },
  } = pageData

  const cmsSlug = getPathSegments(url ?? '')

  if (slug2String(cmsSlug) !== slug2String(urlSlug)) {
    return notFound()
  }
  return pageData
}

export async function getPageMetadata(
  urlSlug: Slug,
  searchParams: SearchParams<{ page: number; search: string; areaName: string; areaType: string }>,
  pageType: PageType
): Promise<Metadata> {
  const { t } = await getServerTranslation('common')

  const page = searchParams.page ?? 1
  const search = searchParams.search

  const isLandingPage = pageType === PageType.Landing

  try {
    const pageData = await validateUrlWithCms(urlSlug, pageType)
    const siteUrl = getSiteUrl()
    const pagePath = isLandingPage ? '' : `/${slug2String(urlSlug)}`
    const fullUrl = siteUrl + pagePath

    const {
      title: pageTitle,
      meta: { seo_title: seoTitle, search_description: description },
    } = pageData

    let title = seoTitle ?? pageTitle

    if (pageType === PageType.Topic) {
      const areaName = searchParams.areaName

      if (areaName) {
        title = seoTitle.replace('|', t('areaSelector.documentTitle', { areaName }))
      }
    }

    // TODO: This should be dynamic and cms driven once CMS pages have pagination configured
    if (pageType === PageType.MetricsParent) {
      const metricsEntries = await getMetricsPages({ search, page })

      if (!metricsEntries.success) {
        logger.info(metricsEntries.error.message)
        return notFound()
      }

      const {
        data: {
          meta: { total_count: totalItems },
        },
      } = metricsEntries

      try {
        const { pagination_size: paginationSize, show_pagination: showPagination } =
          await getPageBySlug<PageType.MetricsParent>(['metrics-documentation'], {
            type: PageType.MetricsParent,
          })

        const totalPages = Math.ceil(totalItems / paginationSize) || 1

        if (showPagination) {
          title = seoTitle.replace(
            '|',
            t('documentTitlePagination', { context: Boolean(search) ? 'withSearch' : '', search, page, totalPages })
          )
        }
      } catch (error) {
        console.log('Error', error)
      }
    }

    // TODO: This should be dynamic and cms driven once CMS pages have pagination configured
    if (pageType === PageType.WhatsNewParent) {
      const whatsNewEntries = await getWhatsNewPages({ page })

      if (!whatsNewEntries.success) {
        logger.error(whatsNewEntries.error.message)
        return notFound()
      }

      const {
        data: {
          meta: { total_count: totalItems },
        },
      } = whatsNewEntries

      try {
        const { pagination_size: paginationSize, show_pagination: showPagination } =
          await getPageBySlug<PageType.WhatsNewParent>(['whats-new'], { type: PageType.WhatsNewParent })

        const totalPages = Math.ceil(totalItems / paginationSize) || 1
        title = showPagination ? seoTitle.replace('|', t('documentTitlePagination', { page, totalPages })) : seoTitle
      } catch (error) {
        logger.error(error)
      }
    }

    return {
      title,
      description,
      openGraph: {
        title,
        description,
      },
      twitter: {
        title,
        description,
      },
      alternates: {
        canonical: trimTrailingSlash(fullUrl),
      },
    }
  } catch (error) {
    logger.error(error)
    notFound()
  }
}

export async function getPageTypeBySlug(slug: Slug) {
  if (!slug.length) return PageType.Landing

  const page = await getPageBySlug(slug)
  return page.meta.type as PageType
}

export const getLandingPage = async () => {
  try {
    const landingPages = await getPagesByContentType(PageType.Landing)
    const landingPage = await getPageById<PageType.Landing>(landingPages.items[0].id)

    return landingPage
  } catch (error) {
    logger.error(error)
    notFound()
  }
}

export const getFeedbackPage = async () => {
  try {
    const feedbackPages = await getPagesByContentType(PageType.Feedback)
    const feedbackPage = await getPageById<PageType.Feedback>(feedbackPages.items[0].id)

    return feedbackPage
  } catch (error) {
    logger.error(error)
    notFound()
  }
}

export const getParentPage = async (page: PageResponse<PageType>) => {
  try {
    const parent = await getPage(page.meta.parent.id)
    if (!parent.success) {
      throw new Error(`No parent page found`)
    }
    return parent.data
  } catch (error) {
    logger.error(error)
    notFound()
  }
}

export const getPagesByContentType = async <T extends PageType>(type: T) => {
  try {
    const pages = await getPages({ type })
    if (pages.success) {
      return pages.data as PagesResponse
    }
    throw new Error(`No pages found with type ${type}`)
  } catch (error) {
    logger.error(error)
    notFound()
  }
}

export const getPageById = async <T extends PageType>(id: number) => {
  try {
    const page = await getPage<T>(id)
    if (page.success) {
      return page.data as PageResponse<T>
    }
    throw new Error(`No page found with id ${id}`)
  } catch (error) {
    logger.error(error)
    notFound()
  }
}
