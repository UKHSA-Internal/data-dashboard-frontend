import { coronavirusPageMock } from '@/api/mocks/cms/data/page'
import { formatCmsPageTopicResponse } from './formatPageResponse'

test('Formats the CMS Page API response into a format usable within the ui', () => {
  expect(formatCmsPageTopicResponse(coronavirusPageMock)).toEqual<ReturnType<typeof formatCmsPageTopicResponse>>({
    title: 'Coronavirus',
    body: expect.any(Array),
    relatedLinks: coronavirusPageMock.related_links,
    lastUpdated: coronavirusPageMock.last_published_at,
    accordion: {
      symptoms: '<p data-block-key="v7la9">Text here</p>',
      transmission: '<p data-block-key="ldtik">Text here</p>',
      treatment: '<p data-block-key="8bg6b">Text here</p>',
      prevention: '<p data-block-key="6m4r2">Text here</p>',
      surveillance_and_reporting: '<p data-block-key="zn81b">Text here</p>',
    },
  })
})
