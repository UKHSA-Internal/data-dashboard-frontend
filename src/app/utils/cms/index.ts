import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getPage, PageResponse } from '@/api/requests/cms/getPage'
import { getPages, PagesResponse, PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { SearchParams, Slug } from '@/app/types'
import { logger } from '@/lib/logger'

import { getSiteUrl, slug2String, trimTrailingSlash } from '../app.utils'

export async function getPageMetadata(
  urlSlug: Slug,
  searchParams: SearchParams,
  pageType: PageType
): Promise<Metadata> {
  const isHomePage = pageType === PageType.Home

  try {
    let pageData: PageResponse<PageType>

    if (isHomePage) {
      pageData = await getHomePage()
    } else {
      pageData = await getPageBySlug(urlSlug)
    }

    const siteUrl = getSiteUrl()
    const pagePath = isHomePage ? '' : `/${slug2String(urlSlug)}`
    const fullUrl = siteUrl + pagePath

    const {
      title: pageTitle,
      meta: { seo_title: seoTitle, search_description: description },
    } = pageData

    const title = seoTitle ?? pageTitle

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
    const homePage = getPageById<PageType.Home>(matches[0].id)
    return homePage
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
