import fs from 'fs'
import path from 'path'

const getChartFixture = (file: string) =>
  fs.readFileSync(path.resolve(`./src/api/mocks/charts/fixtures/${file}`), {
    encoding: 'utf8',
  })

/**
 * MIXED SUCCESS AND FAILURE STATE
 * Some requests resolved successfully and some failed
 */
export const pageDataMockMixed = [
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
      success: false,
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
      success: false,
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
      success: false,
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
      success: false,
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
      success: false,
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
      success: false,
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
      success: false,
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
]
