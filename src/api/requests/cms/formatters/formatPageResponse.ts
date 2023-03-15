import type { PageResponse, TopicPage } from '../getPage'

type PageMeta<T> = T & {
  id: number
  title: string
  slug: string
  body: string
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
export const formatCmsPageTopicResponse = (
  page: PageResponse<TopicPage>
): VirusPage => {
  return {
    id: page.id,
    title: page.title,
    slug: page.meta.slug,
    body: page.body,
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
