import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

import { relatedLinksMock } from '../elements'

export const metricsParentMock: PageResponse<PageType.MetricsParent> = {
  id: 25,
  meta: {
    seo_title: 'Metrics documentation | UKHSA data dashboard',
    search_description: '',
    type: 'metrics.MetricsParentPage',
    detail_url: 'http://localhost/api/pages/25/',
    html_url: null,
    slug: 'metrics',
    show_in_menus: true,
    first_published_at: '2023-10-24T16:09:35.359598+01:00',
    alias_of: null,
    parent: {
      id: 3,
      meta: {
        type: 'home.HomePage',
        detail_url: 'http://localhost/api/pages/3/',
        html_url: null,
      },
      title: 'UKHSA Dashboard Root',
    },
  },
  title: 'Metrics documentation',
  body: '<p>Metrics documentation description...</p>',
  related_links: relatedLinksMock,
  last_published_at: '2023-10-24T16:09:35.359598+01:00',
}

export const metricsChildMocks: PageResponse<PageType.MetricsChild>[] = [
  {
    id: 26,
    meta: {
      seo_title: 'Metrics child | UKHSA data dashboard',
      search_description: '',
      type: 'metrics.MetricsChildEntry',
      detail_url: 'http://localhost/api/pages/26/',
      html_url: null,
      slug: 'cumulative-cases-by-specemin-date',
      show_in_menus: false,
      first_published_at: '2023-10-24T16:10:44.385654+01:00',
      alias_of: null,
      parent: {
        id: 21,
        meta: {
          type: 'metrics.MetricsParentPage',
          detail_url: 'http://localhost/api/pages/25/',
          html_url: null,
        },
        title: 'Metrics documentation',
      },
    },
    title: 'Cumulative cases by specemin date',
    description:
      'Total number of cases since the start of the pandemic. Data are shown by the date the sample was taken from the person being tested.',
    category: 'Cases',
    topic: 'COVID-19',
    apiName: 'cumulative_cases_by_specemin_date',
    last_published_at: '2023-10-24T16:09:35.359598+01:00',
  },
  {
    id: 27,
    meta: {
      seo_title: 'Metrics child | UKHSA data dashboard',
      search_description: '',
      type: 'metrics.MetricsChildEntry',
      detail_url: 'http://localhost/api/pages/27/',
      html_url: null,
      slug: 'new-deaths-within-60-days-of-a-positive-test-rate-by-death-date',
      show_in_menus: false,
      first_published_at: '2023-10-24T16:10:44.385654+01:00',
      alias_of: null,
      parent: {
        id: 21,
        meta: {
          type: 'metrics.MetricsParentPage',
          detail_url: 'http://localhost/api/pages/25/',
          html_url: null,
        },
        title: 'Metrics documentation',
      },
    },
    title: 'New deaths within 60 days of a positive test rate by death date',
    description:
      'Rate per 100,000 people of the daily number of people who either died within 60 days of being identified as a COVID-19 case, or died more than 60 days after being identified as a case and have COVID-19 mentioned on their death certificate. Data are shown by date of death.',
    category: 'Deaths',
    topic: 'COVID-19',
    apiName: 'newDeaths60DaysByDeathDateRate',
    last_published_at: '2023-10-24T16:09:35.359598+01:00',
  },
  {
    id: 28,
    meta: {
      seo_title: 'Metrics child | UKHSA data dashboard',
      search_description: '',
      type: 'metrics.MetricsChildEntry',
      detail_url: 'http://localhost/api/pages/28/',
      html_url: null,
      slug: 'new-pcr-tests-by-publish-date',
      show_in_menus: false,
      first_published_at: '2023-10-24T16:10:44.385654+01:00',
      alias_of: null,
      parent: {
        id: 21,
        meta: {
          type: 'metrics.MetricsParentPage',
          detail_url: 'http://localhost/api/pages/25/',
          html_url: null,
        },
        title: 'Metrics documentation',
      },
    },
    title: 'New PCR tests by publish date',
    description:
      'Total number of cases since the start of the pandemic. Data are shown by the date the sample was taken from the person being tested.',
    category: 'Testing',
    topic: 'COVID-19',
    apiName: 'newPCRTestsByPublishDate',
    last_published_at: '2023-10-24T16:09:35.359598+01:00',
  },
  {
    id: 29,
    meta: {
      seo_title: 'Metrics child | UKHSA data dashboard',
      search_description: '',
      type: 'metrics.MetricsChildEntry',
      detail_url: 'http://localhost/api/pages/29/',
      html_url: null,
      slug: 'new-people-vaccinated-with-a-third-dose-by-publish-date',
      show_in_menus: false,
      first_published_at: '2023-10-24T16:10:44.385654+01:00',
      alias_of: null,
      parent: {
        id: 21,
        meta: {
          type: 'metrics.MetricsParentPage',
          detail_url: 'http://localhost/api/pages/25/',
          html_url: null,
        },
        title: 'Metrics documentation',
      },
    },
    title: 'New people vaccinated with a third dose by publish date',
    description:
      'Daily numbers of new people who have received a 3rd dose vaccination. These are currently offered to people over 12 with severely weakened immune systems. Unlike boosters, third doses are considered part of your primary vaccination. Data are shown by the date the figures appeared in the published totals.',
    category: 'Vaccinations',
    topic: 'COVID-19',
    apiName: 'newPeopleVaccinatedThirdDoseByPublishDate',
    last_published_at: '2023-10-24T16:09:35.359598+01:00',
  },
]
