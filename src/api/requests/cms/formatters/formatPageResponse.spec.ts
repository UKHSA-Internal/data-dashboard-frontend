import { covidPageMock, dashboardPageMock } from '@/api/mocks/cms/data/page'
import { formatCmsPageTopicResponse } from './formatPageResponse'

test('Formats the CMS Page API response into a format usable within the ui', () => {
  expect(formatCmsPageTopicResponse(covidPageMock)).toEqual<ReturnType<typeof formatCmsPageTopicResponse>>({
    title: 'SARS-CoV-2',
    body: 'SARS-CoV-2 (commonly known) as flu is an infection of the nose, throat and lungs.',
    accordion: {
      prevention: 'Vaccines',
      surveillance_and_reporting: 'Hospitalizations only',
      symptoms: 'Runny nose',
      transmission: 'Airborne',
      treatment: 'Rest',
    },
    relatedLinks: dashboardPageMock.related_links,
    lastUpdated: dashboardPageMock.last_published_at,
  })
})
