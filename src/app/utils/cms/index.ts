import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { getPage, PageResponse } from '@/api/requests/cms/getPage'
import { getPages, getWhatsNewPages, PagesResponse, PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { WHATS_NEW_PAGE_SIZE } from '@/app/constants/app.constants'
import { useTranslation } from '@/app/i18n'
import { SearchParams, Slug } from '@/app/types'
import { logger } from '@/lib/logger'

import { getSiteUrl, slug2String, trimTrailingSlash } from '../app.utils'

const ROOT_PAGE_TITLE = 'UKHSA Dashboard Root'

const isRootLevelPage = (page: PageResponse<PageType>) => page.meta.parent.title === ROOT_PAGE_TITLE

export async function validateUrlWithCms(urlSlug: Slug, pageType: PageType) {
  const isHomePage = pageType === PageType.Home
  const cmsSlug: Slug = []
  let pageData: PageResponse<PageType>

  if (isHomePage) {
    pageData = await getHomePage()
    return pageData
  }

  const lastSlugPart = urlSlug[urlSlug.length - 1]
  cmsSlug.push(lastSlugPart)
  pageData = await getPageBySlug(urlSlug)

  let parentPage = pageData
  while (!isRootLevelPage(parentPage)) {
    parentPage = await getParentPage(parentPage)
    cmsSlug.unshift(parentPage.meta.slug)
  }

  if (slug2String(cmsSlug) !== slug2String(urlSlug)) {
    return notFound()
  }

  return pageData
}

export async function getPageMetadata(
  urlSlug: Slug,
  searchParams: SearchParams<{ page: number; areaName: string; areaType: string }>,
  pageType: PageType
): Promise<Metadata> {
  const { t } = await useTranslation('common')

  const page = searchParams.page ?? 1

  const isHomePage = pageType === PageType.Home

  try {
    const pageData = await validateUrlWithCms(urlSlug, pageType)
    const siteUrl = getSiteUrl()
    const pagePath = isHomePage ? '' : `/${slug2String(urlSlug)}`
    const fullUrl = siteUrl + pagePath

    const {
      title: pageTitle,
      meta: { seo_title: seoTitle, search_description: description },
    } = pageData

    let title = seoTitle ?? pageTitle

    // TODO: This should be dynamic and cms driven
    // TODO: Add ticket number for this section
    if (pageType === PageType.WhatsNewParent) {
      const whatsNewEntries = await getWhatsNewPages({ page })

      if (!whatsNewEntries.success) {
        logger.info(whatsNewEntries.error.message)
        return redirect('/error')
      }

      const {
        data: {
          meta: { total_count: totalItems },
        },
      } = whatsNewEntries

      const totalPages = Math.ceil(totalItems / WHATS_NEW_PAGE_SIZE) || 1

      title = seoTitle.replace('|', t('documentTitlePagination', { page, totalPages }))
    }

    if (pageType === PageType.Topic && searchParams.areaName) {
      title = title.replace('|', t('areaSelector.documentTitle', { areaName: searchParams.areaName }))
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
  if (!slug.length) return PageType.Home
  const page = await getPageBySlug(slug)
  return page.meta.type as PageType
}

export const getHomePage = async () => {
  try {
    const pages = await getPagesByContentType(PageType.Home)
    const matches = pages.items.filter((page) => page.title !== 'UKHSA Dashboard Root')
    if (!matches || matches.length !== 1) {
      throw new Error(`No homepage matches found`)
    }
    const homePage = await getPageById<PageType.Home>(matches[0].id)
    return homePage
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
