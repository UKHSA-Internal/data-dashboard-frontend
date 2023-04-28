import { covidPageMock, homePageMock } from '@/api/mocks/cms/data/page'
import { formatCmsPageTopicResponse } from './formatPageResponse'

test('Formats the CMS Page API response into a format usable within the ui', () => {
  expect(formatCmsPageTopicResponse(covidPageMock)).toEqual<ReturnType<typeof formatCmsPageTopicResponse>>({
    title: 'Coronavirus',
    body: 'SARS-CoV-2 (commonly known as Coronavirus) is an infection of the nose, throat and lungs.',
    accordion: {
      prevention: 'Vaccines',
      surveillance_and_reporting: 'Hospitalizations only',
      symptoms: 'Runny nose',
      transmission: 'Airborne',
      treatment: 'Rest',
    },
    relatedLinks: homePageMock.related_links,
    lastUpdated: homePageMock.last_published_at,
  })
})
