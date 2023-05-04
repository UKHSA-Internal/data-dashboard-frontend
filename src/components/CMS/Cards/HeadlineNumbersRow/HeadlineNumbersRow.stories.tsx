import type { Meta, StoryObj } from '@storybook/react'

import { HeadlineNumbersRow } from './HeadlineNumbersRow'
import { CardColumn } from '@/components/Card'
import { HeadlineTrend, HeadlineValue, Metric } from '@/components/Metrics'

const meta = {
  title: 'CMS Components/Headline Numbers Row',
  component: HeadlineNumbersRow,
  tags: ['autodocs'],
  parameters: {},
} satisfies Meta<typeof HeadlineNumbersRow>

export default meta

type Story = StoryObj<typeof HeadlineNumbersRow>

export const Primary: Story = {
  args: {
    columns: [
      <CardColumn key={1} heading="Heading">
        <Metric>
          <HeadlineValue heading="Weekly" value={24298} />
        </Metric>
        <Metric>
          <HeadlineTrend heading="Last 7 days" direction="down" colour="green" change={-592} percentage={-3} />
        </Metric>
      </CardColumn>,
      <CardColumn key={2} heading="Heading">
        <Metric>
          <HeadlineValue heading="Weekly" value={24298} />
        </Metric>
        <Metric>
          <HeadlineTrend heading="Last 7 days" direction="down" colour="green" change={-592} percentage={-3} />
        </Metric>
      </CardColumn>,
      <CardColumn key={3} heading="Heading">
        <Metric>
          <HeadlineValue heading="Weekly" value={24298} />
        </Metric>
        <Metric>
          <HeadlineTrend heading="Last 7 days" direction="up" colour="red" change={-592} percentage={-3} />
        </Metric>
      </CardColumn>,
      <CardColumn key={4} heading="Heading">
        <Metric>
          <HeadlineValue heading="Weekly" value={24298} />
        </Metric>
        <Metric>
          <HeadlineTrend heading="Last 7 days" direction="down" colour="green" change={-592} percentage={-3} />
        </Metric>
      </CardColumn>,
      <CardColumn key={5} heading="Heading">
        <Metric>
          <HeadlineValue heading="Weekly" value={24298} />
        </Metric>
        <Metric>
          <HeadlineTrend heading="Last 7 days" direction="neutral" colour="neutral" change={-21} percentage={0} />
        </Metric>
      </CardColumn>,
    ],
  },
}
