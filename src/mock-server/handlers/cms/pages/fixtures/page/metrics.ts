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
      slug: 'new-cases-7days-sum',
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
    title: 'New cases 7 days sum',
    shortText: 'This metric shows the count of reported new cases in the last 7 days.',
    definition:
      '<p>This metric shows the count of reported new cases in the last 7 days.</p><p>New cases are reported by specimen date - the date the first sample that identified the infection was taken from an individual.</p>',
    rationale:
      '<p>The timely identification of cases is important to controlling the spread of COVID-19 and reducing the burden on healthcare systems.</p>',
    methodology:
      '<p>COVID-19 cases are identified by taking specimens from people and testing them for the SARS-CoV-2 virus. If the test is positive, this is a case. Some positive rapid lateral flow test results are confirmed with lab-based polymerase chain reaction (PCR) tests taken within 72 hours. If the PCR test results are negative, these are not reported as confirmed cases.</p><p>People who test positive again after a given time period are counted as new cases. In England people are counted as new cases if they test positive again more than 90 days after their last positive test.</p><p>Data for the last 5 days by specimen date are considered incomplete as it takes time to get test results and record them on relevant lab systems. Cases data for England includes all positive lab-confirmed PCR test results plus, positive rapid lateral flow tests unless followed by a negative PCR test taken within 72 hours.</p><p>The count of reported new cases in the last 7 days is the total of the daily cases counts in the 7 days up to and including the most recent date with "complete" data (i.e. 5 days before the current date).</p>',
    caveats:
      '<p>This figure will underestimate the actual number of COVID-19 infections due to people not testing or not being able to report LFD results.</p><p>Variation in cases can reflect differences in the underlying population, including variation in vaccination status, public health measures and community transmission.</p>',
    category: 'Cases',
    topic: 'COVID-19',
    apiName: 'new_cases_7days_sum',
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
    shortText:
      'Rate per 100,000 people of the daily number of people who either died within 60 days of being identified as a COVID-19 case, or died more than 60 days after being identified as a case and have COVID-19 mentioned on their death certificate. Data are shown by date of death.',
    definition:
      '<p>This metric shows the count of reported new cases in the last 7 days.</p><p>New cases are reported by specimen date - the date the first sample that identified the infection was taken from an individual.</p>',
    rationale:
      '<p>The timely identification of cases is important to controlling the spread of COVID-19 and reducing the burden on healthcare systems.</p>',
    methodology:
      '<p>COVID-19 cases are identified by taking specimens from people and testing them for the SARS-CoV-2 virus. If the test is positive, this is a case. Some positive rapid lateral flow test results are confirmed with lab-based polymerase chain reaction (PCR) tests taken within 72 hours. If the PCR test results are negative, these are not reported as confirmed cases.</p><p>People who test positive again after a given time period are counted as new cases. In England people are counted as new cases if they test positive again more than 90 days after their last positive test.</p><p>Data for the last 5 days by specimen date are considered incomplete as it takes time to get test results and record them on relevant lab systems. Cases data for England includes all positive lab-confirmed PCR test results plus, positive rapid lateral flow tests unless followed by a negative PCR test taken within 72 hours.</p><p>The count of reported new cases in the last 7 days is the total of the daily cases counts in the 7 days up to and including the most recent date with "complete" data (i.e. 5 days before the current date).</p>',
    caveats:
      '<p>This figure will underestimate the actual number of COVID-19 infections due to people not testing or not being able to report LFD results.</p><p>Variation in cases can reflect differences in the underlying population, including variation in vaccination status, public health measures and community transmission.</p>',
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
    shortText:
      'Total number of cases since the start of the pandemic. Data are shown by the date the sample was taken from the person being tested.',
    definition:
      '<p>This metric shows the count of reported new cases in the last 7 days.</p><p>New cases are reported by specimen date - the date the first sample that identified the infection was taken from an individual.</p>',
    rationale:
      '<p>The timely identification of cases is important to controlling the spread of COVID-19 and reducing the burden on healthcare systems.</p>',
    methodology:
      '<p>COVID-19 cases are identified by taking specimens from people and testing them for the SARS-CoV-2 virus. If the test is positive, this is a case. Some positive rapid lateral flow test results are confirmed with lab-based polymerase chain reaction (PCR) tests taken within 72 hours. If the PCR test results are negative, these are not reported as confirmed cases.</p><p>People who test positive again after a given time period are counted as new cases. In England people are counted as new cases if they test positive again more than 90 days after their last positive test.</p><p>Data for the last 5 days by specimen date are considered incomplete as it takes time to get test results and record them on relevant lab systems. Cases data for England includes all positive lab-confirmed PCR test results plus, positive rapid lateral flow tests unless followed by a negative PCR test taken within 72 hours.</p><p>The count of reported new cases in the last 7 days is the total of the daily cases counts in the 7 days up to and including the most recent date with "complete" data (i.e. 5 days before the current date).</p>',
    caveats:
      '<p>This figure will underestimate the actual number of COVID-19 infections due to people not testing or not being able to report LFD results.</p><p>Variation in cases can reflect differences in the underlying population, including variation in vaccination status, public health measures and community transmission.</p>',
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
    shortText:
      'Daily numbers of new people who have received a 3rd dose vaccination. These are currently offered to people over 12 with severely weakened immune systems. Unlike boosters, third doses are considered part of your primary vaccination. Data are shown by the date the figures appeared in the published totals.',
    definition:
      '<p>This metric shows the count of reported new cases in the last 7 days.</p><p>New cases are reported by specimen date - the date the first sample that identified the infection was taken from an individual.</p>',
    rationale:
      '<p>The timely identification of cases is important to controlling the spread of COVID-19 and reducing the burden on healthcare systems.</p>',
    methodology:
      '<p>COVID-19 cases are identified by taking specimens from people and testing them for the SARS-CoV-2 virus. If the test is positive, this is a case. Some positive rapid lateral flow test results are confirmed with lab-based polymerase chain reaction (PCR) tests taken within 72 hours. If the PCR test results are negative, these are not reported as confirmed cases.</p><p>People who test positive again after a given time period are counted as new cases. In England people are counted as new cases if they test positive again more than 90 days after their last positive test.</p><p>Data for the last 5 days by specimen date are considered incomplete as it takes time to get test results and record them on relevant lab systems. Cases data for England includes all positive lab-confirmed PCR test results plus, positive rapid lateral flow tests unless followed by a negative PCR test taken within 72 hours.</p><p>The count of reported new cases in the last 7 days is the total of the daily cases counts in the 7 days up to and including the most recent date with "complete" data (i.e. 5 days before the current date).</p>',
    caveats:
      '<p>This figure will underestimate the actual number of COVID-19 infections due to people not testing or not being able to report LFD results.</p><p>Variation in cases can reflect differences in the underlying population, including variation in vaccination status, public health measures and community transmission.</p>',
    category: 'Vaccinations',
    topic: 'COVID-19',
    apiName: 'newPeopleVaccinatedThirdDoseByPublishDate',
    last_published_at: '2023-10-24T16:09:35.359598+01:00',
  },
]
