import { faker } from '@faker-js/faker'
import { sample } from 'lodash'

import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

export const metricsParentMock: PageResponse<PageType.MetricsParent> = {
  id: 25,
  meta: {
    seo_title: 'Metrics documentation | UKHSA data dashboard',
    search_description: '',
    type: 'metrics_documentation.MetricsDocumentationParentPage',
    detail_url: 'http://localhost/api/pages/25/',
    html_url: 'http://localhost/metrics-documentation/',
    slug: 'metrics-documentation',
    show_in_menus: true,
    first_published_at: '2023-10-24T16:09:35.359598+01:00',
    alias_of: null,
    parent: {
      id: 3,
      meta: {
        type: 'home.LandingPage',
        detail_url: 'http://localhost:3000/api/pages/3/',
        html_url: null,
      },
      title: 'UKHSA Dashboard Root',
    },
  },
  seo_change_frequency: 5,
  seo_priority: 0.5,
  last_updated_at: '2023-12-15T14:47:27.346523Z',
  title: 'Metrics documentation',
  body: '<p>Here we outline a list of metrics available in the UKHSA data dashboard. Click to view more information about a metric</p>',
  last_published_at: '2023-10-24T16:09:35.359598+01:00',
}

export const metricsChildMocks: PageResponse<PageType.MetricsChild>[] = [
  {
    id: 26,
    meta: {
      seo_title: 'Metrics child | UKHSA data dashboard',
      search_description: '',
      type: 'metrics_documentation.MetricsDocumentationChildEntry',
      detail_url: 'http://localhost/api/pages/26/',
      html_url: 'http://localhost/metrics-documentation/new-cases-7days-sum',
      slug: 'new-cases-7days-sum',
      show_in_menus: false,
      first_published_at: '2023-10-24T16:10:44.385654+01:00',
      alias_of: null,
      parent: {
        id: metricsParentMock.id,
        meta: {
          type: 'metrics_documentation.MetricsDocumentationParentPage',
          detail_url: 'http://localhost:3000/api/pages/25/',
          html_url: null,
        },
        title: 'Metrics documentation',
      },
    },
    seo_change_frequency: 4,
    seo_priority: 0.4,
    last_updated_at: '2023-12-15T14:47:27.346523Z',
    page_description: 'This metric shows the count of reported new cases in the last 7 days.',
    last_published_at: '2023-10-24T16:09:35.359598+01:00',
    title: 'New cases 7 days sum',
    metric: 'COVID-new_cases_7days_sum',
    topic: 'COVID-19',
    metric_group: 'cases',
    body: [
      {
        type: 'section',
        value: {
          title: 'Definition',
          body: '<p>This metric shows the count of reported new cases in the last 7 days.</p><p>New cases are reported by specimen date - the date the first sample that identified the infection was taken from an individual.</p>',
        },
        id: faker.string.uuid(),
      },
      {
        type: 'section',
        value: {
          title: 'Rationale',
          body: '<p>The timely identification of cases is important to controlling the spread of COVID-19 and reducing the burden on healthcare systems.</p>',
        },
        id: faker.string.uuid(),
      },
      {
        type: 'section',
        value: {
          title: 'Methodology',
          body: '<p>COVID-19 cases are identified by taking specimens from people and testing them for the SARS-CoV-2 virus. If the test is positive, this is a case. Some positive rapid lateral flow test results are confirmed with lab-based polymerase chain reaction (PCR) tests taken within 72 hours. If the PCR test results are negative, these are not reported as confirmed cases.</p><p>People who test positive again after a given time period are counted as new cases. In England people are counted as new cases if they test positive again more than 90 days after their last positive test.</p><p>Data for the last 5 days by specimen date are considered incomplete as it takes time to get test results and record them on relevant lab systems. Cases data for England includes all positive lab-confirmed PCR test results plus, positive rapid lateral flow tests unless followed by a negative PCR test taken within 72 hours.</p><p>The count of reported new cases in the last 7 days is the total of the daily cases counts in the 7 days up to and including the most recent date with "complete" data (i.e. 5 days before the current date).</p>',
        },
        id: faker.string.uuid(),
      },
      {
        type: 'section',
        value: {
          title: 'Caveats',
          body: '<p>This figure will underestimate the actual number of COVID-19 infections due to people not testing or not being able to report LFD results.</p><p>Variation in cases can reflect differences in the underlying population, including variation in vaccination status, public health measures and community transmission.</p>',
        },
        id: faker.string.uuid(),
      },
    ],
  },
  {
    id: 27,
    meta: {
      seo_title: 'Metrics child | UKHSA data dashboard',
      search_description: '',
      type: 'metrics_documentation.MetricsDocumentationChildEntry',
      detail_url: 'http://localhost/api/pages/27/',
      html_url: 'http://localhost/metrics-documentation/new-deaths-7days-change-percentage',
      slug: 'new-deaths-7days-change-percentage',
      show_in_menus: false,
      first_published_at: '2023-10-24T16:10:44.385654+01:00',
      alias_of: null,
      parent: {
        id: metricsParentMock.id,
        meta: {
          type: 'metrics_documentation.MetricsDocumentationParentPage',
          detail_url: 'http://localhost:3000/api/pages/25/',
          html_url: null,
        },
        title: 'Metrics documentation',
      },
    },
    seo_change_frequency: 5,
    seo_priority: 0.4,
    last_updated_at: '2023-12-15T14:47:27.346523Z',
    page_description: 'Percentage change between number of deaths by COVID-19 over the last 7 days vs the previous 7',
    last_published_at: '2023-10-24T16:09:35.359598+01:00',
    title: 'Headline ONS deaths 7 day percent change',
    metric: 'new_deaths_7days_change_percentage',
    topic: 'COVID-19',
    metric_group: 'deaths',
    body: [
      {
        type: 'section',
        value: {
          title: 'Definition',
          body: '<p>This metric shows the percentage change between the total number of deaths in the last 7 days of people whose death certificate mentioned COVID-19 as one of the causes compared to the previous 7 days.</p><p>Deaths are reported by date of death registration.</p>',
        },
        id: faker.string.uuid(),
      },
      {
        type: 'section',
        value: {
          title: 'Rationale',
          body: '<p>COVID-19 deaths depend on the scale and severity of recent COVID-19 cases.</p>',
        },
        id: faker.string.uuid(),
      },
      {
        type: 'section',
        value: {
          title: 'Methodology',
          body: `<p>Deaths where COVID-19 is mentioned as one of the causes on the death certificate are reported by the Office for National Statistics.</p><p>The deceased may or may not have had a confirmed positive test for COVID-19. People who had COVID-19 but did not have it mentioned on their death certificate as a cause of death are excluded.</p><p>Deaths are allocated to the deceased's usual area of residence.</p><p>Bank holidays can affect the number of deaths registered in a given week.</p><p>There is a lag of at least 11 days in the reporting of data and the 14 days prior to the latest date available in the dataset is considered to be incomplete due to the time taken for deaths to be registered.</p><p>The percentage change in new deaths in the last 7 days is calculated as the difference between the total of the daily deaths registered in the 7 days up to and including the most recent date with "complete" data and the total of the daily deaths registered in the previous 7 days, divided by the total of the daily deaths registered in the previous 7 days.</p`,
        },
        id: faker.string.uuid(),
      },
      {
        type: 'section',
        value: {
          title: 'Caveats',
          body: '<p>A change from 0 to a number greater than 0 will be displayed as 100% increase.</p><p>A change from a number greater than 0 to 0 will be displayed as -100% i.e. a 100% decrease</p>',
        },
        id: faker.string.uuid(),
      },
    ],
  },
  {
    id: 28,
    meta: {
      seo_title: 'Metrics child | UKHSA data dashboard',
      search_description: '',
      type: 'metrics_documentation.MetricsDocumentationChildEntry',
      detail_url: 'http://localhost/api/pages/28/',
      html_url: 'http://localhost/metrics-documentation/covid-occupied-beds-latest',
      slug: 'covid-occupied-beds-latest',
      show_in_menus: false,
      first_published_at: '2023-10-24T16:10:44.385654+01:00',
      alias_of: null,
      parent: {
        id: metricsParentMock.id,
        meta: {
          type: 'metrics_documentation.MetricsDocumentationParentPage',
          detail_url: 'http://localhost:3000/api/pages/25/',
          html_url: null,
        },
        title: 'Metrics documentation',
      },
    },
    seo_change_frequency: 5,
    seo_priority: 0.4,
    last_updated_at: '2023-12-15T14:47:27.346523Z',
    page_description:
      'This metric shows the average number of beds occupied by confirmed COVID-19 patients over the latest 7 days.',
    last_published_at: '2023-10-24T16:09:35.359598+01:00',
    title: 'Covid occupied beds latest',
    metric: 'covid_occupied_beds_latest',
    topic: 'COVID-19',
    metric_group: 'healthcare',
    body: [
      {
        type: 'section',
        value: {
          title: 'Definition',
          body: '<p>This metric shows the average number of beds occupied by confirmed COVID-19 patients over the latest 7 days.</p>',
        },
        id: faker.string.uuid(),
      },
      {
        type: 'section',
        value: {
          title: 'Rationale',
          body: '<p>Understanding rates and patterns of hospital admissions can help to inform planning around hospital pressures including beds and staffing.</p>',
        },
        id: faker.string.uuid(),
      },
      {
        type: 'section',
        value: {
          title: 'Methodology',
          body: '<p>This data includes people admitted to hospital who tested positive for COVID-19 in the 14 days before their admission and during their stay. Hospital inpatients who are diagnosed with COVID-19 after admission are reported as being admitted on the day before their diagnosis.</p><p>Admissions figures include people admitted to NHS acute hospitals and mental health and learning disability (MHLD) trusts.</p><p>Updates are published by NHS England on a Wednesday, and contain data up to the previous Sunday.</p><p>This metric is calculated as the total of the daily number of beds occupied in the 7 days up to and including the most recent date, divided by 7</p>',
        },
        id: faker.string.uuid(),
      },
    ],
  },
  {
    id: 29,
    meta: {
      seo_title: 'Metrics child | UKHSA data dashboard',
      search_description: '',
      type: 'metrics_documentation.MetricsDocumentationChildEntry',
      detail_url: 'http://localhost/api/pages/29/',
      html_url: 'http://localhost/metrics-documentation/new-pcr-tests-daily',
      slug: 'new-pcr-tests-daily',
      show_in_menus: false,
      first_published_at: '2023-10-24T16:10:44.385654+01:00',
      alias_of: null,
      parent: {
        id: metricsParentMock.id,
        meta: {
          type: 'metrics_documentation.MetricsDocumentationParentPage',
          detail_url: 'http://localhost:3000/api/pages/25/',
          html_url: null,
        },
        title: 'Metrics documentation',
      },
    },
    seo_change_frequency: 5,
    seo_priority: 0.4,
    last_updated_at: '2023-12-15T14:47:27.346523Z',
    page_description: 'Count of new confirmed positive and negative COVID-19 PCR test results over 7 days',
    last_published_at: '2023-10-24T16:09:35.359598+01:00',
    title: 'New pcr tests daily',
    metric: 'new_pcr_tests_daily',
    topic: 'COVID-19',
    metric_group: 'testing',
    body: [
      {
        type: 'section',
        value: {
          title: 'Rationale',
          body: '<p>COVID-19 testing is required to identify cases of COVID-19</p>',
        },
        id: faker.string.uuid(),
      },
      {
        type: 'section',
        value: {
          title: 'Methodology',
          body: '<p>The testing data reporting on the dashboard is for polymerase chain reaction (PCR) tests only.  Data from rapid lateral flow (LFD) tests are not included.  Note that cases data includes results from both PCR and LFD tests.</p><p>Data for the last 5 days by specimen date are considered incomplete as it takes time to get test results and record them on relevant lab systems.</p><p>This metric is calculated as the total of the daily tests counts in the 7 days up to and including the date shown.</p>',
        },
        id: faker.string.uuid(),
      },
      {
        type: 'section',
        value: {
          title: 'Caveats',
          body: '<p>Results from PCR tests only - LFD results are not included</p>',
        },
        id: faker.string.uuid(),
      },
    ],
  },
  {
    id: 30,
    meta: {
      seo_title: 'Metrics child | UKHSA data dashboard',
      search_description: '',
      type: 'metrics_documentation.MetricsDocumentationChildEntry',
      detail_url: 'http://localhost/api/pages/26/',
      html_url: 'http://localhost/metrics-documentation/new-cases-7days-percent',
      slug: 'new-cases-7days-percent',
      show_in_menus: false,
      first_published_at: '2023-10-24T16:10:44.385654+01:00',
      alias_of: null,
      parent: {
        id: metricsParentMock.id,
        meta: {
          type: 'metrics_documentation.MetricsDocumentationParentPage',
          detail_url: 'http://localhost:3000/api/pages/25/',
          html_url: null,
        },
        title: 'Metrics documentation',
      },
    },
    seo_change_frequency: 5,
    seo_priority: 0.4,
    last_updated_at: '2023-12-15T14:47:27.346523Z',
    page_description: 'This metric shows the percentage of reported new cases in the last 7 days.',
    last_published_at: '2023-10-24T16:09:35.359598+01:00',
    title: 'New cases 7 days percent',
    metric: 'COVID-new_cases_7days_percent',
    topic: 'COVID-19',
    metric_group: 'cases',
    body: [
      {
        type: 'section',
        value: {
          title: 'Definition',
          body: '<p>This metric shows the percent of reported new cases in the last 7 days.</p><p>New cases are reported by specimen date - the date the first sample that identified the infection was taken from an individual.</p>',
        },
        id: faker.string.uuid(),
      },
      {
        type: 'section',
        value: {
          title: 'Rationale',
          body: '<p>The timely identification of cases is important to controlling the spread of COVID-19 and reducing the burden on healthcare systems.</p>',
        },
        id: faker.string.uuid(),
      },
      {
        type: 'section',
        value: {
          title: 'Methodology',
          body: '<p>COVID-19 cases are identified by taking specimens from people and testing them for the SARS-CoV-2 virus. If the test is positive, this is a case. Some positive rapid lateral flow test results are confirmed with lab-based polymerase chain reaction (PCR) tests taken within 72 hours. If the PCR test results are negative, these are not reported as confirmed cases.</p><p>People who test positive again after a given time period are counted as new cases. In England people are counted as new cases if they test positive again more than 90 days after their last positive test.</p><p>Data for the last 5 days by specimen date are considered incomplete as it takes time to get test results and record them on relevant lab systems. Cases data for England includes all positive lab-confirmed PCR test results plus, positive rapid lateral flow tests unless followed by a negative PCR test taken within 72 hours.</p><p>The count of reported new cases in the last 7 days is the total of the daily cases counts in the 7 days up to and including the most recent date with "complete" data (i.e. 5 days before the current date).</p>',
        },
        id: faker.string.uuid(),
      },
      {
        type: 'section',
        value: {
          title: 'Caveats',
          body: '<p>This figure will underestimate the actual number of COVID-19 infections due to people not testing or not being able to report LFD results.</p><p>Variation in cases can reflect differences in the underlying population, including variation in vaccination status, public health measures and community transmission.</p>',
        },
        id: faker.string.uuid(),
      },
    ],
  },

  // Generate a set of random pages for testing of pagination
  ...Array.from({ length: 50 }).map<PageResponse<PageType.MetricsChild>>((item, index) => ({
    id: index * 2000,
    meta: {
      seo_title: `Metrics child ${index + 1} | UKHSA data dashboard`,
      search_description: '',
      type: 'metrics_documentation.MetricsDocumentationChildEntry',
      detail_url: 'http://localhost/api/pages/29/',
      html_url: `http://localhost/metrics-documentation/metrics-child-mock-${index + 1}`,
      slug: `metrics-child-mock-${index + 1}`,
      show_in_menus: false,
      first_published_at: '2023-10-24T16:10:44.385654+01:00',
      alias_of: null,
      parent: {
        id: metricsParentMock.id,
        meta: {
          type: 'metrics_documentation.MetricsDocumentationParentPage',
          detail_url: 'http://localhost:3000/api/pages/25/',
          html_url: null,
        },
        title: 'Metrics documentation',
      },
    },
    seo_change_frequency: 5,
    seo_priority: 0.4,
    last_updated_at: '2024-07-02T12:44:54.461914+01:00',
    page_description: faker.lorem.paragraph(),
    last_published_at: '2023-10-24T16:09:35.359598+01:00',
    title: `Metrics child mock ${index + 1}`,
    metric: 'new_pcr_tests_daily',
    topic: sample(['COVID-19', 'Influenza']) || 'COVID-19',
    metric_group: sample(['cases', 'healthcare', 'testing', 'deaths', 'vaccinations']) || 'cases',
    body: [
      {
        type: 'section',
        value: {
          title: 'Definition',
          body: `<p>${faker.lorem.sentence()}</p>`,
        },
        id: faker.string.uuid(),
      },
      {
        type: 'section',
        value: {
          title: 'Rationale',
          body: `<p>${faker.lorem.sentence()}</p>`,
        },
        id: faker.string.uuid(),
      },
      {
        type: 'section',
        value: {
          title: 'Methodology',
          body: `<p>${faker.lorem.sentence()}</p>`,
        },
        id: faker.string.uuid(),
      },
      {
        type: 'section',
        value: {
          title: 'Caveats',
          body: `<p>${faker.lorem.sentence()}</p>`,
        },
        id: faker.string.uuid(),
      },
    ],
  })),
]
