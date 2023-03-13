import type { PageResponse } from '../getPage'

type PageMeta<T> = T & {
  id: number
  title: string
  slug: string
  content: string
  publishedDate: string
}

type VirusPage = PageMeta<{
  accordion: {
    symptoms: string
    transmission: string
    treatment: string
    prevention: string
    surveillance_and_reporting: string
  }
}>

/**
 * This formatter takes the full `/page` response from the CMS API
 * and transforms it into a trimmed object usable within our UI
 */
export const formatCmsPageTopicResponse = (page: PageResponse): VirusPage => {
  return {
    id: page.id,
    title: page.title,
    slug: page.meta.slug,
    content: page.introduction,
    publishedDate: page.meta.first_published_at,
    // TODO: Accordion data is subject to change having spoken with BE team
    accordion: {
      symptoms: page.symptoms,
      transmission: page.transmission,
      treatment: page.treatment,
      prevention: page.prevention,
      surveillance_and_reporting: page.surveillance_and_reporting,
    },
  }
}
