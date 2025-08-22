import { kebabCase } from 'lodash'
import Link from 'next/link'
import { z } from 'zod'

import { ChartCardSchemas } from '@/api/models/cms/Page'
import { RequestParams } from '@/api/requests/charts/getCharts'
import { ClientChart } from '@/app/components/cms/Chart/ClientChart'

import { Card } from '../Card/Card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../Tabs/Tabs'

// Type for the chart data that the Chart component expects
type ChartData = z.infer<typeof ChartCardSchemas>['value']

// Function to transform RequestParams into ChartData structure
function transformRequestParamsToChartData(requestParams: RequestParams, title: string): ChartData {
  return {
    title,
    plots: requestParams.plots.map((plot) => ({
      type: 'plot' as const,
      id: plot.metric || 'default',
      value: plot,
    })),
    body: '',
    date_prefix: '',
    about: '',
    x_axis: requestParams.x_axis || null,
    y_axis: requestParams.y_axis || null,
    x_axis_title: requestParams.x_axis_title || '',
    y_axis_title: requestParams.y_axis_title || '',
    y_axis_minimum_value: requestParams.y_axis_minimum_value || null,
    y_axis_maximum_value: requestParams.y_axis_maximum_value || null,
    show_timeseries_filter: false,
    tag_manager_event_id: null,
    related_links: undefined,
  }
}

export function newCard({
  id = 1,
  title = 'New Card',
  description = 'New Card',
  geography,
  dataFilters,
}: {
  id: string
  title: string
  description: string
  chart: RequestParams | ChartData
}) {
  console.log('geography: ', geography)
  console.log('dataFilter: ', dataFilters)

  //create the requestBody
  const chart: RequestParams = {
    file_format: 'svg',
    chart_height: 220,
    chart_width: 515,
    x_axis: 'date',
    y_axis: 'metric',
    y_axis_title: 'Year',
    y_axis_minimum_value: null,
    y_axis_maximum_value: null,
    plots: dataFilters.map((filter) => {
      return {
        topic: filter.value.parameters.topic.value,
        metric: filter.value.parameters.metric.value,
        stratum: filter.value.parameters.stratum.value,
        sex: filter.value.parameters.sex.value,
        age: filter.value.parameters.age.value,
        line_colour: filter.value.colour,
        label: filter.value.label,
        geography: geography.name,
        geography_type: 'Upper Tier Local Authority',
        chart_type: 'line_multi_coloured',
        line_type: 'SOLID',
        date_from: '2020-01-01',
        date_to: '2020-12-31',
        use_smooth_lines: false,
        use_markers: true,
      }
    }),
  }

  console.log('generated chart object: ', chart)

  // // Transform the chart data if it's RequestParams
  // const chartData = 'plots' in chart ? transformRequestParamsToChartData(chart, title) : chart
  const chartData = chart
  console.log('chartData: ', chartData)
  return (
    <div key={id} className="mb-4">
      <Card asChild aria-labelledby={`chart-row-card-heading-${id}`} className="ukhsa-chart-card flex flex-col gap-6">
        <article>
          <header>
            <h3 id={`chart-row-card-heading-${id}`} className="govuk-heading-m mb-2 font-bold">
              {title}
            </h3>
            <p className="govuk-body-s govuk-!-margin-bottom-2 pt-0 italic text-dark-grey">{description}</p>
          </header>

          <Tabs defaultValue={`${kebabCase(title)}-chart`} className="govuk-!-margin-bottom-0">
            <TabsList className="hidden no-js:block sm:block">
              <TabsTrigger
                asChild
                value={`${kebabCase(title)}-chart`}
                aria-controls={`chart-${kebabCase(title)}-content`}
              >
                <Link href={`#chart-${kebabCase(title)}`}>
                  <span>Chart</span>
                </Link>
              </TabsTrigger>
              <TabsTrigger
                asChild
                value={`${kebabCase(title)}-table`}
                aria-controls={`table-${kebabCase(title)}-content`}
              >
                <Link href={`#table-${kebabCase(title)}`}>
                  <span className="govuk-visually-hidden">Tabular data</span>
                  <span aria-hidden>
                    Tabular <span className="hidden lg:inline">data</span>
                  </span>
                </Link>
              </TabsTrigger>
              <TabsTrigger
                asChild
                value={`${kebabCase(title)}-download`}
                aria-controls={`download-${kebabCase(title)}-content`}
              >
                <Link href={`#download-${kebabCase(title)}`}>
                  <span>Download</span>
                </Link>
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value={`${kebabCase(title)}-chart`}
              className="min-h-[var(--ukhsa-chart-card-tab-min-height)] no-js:mb-7"
              data-type="chart"
              id={`chart-${kebabCase(title)}-content`}
            >
              <ClientChart
                data={chartData}
                sizes={[
                  {
                    minWidth: 768,
                    size: 'wide',
                  },
                ]}
              />
            </TabsContent>
            <TabsContent
              value={`${kebabCase(title)}-table`}
              className="min-h-[var(--ukhsa-chart-card-tab-min-height)] no-js:mb-7"
              data-type="table"
              id={`table-${kebabCase(title)}-content`}
            >
              Table content
            </TabsContent>
            <TabsContent
              value={`${kebabCase(title)}-download`}
              className="min-h-[var(--ukhsa-chart-card-tab-min-height)] no-js:mb-7"
              data-type="download"
              id={`download-${kebabCase(title)}-content`}
            >
              Download content
            </TabsContent>
          </Tabs>
        </article>
      </Card>
    </div>
  )
}
