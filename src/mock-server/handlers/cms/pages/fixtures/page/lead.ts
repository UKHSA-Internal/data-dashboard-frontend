import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

export const leadPageMock: PageResponse<PageType.Topic> = {
  id: 86,
  meta: {
    seo_title: 'Lead headline rates by age and sex',
    search_description: '',
    type: 'topic.TopicPage',
    detail_url: 'http://localhost/api/pages/86/',
    html_url: 'http://localhost/respiratory-viruses/lead/',
    slug: 'lead',
    show_in_menus: false,
    first_published_at: '2026-06-16T12:53:52.504053+01:00',
    alias_of: null,
    parent: {
      id: 80,
      meta: {
        type: 'composite.CompositePage',
        detail_url: 'http://localhost/api/pages/80/',
        html_url: null,
      },
      title: 'Respiratory viruses',
    },
  },
  title: 'Lead exposure',
  body: [
    {
      type: 'section',
      value: {
        heading: 'Lead exposure',
        content: [
          {
            type: 'chart_row_card',
            value: {
              columns: [
                {
                  type: 'dual_category_chart_card',
                  value: {
                    title: 'Meningococcal diseases timeseries',
                    body: '',
                    about: '',
                    related_links: [],
                    tag_manager_event_id: '',
                    x_axis: 'date',
                    x_axis_title: '',
                    primary_field_values: [],
                    y_axis: 'metric',
                    y_axis_title: '',
                    y_axis_minimum_value: 0,
                    y_axis_maximum_value: null,
                    chart_type: 'stacked_bar',
                    show_timeseries_filter: true,
                    static_fields: {
                      topic: 'Meningococcal-disease',
                      metric: 'meningococcal-disease_cases_casesByWeek',
                      geography: 'England',
                      geography_type: 'Nation',
                      sex: 'all',
                      age: 'all',
                      stratum: 'default',
                      date_from: '2025-01-01',
                      date_to: '2026-03-12',
                    },
                    secondary_category: 'stratum',
                    segments: [
                      {
                        type: 'segment',
                        value: {
                          secondary_field_value: 'Confirmed',
                          colour: 'COLOUR_4_ORANGE',
                          label: 'Confirmed',
                        },
                        id: 'bb6d1963-0495-4811-b6fe-f2c3fc80f935',
                      },
                      {
                        type: 'segment',
                        value: {
                          secondary_field_value: 'Probable',
                          colour: 'COLOUR_2_TURQUOISE',
                          label: 'Probable',
                        },
                        id: '5011dc59-f143-4133-ba5d-e85caae998ce',
                      },
                    ],
                  },
                  id: 'a2a33d6a-2042-47b0-9a78-54b580ecd1bd',
                },
                {
                  type: 'dual_category_chart_card',
                  value: {
                    title: 'Lead headline rates by age and sex',
                    body: 'Headline lead exposure rates broken down by age group and sex in England',
                    about:
                      'This chart shows headline lead rates by age and sex across England, split into female and male segments.',
                    related_links: [],
                    tag_manager_event_id: '',
                    x_axis: 'age',
                    x_axis_title: 'Age group',
                    primary_field_values: ['05-09', '05-14', '10-14'],
                    y_axis: 'metric',
                    y_axis_title: 'Rate',
                    y_axis_minimum_value: 0,
                    y_axis_maximum_value: null,
                    chart_type: 'stacked_bar',
                    show_timeseries_filter: false,
                    static_fields: {
                      topic: 'Lead',
                      metric: 'lead_headline_ratesByAgeSex',
                      geography: 'England',
                      geography_type: 'Nation',
                      sex: 'all',
                      age: 'all',
                      stratum: 'default',
                      date_from: '2020-05-21',
                      date_to: '2026-05-21',
                    },
                    secondary_category: 'sex',
                    segments: [
                      {
                        type: 'segment',
                        value: {
                          secondary_field_value: 'f',
                          colour: 'COLOUR_1_DARK_BLUE',
                          label: 'Females',
                        },
                        id: 'e4a99bff-948d-4245-a087-8a6fb2cc8158',
                      },
                      {
                        type: 'segment',
                        value: {
                          secondary_field_value: 'm',
                          colour: 'COLOUR_2_TURQUOISE',
                          label: 'Males',
                        },
                        id: '466f83e8-2b7e-483d-9955-6c9fb9252bc0',
                      },
                    ],
                  },
                  id: 'd4a56d9c-60bf-478c-b759-63c262be6051',
                },
              ],
            },
            id: '54d110d6-5177-4fdc-b70d-bb08b04c2954',
          },
        ],
      },
      id: '0310dc46-e1ac-4223-8ef0-4fe587f07a41',
    },
  ],
  seo_change_frequency: 5,
  seo_priority: 0.5,
  last_updated_at: '2026-06-16T14:07:30.721670+01:00',
  last_published_at: '2026-06-16T14:07:30.721670+01:00',
  active_announcements: [],
  page_description: '',
  related_links_layout: 'Footer',
  related_links: [],
  enable_area_selector: true,
  selected_topics: ['Lead'],
  is_public: true,
}
