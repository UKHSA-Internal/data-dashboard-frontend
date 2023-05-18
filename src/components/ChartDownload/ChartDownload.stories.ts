import type { Meta, StoryObj } from '@storybook/react'

import { ChartDownload } from './ChartDownload'

const meta = {
  title: 'Components/Download',
  component: ChartDownload,
  tags: ['autodocs'],
} satisfies Meta<typeof ChartDownload>

export default meta

type Story = StoryObj<typeof ChartDownload>

export const Primary: Story = {
  args: {
    chart: [
      {
        id: '1',
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
      },
    ],
  },
}
