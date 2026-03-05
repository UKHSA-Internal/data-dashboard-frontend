import { notFound } from 'next/navigation'

import { client } from '@/api/utils/api.utils'
import { SearchParams, Slug } from '@/app/types'
import { logger } from '@/lib/logger'

import { getPage, PageResponse, responseSchema } from './cms/getPage'
import { getPages, PageType } from './cms/getPages'
import { getApiBaseUrl } from './helpers'

const getStringParam = (params: SearchParams | undefined, key: string) => {
  const value = params?.[key as keyof SearchParams]

  return typeof value === 'string' ? value : undefined
}

const getDraftTokenFromRequestHeaders = async (): Promise<string | undefined> => {
  try {
    const { headers } = await import('next/headers')
    const requestHeaders = await headers()

    const draftToken = requestHeaders.get('x-cms-draft-token')

    return draftToken || undefined
  } catch {
    return undefined
  }
}

const resolveDraftToken = (token: string) => {
  if (token.toLowerCase().startsWith('bearer ')) {
    return token
  }

  return `Bearer ${token}`
}

const buildDraftEndpoint = (slug: string) => {
  const normalizedSlug = slug
    .split('/')
    .map((segment) => segment.trim())
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join('/')

  return `drafts/${normalizedSlug}/`
}

const getDraftPage = async <T extends PageType>(slug: string, token: string) => {
  const authToken = resolveDraftToken(token)
  const endpoint = buildDraftEndpoint(slug)

  const { data, status, error } = await client<PageResponse<T>>(endpoint, {
    baseUrl: getApiBaseUrl(),
    headers: {
      Authorization: authToken,
    },
    isPublic: false,
    cache: 'no-store',
    next: {
      revalidate: 0,
    },
  })

  if (error || !data) {
    logger.warn(`Draft endpoint failed - status: ${status}, error:`, error, 'slug:', slug)
  }

  return responseSchema.safeParse(data)
}

// TODO: Move this to @app/utils/cms/index.ts
export const getPageBySlug = async <T extends PageType>(slugParam: string | Slug, searchParams?: SearchParams) => {
  try {
    // TODO: Once all pages are migrated to dynamic catch all route, remove non-array slug type
    const slug = Array.isArray(slugParam) ? slugParam[slugParam.length - 1] : slugParam
    const routeSlug = Array.isArray(slugParam) ? slugParam.join('/') : slugParam

    const explicitToken = getStringParam(searchParams, 't')
    const draftToken = explicitToken ?? (await getDraftTokenFromRequestHeaders())

    if (draftToken) {
      if (!routeSlug) {
        throw new Error('Draft mode requires a non-empty route slug')
      }

      const page = await getDraftPage<T>(routeSlug, draftToken)

      if (page.success) {
        return page.data as PageResponse<T>
      }

      logger.error(page.error)
      throw new Error(`Draft CMS page with slug ${routeSlug} does not match expected response schema`)
    }

    // Fetch all of pages by type from the CMS
    const pages = await getPages(searchParams)

    // Find the CMS page within the list that matches the provided slug
    if (pages.success) {
      const { items } = pages.data

      const matchedPage = items.find(({ meta }) => meta.slug === slug)

      if (matchedPage) {
        // Once we have a match, use the id to fetch the single page
        const page = await getPage<T>(matchedPage.id)

        if (page.success) {
          return page.data as PageResponse<T>
        }

        logger.error(page.error)
        throw new Error(`CMS page with slug ${slug} and id ${matchedPage.id} does not match expected response schema`)
      }

      throw new Error(`No page found for slug ${slug}`)
    }

    throw new Error(`Failed to parse CMS pages from API - There is likely an issue with the API response`)
  } catch (e) {
    logger.info(e)
    notFound()
  }
}
