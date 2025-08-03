import { Mock } from 'ts-mockery'
import { z } from 'zod'

import type { Body, CardTypes } from '@/api/models/cms/Page'

type PageSection = z.infer<typeof Body>[number]

export const mockSectionNoLink = Mock.of<PageSection>({
  id: 'testId',
  value: {
    heading: 'COVID-19',
    content: [],
  },
})

export const mockSectionWithLink = Mock.of<PageSection>({
  id: 'testId',
  value: {
    heading: 'COVID-19',
    page_link: 'http://localhost:3000/topics/covid-19',
    content: [],
  },
})

export const mockSectionWithLongHeading = Mock.of<PageSection>({
  id: 'testId',
  value: {
    heading: 'Other respiratory viruses',
    page_link: 'http://localhost:3000/topics/other-respiratory-viruses',
    content: [],
  },
})

export const mockSectionWithCard = Mock.of<PageSection>({
  id: 'testId',
  value: {
    heading: 'Other respiratory viruses',
    content: [
      {
        id: 'cardTestId',
        type: 'text_card',
        value: {
          body: '<p>This is some cms content</p>',
        },
      },
    ],
  },
})

type CardType = z.infer<typeof CardTypes>

export const mockTextCard = Mock.of<CardType>({
  id: 'mockid',
  type: 'text_card',
  value: {
    body: '<div><h3>Text card heading</h3><p>Text card body</p></div>',
  },
})

export const mockHeadlineNumbersRowCard = Mock.of<CardType>({
  id: 'mockid',
  type: 'headline_numbers_row_card',
  value: {
    columns: [
      {
        type: 'column',
        value: {
          title: 'Cases',
          date_prefix: 'Up to',
          rows: [
            {
              type: 'headline_number',
              value: {
                topic: 'COVID-19',
                metric: 'COVID-19_headline_newcases_7daytotals',
                body: 'Weekly',
              },
              id: 'eff08341-7bfa-4a3b-b013-527e7b954ce8',
            },
            {
              type: 'trend_number',
              value: {
                topic: 'COVID-19',
                metric: 'COVID-19_headline_newcases_7daychange',
                body: 'Last 7 days',
                percentage_metric: 'COVID-19_headline_newcases_7daypercentchange',
              },
              id: 'a57a4ad5-6b52-45a6-acfd-2fe208cb5617',
            },
          ],
        },
        id: 'ff081d2a-e235-4bc2-9b09-220f8fe20494',
      },
      {
        type: 'column',
        value: {
          title: 'Deaths',
          date_prefix: 'Up to',
          rows: [
            {
              type: 'headline_number',
              value: {
                topic: 'COVID-19',
                metric: 'COVID-19_headline_ONSdeaths_7daytotals',
                body: 'Weekly',
              },
              id: '2e403485-030c-4122-86be-5827a095f30d',
            },
            {
              type: 'trend_number',
              value: {
                topic: 'COVID-19',
                metric: 'COVID-19_headline_ONSdeaths_7daychange',
                body: 'Last 7 days',
                percentage_metric: 'COVID-19_headline_ONSdeaths_7daypercentchange',
              },
              id: 'ea8603ca-7b4d-4ef5-a8b1-f27a565938b5',
            },
          ],
        },
        id: '530cf367-092c-40d1-9129-c2274c7836b9',
      },
      {
        type: 'column',
        value: {
          title: 'Healthcare',
          date_prefix: 'Up to',
          rows: [
            {
              type: 'headline_number',
              value: {
                topic: 'COVID-19',
                metric: 'COVID-19_headline_7DayAdmissions',
                body: 'Patients admitted',
              },
              id: '2f49a215-02e7-4ded-94b1-1a0c2933708b',
            },
            {
              type: 'trend_number',
              value: {
                topic: 'COVID-19',
                metric: 'COVID-19_headline_7DayAdmisionsChange',
                body: 'Last 7 days',
                percentage_metric: 'COVID-19_headline_7DayAdmissionsPercentChange',
              },
              id: '6c09d01e-82c5-425f-aa07-1bdd22d1eaa8',
            },
          ],
        },
        id: 'fad2e89a-8a65-44a8-b962-9df59169c0af',
      },
      {
        type: 'column',
        value: {
          title: 'Vaccines',
          date_prefix: 'Up to',
          rows: [
            {
              type: 'headline_number',
              value: {
                topic: 'COVID-19',
                metric: 'COVID-19_headline_totalvaccines_spring23',
                body: 'Autumn booster',
              },
              id: 'ae3344f7-5b23-4977-bea9-2e1ccd84eb50',
            },
          ],
        },
        id: '93b6367b-fbb3-47e8-96db-f724d947fa00',
      },
      {
        type: 'column',
        value: {
          title: 'Testing',
          date_prefix: 'Up to',
          rows: [
            {
              type: 'percentage_number',
              value: {
                topic: 'COVID-19',
                metric: 'COVID-19_headline_positivity_latest',
                body: 'Virus tests positivity',
              },
              id: '36746bcd-1dce-4e5e-81f8-60c8b9994540',
            },
          ],
        },
        id: '1e3bf214-88e4-4cf4-9b78-3ad7eabb2eaa',
      },
    ],
  },
})

export const mockHeadlineNumbersRowCardWithOneColumn = Mock.of<CardType>({
  id: 'mockid',
  type: 'headline_numbers_row_card',
  value: {
    columns: [
      {
        type: 'column',
        value: {
          title: 'Cases',
          date_prefix: 'Up to',
          rows: [
            {
              type: 'headline_number',
              value: {
                topic: 'COVID-19',
                metric: 'COVID-19_headline_newcases_7daytotals',
                body: 'Weekly',
              },
              id: 'eff08341-7bfa-4a3b-b013-527e7b954ce8',
            },
          ],
        },
        id: 'ff081d2a-e235-4bc2-9b09-220f8fe20494',
      },
    ],
  },
})

export const mockChartRowCardWithSingleChartCard = Mock.of<CardType>({
  id: 'mockid',
  type: 'chart_row_card',
  value: {
    columns: [
      {
        id: 'col-1',
        type: 'chart_card',
        value: {
          title: 'Chart heading 1',
          body: 'Chart description 1',
          about: 'Sample About Field',
          x_axis: '',
          y_axis: '',
        },
      },
    ],
  },
})

export const mockChartRowCardWithChartHeadlineAndTrendCard = Mock.of<CardType>({
  id: 'mockid',
  type: 'chart_row_card',
  value: {
    columns: [
      {
        id: 'col-1',
        type: 'chart_with_headline_and_trend_card',
        value: {
          title: 'Chart heading 1',
          body: 'Chart description 1',
          x_axis: '',
          y_axis: '',
          headline_number_columns: [
            { id: '1', type: 'percentage_number' },
            { id: '2', type: 'headline_number' },
            { id: '3', type: 'trend_number' },
          ],
        },
      },
    ],
  },
})

export const mockChartRowCardWithDualChartCard = Mock.of<CardType>({
  id: 'mockid',
  type: 'chart_row_card',
  value: {
    columns: [
      {
        id: 'col-1',
        type: 'chart_card',
        value: {
          title: 'Chart heading 1',
          body: 'Chart description 1',
          x_axis: '',
          y_axis: '',
        },
      },
      {
        id: 'col-2',
        type: 'chart_card',
        value: {
          title: 'Chart heading 2',
          body: 'Chart description 2',
          x_axis: '',
          y_axis: '',
        },
      },
    ],
  },
})
export const mockLinkedMapCard = Mock.of<CardType>({
  id: 'mockid',
  type: 'filter_linked_map',
  value: {
    title_prefix: 'Map Heading',
    legend_title: 'Level of Coverage',
  },
})

export const mockWeatherHealthAlertCard = Mock.of<CardType>({
  id: 'mockid',
  type: 'weather_health_alert_card',
  value: {
    title: 'Heat health alerts',
    sub_title: 'Across England',
    alert_type: 'heat',
  },
})

export const mockChartCardSectionWithSixCards = Mock.of<CardType>({
  id: 'mockid',
  type: 'chart_card_section',
  value: {
    cards: [
      {
        id: 'c49837c7-f173-4e92-bbfd-7e36fc496738',
        type: 'simplified_chart_with_link',
        value: {
          title: 'Influenza',
          sub_title: 'Healthcare admission rates',
          tag_manager_event_id: '',
          topic_page: 'https://ukhsa-dashboard.data.gov.uk/respiratory-viruses/influenza/',
          x_axis: 'date',
          y_axis: 'metric',
          chart: [
            {
              type: 'plot',
              id: '22e7a544-8ae7-4033-be4e-5aeaf4ebf754',
              value: {
                topic: 'Influenza',
                metric: 'influenza_testing_positivityByWeek',
                chart_type: 'line_single_simplified',
                stratum: 'default',
                geography: 'England',
                geography_type: 'Nation',
                sex: 'all',
                age: 'all',
                date_from: null,
                date_to: null,
                use_smooth_lines: false,
              },
            },
          ],
        },
      },
      {
        id: 'c51e15a5-1e99-497b-8ae4-c57978e71a08',
        type: 'simplified_chart_with_link',
        value: {
          title: 'Respiratory syncytial virus (RSV)',
          sub_title: 'Healthcare admission rates',
          tag_manager_event_id: '',
          topic_page: 'https://ukhsa-dashboard.data.gov.uk/respiratory-viruses/respiratory-syncytial-virus-rsv/',
          x_axis: 'date',
          y_axis: 'metric',
          chart: [
            {
              type: 'plot',
              id: 'a37b7ff5-c0e9-48ec-8cd4-f03b384f7577',
              value: {
                topic: 'RSV',
                metric: 'RSV_testing_positivityByWeek',
                chart_type: 'line_single_simplified',
                stratum: 'default',
                geography: 'England',
                geography_type: 'Nation',
                sex: 'all',
                age: 'all',
                date_from: null,
                date_to: null,
                use_smooth_lines: false,
              },
            },
          ],
        },
      },
      {
        id: 'aa584788-3d7e-465f-8c34-cacef4fb4e7e',
        type: 'simplified_chart_with_link',
        value: {
          title: 'COVID-19',
          sub_title: 'Cases Reported',
          tag_manager_event_id: '',
          topic_page: 'https://ukhsa-dashboard.data.gov.uk/respiratory-viruses/covid-19/',
          x_axis: 'date',
          y_axis: 'metric',
          chart: [
            {
              type: 'plot',
              id: '745f044b-054a-4b25-b7f5-a76ba8408eaf',
              value: {
                topic: 'COVID-19',
                metric: 'COVID-19_testing_positivity7DayRolling',
                chart_type: 'line_single_simplified',
                stratum: 'default',
                geography: 'England',
                geography_type: 'Nation',
                sex: 'all',
                age: 'all',
                date_from: null,
                date_to: null,
                use_smooth_lines: false,
              },
            },
          ],
        },
      },
      {
        id: 'c49837c7-f173-4e92-bbfd-7e36fc496738',
        type: 'simplified_chart_with_link',
        value: {
          title: 'Influenza v2',
          sub_title: 'Testing positivity',
          tag_manager_event_id: '',
          topic_page: 'https://ukhsa-dashboard.data.gov.uk/respiratory-viruses/influenza/',
          x_axis: 'date',
          y_axis: 'metric',
          chart: [
            {
              type: 'plot',
              id: '22e7a544-8ae7-4033-be4e-5aeaf4ebf754',
              value: {
                topic: 'Influenza',
                metric: 'influenza_testing_positivityByWeek',
                chart_type: 'line_single_simplified',
                stratum: 'default',
                geography: 'England',
                geography_type: 'Nation',
                sex: 'all',
                age: 'all',
                date_from: null,
                date_to: null,
                use_smooth_lines: false,
              },
            },
          ],
        },
      },
      {
        id: 'c51e15a5-1e99-497b-8ae4-c57978e71a08',
        type: 'simplified_chart_with_link',
        value: {
          title: 'Respiratory syncytial virus (RSV) v2',
          sub_title: 'Testing positivity',
          tag_manager_event_id: '',
          topic_page: 'https://ukhsa-dashboard.data.gov.uk/respiratory-viruses/respiratory-syncytial-virus-rsv/',
          x_axis: 'date',
          y_axis: 'metric',
          chart: [
            {
              type: 'plot',
              id: 'a37b7ff5-c0e9-48ec-8cd4-f03b384f7577',
              value: {
                topic: 'RSV',
                metric: 'RSV_testing_positivityByWeek',
                chart_type: 'line_single_simplified',
                stratum: 'default',
                geography: 'England',
                geography_type: 'Nation',
                sex: 'all',
                age: 'all',
                date_from: null,
                date_to: null,
                use_smooth_lines: false,
              },
            },
          ],
        },
      },
      {
        id: 'aa584788-3d7e-465f-8c34-cacef4fb4e7e',
        type: 'simplified_chart_with_link',
        value: {
          title: 'COVID-19 v2',
          sub_title: 'Testing positivity',
          tag_manager_event_id: '',
          topic_page: 'https://ukhsa-dashboard.data.gov.uk/respiratory-viruses/covid-19/',
          x_axis: 'date',
          y_axis: 'metric',
          chart: [
            {
              type: 'plot',
              id: '745f044b-054a-4b25-b7f5-a76ba8408eaf',
              value: {
                topic: 'COVID-19',
                metric: 'COVID-19_testing_positivity7DayRolling',
                chart_type: 'line_single_simplified',
                stratum: 'default',
                geography: 'England',
                geography_type: 'Nation',
                sex: 'all',
                age: 'all',
                date_from: null,
                date_to: null,
                use_smooth_lines: false,
              },
            },
          ],
        },
      },
    ],
  },
})
