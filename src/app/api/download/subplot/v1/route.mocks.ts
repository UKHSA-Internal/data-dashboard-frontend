export const mockChartParameters = {
  x_axis: 'geography',
  y_axis: 'metric',
  theme: 'immunisation',
  sub_theme: 'childhood-vaccines',
  date_from: '2021-01-31',
  date_to: '2021-12-31',
  age: 'all',
  sex: 'all',
  stratum: 'default',
  metric_value_ranges: [],
}

export const mockSubplot = [
  {
    subplot_title: '6-in-1 (12 months)',
    subplot_parameters: { topic: '6-in-1', metric: '6-in-1_coverage_coverageByYear', stratum: '12m' },
    plots: [
      { label: 'England', geography: 'England', geography_type: 'Nation', line_colour: 'COLOUR_1_DARK_BLUE' },
      { label: 'North East', geography: 'North East', geography_type: 'Region', line_colour: 'COLOUR_2_TURQUOISE' },
      {
        label: 'Darlington',
        geography: 'Darlington',
        geography_type: 'Upper Tier Local Authority',
        line_colour: 'COLOUR_3_DARK_PINK',
      },
    ],
  },
  {
    subplot_title: '6-in-1 (24 months)',
    subplot_parameters: { topic: '6-in-1', metric: '6-in-1_coverage_coverageByYear', stratum: '24m' },
    plots: [
      { label: 'England', geography: 'England', geography_type: 'Nation', line_colour: 'COLOUR_1_DARK_BLUE' },
      { label: 'North East', geography: 'North East', geography_type: 'Region', line_colour: 'COLOUR_2_TURQUOISE' },
      {
        label: 'Darlington',
        geography: 'Darlington',
        geography_type: 'Upper Tier Local Authority',
        line_colour: 'COLOUR_3_DARK_PINK',
      },
    ],
  },
  {
    subplot_title: 'MMR1 (24 months)',
    subplot_parameters: { topic: 'MMR1', metric: 'MMR1_coverage_coverageByYear', stratum: '24m' },
    plots: [
      { label: 'England', geography: 'England', geography_type: 'Nation', line_colour: 'COLOUR_1_DARK_BLUE' },
      { label: 'North East', geography: 'North East', geography_type: 'Region', line_colour: 'COLOUR_2_TURQUOISE' },
      {
        label: 'Darlington',
        geography: 'Darlington',
        geography_type: 'Upper Tier Local Authority',
        line_colour: 'COLOUR_3_DARK_PINK',
      },
    ],
  },
  {
    subplot_title: 'MMR1 (5 years)',
    subplot_parameters: { topic: 'MMR1', metric: 'MMR1_coverage_coverageByYear', stratum: '5y' },
    plots: [
      { label: 'England', geography: 'England', geography_type: 'Nation', line_colour: 'COLOUR_1_DARK_BLUE' },
      { label: 'North East', geography: 'North East', geography_type: 'Region', line_colour: 'COLOUR_2_TURQUOISE' },
      {
        label: 'Darlington',
        geography: 'Darlington',
        geography_type: 'Upper Tier Local Authority',
        line_colour: 'COLOUR_3_DARK_PINK',
      },
    ],
  },
]
