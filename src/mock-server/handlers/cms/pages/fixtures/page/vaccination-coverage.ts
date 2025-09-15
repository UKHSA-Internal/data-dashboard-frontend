import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

export const vaccinationCoverageMock: PageResponse<PageType.Topic> = {
  id: 183,
  meta: {
    seo_title: 'Childhood vaccinations',
    search_description: '',
    type: 'topic.TopicPage',
    detail_url: 'https://localhost/api/pages/81/',
    html_url: 'https://localhost/respiratory-viruses/childhood-vaccinations/',
    slug: 'childhood-vaccinations',
    show_in_menus: false,
    first_published_at: '2025-07-21T10:34:47.697410+01:00',
    alias_of: null,
    parent: {
      id: 78,
      meta: {
        type: 'composite.CompositePage',
        detail_url: 'https://localhost/api/pages/78/',
        html_url: null,
      },
      title: 'Respiratory viruses',
    },
  },
  title: 'Childhood vaccination coverage',
  body: [
    {
      type: 'section',
      value: {
        heading: 'Coverage map',
        content: [
          {
            type: 'filter_linked_map',
            value: {
              title_prefix: 'Vaccination coverage statistics',
            },
            id: 'c5720a34-4f6e-4132-b82b-c8982b9f4551',
          },
        ],
      },
      id: 'c95a839e-4aa6-4f11-af18-c72df6623268',
    },
    {
      type: 'section',
      value: {
        heading: 'Filter childhood vaccination data',
        content: [
          {
            type: 'global_filter_card',
            value: {
              time_range: {
                title: 'Year selection',
                time_periods: [
                  {
                    type: 'time_period',
                    value: {
                      label: '2023-2024',
                      date_from: '2023-04-01',
                      date_to: '2024-03-31',
                    },
                    id: '24fec754-d7e8-42f8-8c8b-7c191ada6e8d',
                  },
                  {
                    type: 'time_period',
                    value: {
                      label: '2024-2025',
                      date_from: '2024-04-01',
                      date_to: '2025-03-31',
                    },
                    id: '72ab2c6a-5116-42b9-9f15-25aacd12c467',
                  },
                ],
              },
              rows: [
                {
                  type: 'row',
                  value: {
                    title: 'Area',
                    filters: [
                      {
                        type: 'geography_filters',
                        value: {
                          geography_types: [
                            {
                              type: 'geography_filter',
                              value: {
                                label: 'Country',
                                colour: 'COLOUR_1_DARK_BLUE',
                                geography_type: 'Nation',
                              },
                              id: '5ed27d55-ffaa-4a8d-8b93-8f20d186265d',
                            },
                            {
                              type: 'geography_filter',
                              value: {
                                label: 'Region',
                                colour: 'COLOUR_2_TURQUOISE',
                                geography_type: 'Region',
                              },
                              id: '87c30c92-c9bd-46cd-89eb-6468e46e7b5b',
                            },
                            {
                              type: 'geography_filter',
                              value: {
                                label: 'Local Authority',
                                colour: 'COLOUR_3_DARK_PINK',
                                geography_type: 'Upper Tier Local Authority',
                              },
                              id: 'b531fee6-149d-429d-8de6-90bf27f4f9e6',
                            },
                          ],
                        },
                        id: '2cb36d1b-6f38-4a92-bc8d-d54fa22fbdf2',
                      },
                    ],
                  },
                  id: '64c0fc3f-f2db-48a5-b8cf-9ee43c31b11e',
                },
                {
                  type: 'row',
                  value: {
                    title: 'Vaccination and coverage',
                    filters: [
                      {
                        type: 'data_filters',
                        value: {
                          label: 'Select vaccination',
                          data_filters: [
                            {
                              type: 'data_filter',
                              value: {
                                label: 'MMR1 (2 years)',
                                colour: 'COLOUR_1_DARK_BLUE',
                                parameters: {
                                  theme: {
                                    label: '',
                                    value: 'immunisations',
                                  },
                                  sub_theme: {
                                    label: '',
                                    value: 'childhood-vaccines',
                                  },
                                  topic: {
                                    label: '',
                                    value: 'MMR1',
                                  },
                                  stratum: {
                                    label: '2 years',
                                    value: '24m',
                                  },
                                  metric: {
                                    label: '',
                                    value: 'MMR1_coverage_coverageByYear',
                                  },
                                  age: {
                                    label: '',
                                    value: 'all',
                                  },
                                  sex: {
                                    label: '',
                                    value: 'all',
                                  },
                                },
                                accompanying_points: [
                                  {
                                    type: 'accompanying_point',
                                    value: {
                                      label_prefix: 'Country level of coverage',
                                      label_suffix: '%',
                                      parameters: [
                                        {
                                          type: 'geography_type',
                                          value: {
                                            label: '',
                                            value: 'Nation',
                                          },
                                          id: '8ed98517-38ba-4b7b-91d8-05f4864be648',
                                        },
                                        {
                                          type: 'geography',
                                          value: {
                                            label: '',
                                            value: 'England',
                                          },
                                          id: 'deb5c0e4-2512-409d-9342-a3f2169041a4',
                                        },
                                      ],
                                    },
                                    id: 'ab8e4f2f-d62b-411c-adff-8a9bb0aa8ac7',
                                  },
                                ],
                              },
                              id: '119e270f-2759-44a0-969a-1651407a109a',
                            },
                            {
                              type: 'data_filter',
                              value: {
                                label: 'MMR1 (5 years)',
                                colour: 'COLOUR_2_TURQUOISE',
                                parameters: {
                                  theme: {
                                    label: '',
                                    value: 'immunisations',
                                  },
                                  sub_theme: {
                                    label: '',
                                    value: 'childhood-vaccines',
                                  },
                                  topic: {
                                    label: '',
                                    value: 'MMR1',
                                  },
                                  stratum: {
                                    label: '5 years',
                                    value: '5y',
                                  },
                                  metric: {
                                    label: '',
                                    value: 'MMR1_coverage_coverageByYear',
                                  },
                                  age: {
                                    label: '',
                                    value: 'all',
                                  },
                                  sex: {
                                    label: '',
                                    value: 'all',
                                  },
                                },
                                accompanying_points: [
                                  {
                                    type: 'accompanying_point',
                                    value: {
                                      label_prefix: 'Country level of coverage',
                                      label_suffix: '%',
                                      parameters: [
                                        {
                                          type: 'geography_type',
                                          value: {
                                            label: '',
                                            value: 'Nation',
                                          },
                                          id: '3ddf0ee5-6ce7-4fc8-82c8-b3d489d5d167',
                                        },
                                        {
                                          type: 'geography',
                                          value: {
                                            label: '',
                                            value: 'England',
                                          },
                                          id: '50456b18-438d-4571-86bb-3bff9387f568',
                                        },
                                      ],
                                    },
                                    id: '2bc2d44e-7425-4ce8-a703-e6269936ec39',
                                  },
                                ],
                              },
                              id: '01627419-571a-4ea7-ba9a-c77cf354d582',
                            },
                          ],
                          categories_to_group_by: [
                            {
                              type: 'category',
                              value: {
                                data_category: 'stratum',
                              },
                              id: '85acdaf0-540c-49e2-9210-7e6370c574eb',
                            },
                            {
                              type: 'category',
                              value: {
                                data_category: 'topic',
                              },
                              id: '76fcdb38-db17-4580-8bf0-48bca2881b4a',
                            },
                          ],
                        },
                        id: '8c0e75e3-4399-45f8-b9f2-944ce631960e',
                      },
                      {
                        type: 'threshold_filters',
                        value: {
                          label: 'Select level of coverage (%)',
                          thresholds: [
                            {
                              type: 'threshold',
                              value: {
                                label: 'Under 80%',
                                colour: 'MAP_COLOUR_1_LIGHT_YELLOW',
                                boundary_minimum_value: 0,
                                boundary_maximum_value: 0.8,
                              },
                              id: '9019a648-901c-4801-9d3e-d3b95242a58e',
                            },
                            {
                              type: 'threshold',
                              value: {
                                label: '80-85%',
                                colour: 'MAP_COLOUR_2_LIGHT_GREEN',
                                boundary_minimum_value: 0.81,
                                boundary_maximum_value: 0.85,
                              },
                              id: '9137b412-ef3a-4d39-8662-1096ba1c3b99',
                            },
                            {
                              type: 'threshold',
                              value: {
                                label: '85-90%',
                                colour: 'MAP_COLOUR_3_TURQUOISE',
                                boundary_minimum_value: 0.86,
                                boundary_maximum_value: 0.9,
                              },
                              id: '38cd3f76-46ed-41d9-a7a2-9a41510c0b2d',
                            },
                            {
                              type: 'threshold',
                              value: {
                                label: '90-95%',
                                colour: 'MAP_COLOUR_4_BLUE',
                                boundary_minimum_value: 0.91,
                                boundary_maximum_value: 0.95,
                              },
                              id: '3584882d-ce37-4d57-abcb-ac0d71133dc5',
                            },
                            {
                              type: 'threshold',
                              value: {
                                label: 'Over 95%',
                                colour: 'MAP_COLOUR_5_DARK_BLUE',
                                boundary_minimum_value: 0.96,
                                boundary_maximum_value: 1,
                              },
                              id: 'd8583ba3-259f-49f0-be86-eaa670198c25',
                            },
                          ],
                        },
                        id: 'b029909f-588d-4a13-90db-7e08e7e20f3d',
                      },
                    ],
                  },
                  id: '854569f8-0cd0-4fbf-bf21-b8eadeb613cb',
                },
              ],
            },
            id: 'da1c5477-4e98-4686-8fa2-2af05d50a701',
          },
        ],
      },
      id: '364790e5-adca-408c-a76e-ecfdbe485b58',
    },
    {
      type: 'section',
      value: {
        heading: 'Coverage statistics',
        content: [
          {
            type: 'filter_linked_sub_plot_chart_template',
            value: {
              title_prefix: 'Vaccination coverage',
              legend_title: 'Coverage (%)',
              target_threshold: 95,
              target_threshold_label: '95% target',
            },
            id: 'f5aa2cb0-b871-4c71-a880-d2c1433e3618',
          },
        ],
      },
      id: 'f5aa2cb0-b871-4c71-a880-d2c1433e3618',
    },
    {
      type: 'section',
      value: {
        heading: 'Time series',
        content: [
          {
            type: 'text_card',
            value: {
              body: '<p data-block-key="04bkf">Annual immunisation coverage is calculated and reported by financial year (1 April to 31 March). In time series data, coverage statistics for a given year are tied to the end of respective financial year. For example, annual coverage for the 2022-2023 reporting year is represented by the date 31 March 2023.</p><p data-block-key="dadjm">In Q2 2020-2021 the vaccine schedule changed for the pneumococcal vaccine. Coverage for this reporting year cannot be calculated. This may also affect comparability with previous years.</p>',
            },
            id: '4678dec2-9023-4dae-91c5-1c18d3a04d7b',
          },
          {
            type: 'filter_linked_time_series_chart_template',
            value: {
              title_prefix: 'Vaccination coverage by year',
              legend_title: 'Coverage (%)',
            },
            id: '486629f9-07ce-4f41-a4eb-413c006a8c10',
          },
        ],
      },
      id: '587c7b3a-2313-444e-87b6-d5d9c27d6ccb',
    },
  ],
  seo_change_frequency: 5,
  seo_priority: 0.5,
  last_updated_at: '2025-07-21T10:58:19.287668+01:00',
  last_published_at: '2025-07-21T10:58:19.287668+01:00',
  active_announcements: [],
  page_description:
    '<p data-block-key="opqpf">This resource is intended to enable the user to selectively compare routine childhood vaccination coverage statistics over the available time periods for the following geographies: Local authorities (LA) in England, Regions in England and countries of the United Kingdom.<br/></p><p data-block-key="389gq">This interactive resource reports annual childhood vaccination as a proportion of the eligible population (coverage), and are derived from information collected by UK Health Security Agency (UKHSA) through the Cover of vaccinations evaluated rapidly (COVER) programme.</p>',
  related_links_layout: 'Footer',
  related_links: [
    {
      id: 15,
      meta: {
        type: 'topic.TopicPageRelatedLink',
      },
      title: 'Childhood Vaccination Coverage Statistics, England, 2023-24',
      url: 'https://digital.nhs.uk/data-and-information/publications/statistical/nhs-immunisation-statistics/england-2023-24',
      body: '<p data-block-key="7390w">This statistical report, co-authored with the UK Health Security Agency (UKSHA), reports childhood vaccination coverage statistics for England in 2023.</p>',
    },
    {
      id: 16,
      meta: {
        type: 'topic.TopicPageRelatedLink',
      },
      title: 'Cover of vaccination evaluated rapidly (COVER) programme: annual data',
      url: 'https://www.gov.uk/government/publications/cover-of-vaccination-evaluated-rapidly-cover-programme-annual-data',
      body: '<p data-block-key="7390w">https://www.gov.uk/government/publications/cover-of-vaccination-evaluated-rapidly-cover-programme-annual-data</p>',
    },
    {
      id: 17,
      meta: {
        type: 'topic.TopicPageRelatedLink',
      },
      title: 'Vaccinations: Childhood Immunisation (NHS England)',
      url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/child-immunisation/',
      body: '<p data-block-key="7390w">Childhood vaccinations data is published on a quarterly and annual basis by UKHSA and NHS England (formerly NHS Digital) respectively.</p>',
    },
  ],
  enable_area_selector: false,
  selected_topics: [],
}
