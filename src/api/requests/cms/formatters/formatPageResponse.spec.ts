import { covidPageMock } from '@/api/mocks/cms/data/page'
import { formatCmsPageTopicResponse } from './formatPageResponse'

test('Formats the CMS Page API response into a format usable within the ui', () => {
  expect(formatCmsPageTopicResponse(covidPageMock)).toEqual({
    id: 6,
    title: 'SARS-CoV-2',
    slug: 'sars-cov-2',
    body: 'SARS-CoV-2 (commonly known) as flu is an infection of the nose, throat and lungs.',
    publishedDate: '2023-03-10T10:57:35.324472Z',
    accordion: {
      prevention: 'Vaccines',
      surveillance_and_reporting: 'Hospitalizations only',
      symptoms: 'Runny nose',
      transmission: 'Airborne',
      treatment: 'Rest',
    },
  })
})
