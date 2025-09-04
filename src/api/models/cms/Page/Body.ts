import { z } from 'zod'

import { HealthAlertTypes } from '../../Alerts'
import { Blocks } from './Blocks'
import { Chart } from './Chart'
import { GlobalFilterRow, TimeRangeSchema } from './GlobalFilter'

/**
 * Body Discriminated Union Types
 * Variations of each object that can returned in the top-level body associated by the type key
 */

export const WithText = z.object({
  body: z.string(),
})

export const ChartRelatedLinks = z.array(
  z.object({
    type: z.literal('related_link'),
    id: z.string(),
    value: z.object({
      link: z.string(),
      link_display_text: z.string(),
    }),
  })
)

export type ChartRelatedLink = z.infer<typeof ChartRelatedLinks>

export const WithWeatherHealthAlertCard = z.object({
  title: z.string(),
  sub_title: z.string(),
  alert_type: HealthAlertTypes,
})

const WithHeadlineNumbersRowCard = z.object({
  columns: z.array(
    z.object({
      id: z.string(),
      type: z.literal('column'),
      value: z.object({
        title: z.string(),
        date_prefix: z.string(),
        rows: Blocks,
      }),
    })
  ),
})

const chartCardValues = z.object({
  title: z.string(),
  chart: Chart,
  body: z.string(),
  related_links: ChartRelatedLinks.optional(),
  tag_manager_event_id: z.string().nullable(),
  x_axis: z.string().nullable(),
  y_axis: z.string().nullable(),
  x_axis_title: z.string().optional(),
  y_axis_title: z.string().optional(),
  y_axis_minimum_value: z.number().nullable().optional(),
  y_axis_maximum_value: z.number().nullable().optional(),
  show_timeseries_filter: z.boolean().optional(),
  date_prefix: z.string(),
  about: z.string(),
})

export const WithChartHeadlineAndTrendCard = z.object({
  id: z.string(),
  type: z.literal('chart_with_headline_and_trend_card'),
  value: chartCardValues.extend({
    headline_number_columns: Blocks,
  }),
})

export const WithChartCard = z.object({
  id: z.string(),
  type: z.enum(['chart_card', 'headline_chart_card']),
  value: chartCardValues,
})

const WithSimplifiedChartCardAndLink = z.object({
  id: z.string(),
  type: z.enum(['simplified_chart_with_link']),
  value: chartCardValues
    .extend({
      sub_title: z.string(),
      topic_page: z.string(),
    })
    .omit({ body: true, date_prefix: true, about: true }),
})

export const ChartCardSchemas = z.discriminatedUnion('type', [
  WithChartHeadlineAndTrendCard,
  WithChartCard,
  WithSimplifiedChartCardAndLink,
])

export const CardTypes = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('text_card'),
    value: WithText,
    id: z.string(),
  }),
  z.object({
    type: z.literal('headline_numbers_row_card'),
    value: WithHeadlineNumbersRowCard,
    id: z.string(),
  }),
  z.object({
    type: z.literal('chart_row_card'),
    value: z.object({
      columns: z.array(z.union([WithChartHeadlineAndTrendCard, WithChartCard])),
    }),
    id: z.string(),
  }),
  z.object({
    type: z.literal('filter_linked_map'),
    value: z.object({
      title_prefix: z.optional(z.string()),
      legend_title: z.optional(z.string()),
      about: z.optional(z.string()),
    }),
    id: z.string(),
  }),
  z.object({
    type: z.literal('chart_card_section'),
    value: z.object({
      cards: z.array(WithSimplifiedChartCardAndLink),
    }),
    id: z.string(),
  }),
  z.object({
    type: z.literal('weather_health_alert_card'),
    value: WithWeatherHealthAlertCard,
    id: z.string(),
  }),
  z.object({
    type: z.literal('global_filter_card'),
    value: z.object({
      time_range: TimeRangeSchema,
      rows: GlobalFilterRow,
    }),
    id: z.string(),
  }),
  z.object({
    type: z.literal('filter_linked_sub_plot_chart_template'),
    value: z.object({
      title_prefix: z.string(),
      legend_title: z.string(),
      target_threshold: z.number(),
      target_threshold_label: z.string().optional(),
      about: z.string(),
    }),
    id: z.string(),
  }),
  z.object({
    type: z.literal('filter_linked_time_series_chart_template'),
    value: z.object({
      title_prefix: z.string(),
      legend_title: z.string(),
      about: z.string(),
    }),
    id: z.string(),
  }),
])

export const Body = z.array(
  z.object({
    type: z.literal('section'),
    id: z.string(),
    value: z.object({
      heading: z.string(),
      content: z.array(CardTypes),
      page_link: z.optional(z.nullable(z.string())),
    }),
  })
)

export type Body = z.infer<typeof Body>

export const CompositeBody = z.array(
  z.discriminatedUnion('type', [
    z.object({
      type: z.literal('text'),
      value: z.string(),
      id: z.string(),
    }),
    z.object({
      type: z.literal('code_block'),
      value: z.object({
        heading: z.string(),
        content: z.array(
          z.object({
            type: z.literal('code_snippet'),
            value: z.object({
              language: z.string(),
              code: z.string(),
            }),
            id: z.string(),
          })
        ),
      }),
      id: z.string(),
    }),
    z.object({
      type: z.literal('internal_button'),
      value: z.object({
        text: z.string(),
        button_type: z.enum(['BULK_DOWNLOAD']),
        endpoint: z.string(),
        method: z.enum(['POST', 'GET']),
      }),
      id: z.string(),
    }),
    z.object({
      type: z.literal('external_button'),
      value: z.object({
        text: z.string(),
        url: z.string(),
        button_type: z.string().toLowerCase(),
        icon: z.string(),
      }),
      id: z.string(),
    }),
    z.object({
      type: z.literal('internal_page_links'),
      value: z.array(
        z.object({
          type: z.literal('page_link'),
          value: z.object({
            title: z.string(),
            sub_title: z.string(),
            page: z.string(),
          }),
          id: z.string(),
        })
      ),
      id: z.string(),
    }),
  ])
)

export type CardTypes = z.infer<typeof CardTypes>
export type CompositeBody = z.infer<typeof CompositeBody>
