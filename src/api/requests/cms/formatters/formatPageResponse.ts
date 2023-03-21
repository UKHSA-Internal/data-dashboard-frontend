import type { PageResponse, TopicPage } from '../getPage'

/**
 * This formatter takes the full `/page` response from the CMS API
 * and transforms it into a trimmed object usable within our UI
 */
export const formatCmsPageTopicResponse = (page: PageResponse<TopicPage>) => {
  return {
    title: page.title,
    body: page.body,
    relatedLinks: page.related_links,
    lastUpdated: page.latest_revision_created_at,
    accordion: {
      symptoms: page.symptoms,
      transmission: page.transmission,
      treatment: page.treatment,
      prevention: page.prevention,
      surveillance_and_reporting: page.surveillance_and_reporting,
    },
  }
}
