import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'
import { relatedLinksMock } from '../elements'

export const homePageMock: PageResponse<PageType.Home> = {
  id: 1,
  meta: {
    type: 'home.HomePage',
    detail_url: 'http://localhost/api/pages/4/',
    html_url: null,
    slug: 'respiratory-viruses',
    show_in_menus: false,
    seo_title: '',
    search_description: '',
    first_published_at: '2023-04-21T15:27:01.338017Z',
    alias_of: null,
    parent: {
      id: 2,
      meta: {
        type: 'wagtailcore.Page',
        detail_url: 'http://localhost/api/pages/2/',
        html_url: null,
      },
      title: 'Welcome to your new Wagtail site!',
    },
  },
  title: 'Respiratory viruses',
  body: [
    {
      type: 'text',
      value: {
        body: '<p data-block-key="cl294">Data and insights from the UKHSA on respiratory viruses. See the <a href="https://duckduckgo.com/?t=ffab&amp;q=puppies&amp;atb=v348-1&amp;iax=images&amp;ia=images">simple summary for England (opens in new tab)</a></p>',
      },
      id: 'cc2d5c0c-97a3-45a0-83cc-d21b1ba7e06c',
    },
    {
      type: 'text',
      value: {
        body: '<h2 data-block-key="cl294">Coronavirus</h2><p data-block-key="bf348">The UKHSA dashboard for data and insights on coronavirus.</p>',
      },
      id: 'b1f3d7ab-3c43-492c-8dab-c65a76a7a867',
    },
    {
      type: 'headline_numbers_row_card',
      value: {
        columns: [
          {
            type: 'headline_and_trend_component',
            value: {
              title: 'Cases',
              headline_number: {
                topic: 'COVID-19',
                metric: 'new_cases_7days_sum',
                body: 'Weekly',
              },
              trend_number: {
                topic: 'COVID-19',
                metric: 'new_cases_7days_change',
                body: 'Last 7 days',
                percentage_metric: 'new_cases_7days_change_percentage',
              },
            },
            id: '72a1b90c-5f73-4a67-a6bc-9385b3746ce0',
          },
          {
            type: 'headline_and_trend_component',
            value: {
              title: 'Deaths',
              headline_number: {
                topic: 'COVID-19',
                metric: 'new_deaths_7days_sum',
                body: 'Weekly',
              },
              trend_number: {
                topic: 'COVID-19',
                metric: 'new_deaths_7days_change',
                body: 'Last 7 days',
                percentage_metric: 'new_deaths_7days_change_percentage',
              },
            },
            id: '19639378-5280-4c28-95d8-17390618367c',
          },
          {
            type: 'headline_and_trend_component',
            value: {
              title: 'Healthcare',
              headline_number: {
                topic: 'COVID-19',
                metric: 'new_admissions_7days',
                body: 'Patients admitted',
              },
              trend_number: {
                topic: 'COVID-19',
                metric: 'new_admissions_7days_change',
                body: 'Last 7 days',
                percentage_metric: 'new_admissions_7days_change_percentage',
              },
            },
            id: 'c124e3ba-f12d-418b-8db9-066274b92fc2',
          },
          {
            type: 'dual_headline_component',
            value: {
              title: 'Vaccines',
              top_headline_number: {
                topic: 'COVID-19',
                metric: 'latest_total_vaccinations_autumn22',
                body: 'Autumn booster',
              },
              bottom_headline_number: {
                topic: 'COVID-19',
                metric: 'latest_vaccinations_uptake_autumn22',
                body: 'Percentage uptake (%)',
              },
            },
            id: 'aea30c9d-5ddd-417a-81e5-04f5048956c9',
          },
          {
            type: 'single_headline_component',
            value: {
              title: 'Testing',
              headline_number: {
                topic: 'COVID-19',
                metric: 'positivity_7days_latest',
                body: 'Virus tests positivity (%)',
              },
            },
            id: 'd38fd53c-3513-4420-8d52-5bcd5c828443',
          },
        ],
      },
      id: '85218cfd-b975-40dc-bcaf-5f79d8f6f60f',
    },
    {
      type: 'chart_with_headline_and_trend_card',
      value: {
        title: 'Cases',
        body: 'Positive tests reported in England',
        chart: [
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
        headline_number_columns: [
          {
            type: 'headline_number',
            value: {
              topic: 'COVID-19',
              metric: 'new_admissions_7days',
              body: 'Last 7 days',
            },
            id: '5d63adc9-f0b9-4b8b-8380-ee863daa533a',
          },
          {
            type: 'trend_number',
            value: {
              topic: 'COVID-19',
              metric: 'new_admissions_7days_change',
              body: '',
              percentage_metric: 'new_admissions_7days_change_percentage',
            },
            id: '18406a2d-52fb-48a1-a9ee-5420dffb238a',
          },
        ],
      },
      id: '36418bc1-35fe-46e2-b38f-ebe9a9582f43',
    },
    {
      type: 'chart_with_headline_and_trend_card',
      value: {
        title: 'Deaths',
        body: 'Deaths with COVID-19 on the death certificate in England',
        chart: [
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
        headline_number_columns: [
          {
            type: 'headline_number',
            value: {
              topic: 'COVID-19',
              metric: 'new_deaths_7days_sum',
              body: 'Last 7 days',
            },
            id: '4f28c86d-9f72-44bb-900b-c14c5d6bc396',
          },
          {
            type: 'trend_number',
            value: {
              topic: 'COVID-19',
              metric: 'new_deaths_7days_change',
              body: '',
              percentage_metric: 'new_deaths_7days_change_percentage',
            },
            id: '4a44ea30-d778-4ed4-bba0-fb506f5dc1dd',
          },
        ],
      },
      id: 'b3bebde7-538d-4ba1-a568-c28ac1c33a63',
    },
    {
      type: 'text',
      value: {
        body: '<h2 data-block-key="aie95">Influenza</h2><p data-block-key="19u5">The UKHSA dashboard for data and insights on influenza.</p>',
      },
      id: '34e6806e-eb04-49e9-8db2-0733b8203397',
    },
    {
      type: 'headline_numbers_row_card',
      value: {
        columns: [
          {
            type: 'headline_and_trend_component',
            value: {
              title: 'Healthcare',
              headline_number: {
                topic: 'Influenza',
                metric: 'weekly_hospital_admissions_rate_latest',
                body: 'Hospital admission rate (per 100,000)',
              },
              trend_number: {
                topic: 'COVID-19',
                metric: 'weekly_hospital_admissions_rate_change',
                body: 'Last 7 days',
                percentage_metric: 'weekly_hospital_admissions_rate_change_percentage',
              },
            },
            id: 'cdde1370-9c46-4604-91b4-3dd58932bc2c',
          },
          {
            type: 'single_headline_component',
            value: {
              title: 'Testing',
              headline_number: {
                topic: 'Influenza',
                metric: 'weekly_positivity_latest',
                body: 'Virus tests positivity (%)',
              },
            },
            id: '2f824c50-52a1-4827-818f-761e0ceb086c',
          },
        ],
      },
      id: 'd90051ed-a9ad-4c33-867b-44b8447cdf3c',
    },
    {
      type: 'chart_with_headline_and_trend_card',
      value: {
        title: 'Healthcare',
        body: 'Weekly hospital admission rates for Influenza',
        chart: [
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
        headline_number_columns: [
          {
            type: 'headline_number',
            value: {
              topic: 'Influenza',
              metric: 'weekly_hospital_admissions_rate_latest',
              body: 'Last 7 days',
            },
            id: '1c7e2b15-40e6-4630-9eb8-cefa5732cfc7',
          },
          {
            type: 'trend_number',
            value: {
              topic: 'Influenza',
              metric: 'weekly_hospital_admissions_rate_change',
              body: '',
              percentage_metric: 'weekly_hospital_admissions_rate_change_percentage',
            },
            id: '601053ba-9dd1-4111-8e15-17a7335c6279',
          },
        ],
      },
      id: '4c08dee0-6a37-4602-9c54-990efe347e49',
    },
    {
      type: 'chart_with_headline_and_trend_card',
      value: {
        title: 'Testing',
        body: 'Weekly positivity',
        chart: [
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
        headline_number_columns: [],
      },
      id: '0b7a6152-dbd3-4b77-82e1-cc98cf273ba4',
    },
  ],
  related_links: relatedLinksMock,
  last_published_at: '2023-03-21T10:25:34.452098Z',
}
