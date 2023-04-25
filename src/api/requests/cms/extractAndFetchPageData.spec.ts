import fs from 'fs'
import path from 'path'
import { server } from '@/api/msw/server'
import { homePageMock } from '@/api/mocks/cms/data/page'
import { extractAndFetchPageData } from './extractAndFetchPageData'

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

const getChartFixture = (file: string) =>
  fs.readFileSync(path.resolve(`./src/api/mocks/charts/fixtures/${file}`), {
    encoding: 'utf8',
  })

test('Parses the cms page, fetches data from found sources and returns an orchestrated response', async () => {
  const result = await extractAndFetchPageData(homePageMock.body)

  expect(result).toStrictEqual([
    [
      {
        topic: 'COVID-19',
        metric: 'new_cases_7days_sum',
        body: 'Weekly',
      },
      { success: true, data: { value: 24298 } },
    ],
    [
      {
        topic: 'COVID-19',
        metric: 'new_cases_7days_change',
        body: 'Last 7 days',
        percentage_metric: 'new_cases_7days_change_percentage',
      },
      {
        success: true,
        data: {
          metric_name: 'new_cases_7days_change',
          metric_value: -592,
          percentage_metric_name: 'new_cases_7days_change_percentage',
          percentage_metric_value: -3,
          direction: 'down',
          colour: 'green',
        },
      },
    ],
    [
      {
        topic: 'COVID-19',
        metric: 'new_deaths_7days_sum',
        body: 'Weekly',
      },
      { success: true, data: { value: 379 } },
    ],
    [
      {
        topic: 'COVID-19',
        metric: 'new_deaths_7days_change',
        body: 'Last 7 days',
        percentage_metric: 'new_deaths_7days_change_percentage',
      },
      {
        success: true,
        data: {
          metric_name: 'new_deaths_7days_sum',
          metric_value: 21,
          percentage_metric_name: 'new_deaths_7days_change_percentage',
          percentage_metric_value: -5,
          direction: 'down',
          colour: 'green',
        },
      },
    ],
    [
      {
        topic: 'COVID-19',
        metric: 'new_admissions_7days',
        body: 'Patients admitted',
      },
      { success: true, data: { value: 6288 } },
    ],
    [
      {
        topic: 'COVID-19',
        metric: 'new_admissions_7days_change',
        body: 'Last 7 days',
        percentage_metric: 'new_admissions_7days_change_percentage',
      },
      {
        success: true,
        data: {
          metric_name: 'new_admissions_7day_avg',
          metric_value: 377,
          percentage_metric_name: 'new_admissions_7days_change_percentage',
          percentage_metric_value: 6,
          direction: 'up',
          colour: 'red',
        },
      },
    ],
    [
      [
        {
          type: 'plot',
          value: {
            topic: 'COVID-19',
            metric: 'new_cases_daily',
            chart_type: 'line_with_shaded_section',
            date_from: null,
            date_to: null,
            stratum: '',
            geography: '',
            geography_type: '',
          },
          id: '74c93e38-e73f-4110-9a28-ef2ab8bcb52f',
        },
      ],
      getChartFixture('COVID-19/new_cases_daily.svg'),
    ],
    [
      {
        topic: 'COVID-19',
        metric: 'new_admissions_7days',
        body: 'Last 7 days',
      },
      { success: true, data: { value: 6288 } },
    ],
    [
      {
        topic: 'COVID-19',
        metric: 'new_admissions_7days_change',
        body: '',
        percentage_metric: 'new_admissions_7days_change_percentage',
      },
      {
        success: true,
        data: {
          metric_name: 'new_admissions_7day_avg',
          metric_value: 377,
          percentage_metric_name: 'new_admissions_7days_change_percentage',
          percentage_metric_value: 6,
          direction: 'up',
          colour: 'red',
        },
      },
    ],
    [
      [
        {
          type: 'plot',
          value: {
            topic: 'COVID-19',
            metric: 'new_deaths_daily',
            chart_type: 'line_with_shaded_section',
            date_from: null,
            date_to: null,
            stratum: '',
            geography: '',
            geography_type: '',
          },
          id: '76482012-851e-44f0-b2f6-9af017b68968',
        },
      ],
      getChartFixture('COVID-19/new_deaths_daily.svg'),
    ],
    [
      {
        topic: 'COVID-19',
        metric: 'new_deaths_7days_sum',
        body: 'Last 7 days',
      },
      { success: true, data: { value: 379 } },
    ],
    [
      {
        topic: 'COVID-19',
        metric: 'new_deaths_7days_change',
        body: '',
        percentage_metric: 'new_deaths_7days_change_percentage',
      },
      {
        success: true,
        data: {
          metric_name: 'new_deaths_7days_sum',
          metric_value: 21,
          percentage_metric_name: 'new_deaths_7days_change_percentage',
          percentage_metric_value: -5,
          direction: 'down',
          colour: 'green',
        },
      },
    ],
    [
      {
        topic: 'Influenza',
        metric: 'weekly_hospital_admissions_rate_latest',
        body: 'Hospital admission rate (per 100,000)',
      },
      { success: true, data: { value: 981596 } },
    ],
    [
      {
        topic: 'COVID-19',
        metric: 'weekly_hospital_admissions_rate_change',
        body: 'Last 7 days',
        percentage_metric: 'weekly_hospital_admissions_rate_change_percentage',
      },
      {
        success: true,
        data: {
          metric_name: 'weekly_hospital_admissions_rate_change',
          metric_value: 272,
          percentage_metric_name: 'weekly_hospital_admissions_rate_change_percentage',
          percentage_metric_value: 100,
          direction: 'up',
          colour: 'red',
        },
      },
    ],
    [
      [
        {
          type: 'plot',
          value: {
            topic: 'Influenza',
            metric: 'weekly_hospital_admissions_rate',
            chart_type: 'line_with_shaded_section',
            date_from: null,
            date_to: null,
            stratum: '',
            geography: '',
            geography_type: '',
          },
          id: 'dfaa61af-4e54-4d46-8d02-babedfcf4176',
        },
      ],
      getChartFixture('Influenza/weekly_hospital_admissions_rate.svg'),
    ],
    [
      {
        topic: 'Influenza',
        metric: 'weekly_hospital_admissions_rate_latest',
        body: 'Last 7 days',
      },
      { success: true, data: { value: 981596 } },
    ],
    [
      {
        topic: 'Influenza',
        metric: 'weekly_hospital_admissions_rate_change',
        body: '',
        percentage_metric: 'weekly_hospital_admissions_rate_change_percentage',
      },
      {
        success: true,
        data: {
          metric_name: 'weekly_hospital_admissions_rate_change',
          metric_value: 5911,
          percentage_metric_name: 'weekly_hospital_admissions_rate_change_percentage',
          percentage_metric_value: 0.3,
          direction: 'down',
          colour: 'green',
        },
      },
    ],
    [
      [
        {
          type: 'plot',
          value: {
            topic: 'Influenza',
            metric: 'weekly_positivity_latest',
            chart_type: 'line_with_shaded_section',
            date_from: null,
            date_to: null,
            stratum: '',
            geography: '',
            geography_type: '',
          },
          id: 'ad5dc74a-a6b1-48e2-bafb-f07253695cc4',
        },
      ],
      getChartFixture('Influenza/weekly_positivity_latest.svg'),
    ],
  ])
})
