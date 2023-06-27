import type { Meta, StoryObj } from '@storybook/react'
import { GridCol, GridRow } from 'govuk-react'

import { Chart } from '@/components/Chart'
import { HeadlineTrend, HeadlineValue, Metric } from '@/components/Metrics'

import { ChartColumn } from './ChartColumn'

const mockedChartSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="700" height="350" class="main-svg"><path fill="none" d="M0 0h700v350H0z" style="fill:#000;fill-opacity:0"/><defs><clipPath id="a" class="plotclip"><path d="M0 0h682v316H0z"/></clipPath></defs><g class="bglayer"><path fill="none" d="M18 0h682v316H18z" class="bg" style="fill:#000;fill-opacity:0;stroke-width:0"/></g><g class="cartesianlayer"><g class="subplot xy"><g class="zerolinelayer"><path d="M18 0h682" class="yzl zl crisp" style="stroke:#fff;stroke-opacity:1;stroke-width:2px" transform="translate(0 316)"/></g><g class="plot" clip-path="url(#a)" transform="translate(18)"><g class="scatterlayer mlayer"><g class="trace scatter tracefe014e" style="stroke-miterlimit:2;opacity:1"><g class="lines"><path d="M0 212.24q2.18 10.44 3.63 14.38c1.08 2.94 2.6 7.55 3.63 7.4 1.69-.25 2.34-14.93 3.62-21.75 1.15-6.1 2.31-17.22 3.63-17.27 1.13-.05 2.13 9.1 3.63 12.25 1.06 2.23 2.58 2.98 3.63 5.27 1.57 3.42 1.95 10.69 3.62 13.8 1.03 1.92 2.51 2.46 3.63 4.05 1.33 1.89 2.62 6.87 3.63 6.68 1.96-.37 2.36-19.33 3.63-28.36 1.16-8.27 1.51-23.11 3.62-23.74 1-.3 2.43 2.65 3.63 4.03 1.22 1.41 2.51 2.63 3.63 4.34 1.34 2.06 2.54 4.45 3.63 7.31 1.41 3.71 2.43 8.75 3.62 13.27 1.23 4.7 2.51 14.44 3.63 14.4 1.34-.05 2.58-12.51 3.63-20.99 1.58-12.82 2.37-33.08 3.63-48.63 1.17-14.35 1.36-40.93 3.63-41.36 1-.19 2.57 4.18 3.62 7.2 1.57 4.53 2.1 13.11 3.63 17.8 1.06 3.25 2.58 4.64 3.63 7.95 1.57 4.95 2.57 19.31 3.63 19.26 1.51-.07 2.38-26.62 3.62-39.46 1.18-12.25 1.82-35.7 3.63-35.9 1.02-.11 2.13 10.63 3.63 10.9 1.06.19 2.58-4.71 3.63-4.5 1.57.32 2.22 9.04 3.62 12.56 1.09 2.73 2.56 4.16 3.63 7 1.48 3.94 2.62 14.83 3.63 14.74 1.95-.17 2.45-37.31 3.63-56.65 1.24-20.3 1.74-62.28 3.63-62.42 1.01-.07 2.44 11.53 3.62 17.52 1.24 6.28 2.43 12.84 3.63 19.35 1.22 6.62 2.28 14.08 3.63 20.06 1.11 4.91 2.62 7.42 3.63 13.3 1.9 11.04 2.34 48.42 3.62 48.43 1.15.01 2.48-25.59 3.63-39.57 1.29-15.74 2.21-50.19 3.63-50.23 1.09-.03 2.25 20.55 3.63 29.09 1.1 6.8 2.36 12.4 3.62 18.21 1.16 5.36 2.06 11.52 3.63 15.4 1.05 2.6 2.63 3.05 3.63 6.1 2.29 6.97 2.4 36.86 3.63 36.86 1.19 0 2.53-21.66 3.62-34.6 1.39-16.46 2.35-56.17 3.63-56.18 1.15-.01 1.97 33.53 3.63 44.95 1.04 7.13 2.52 10.83 3.63 17.22 1.37 7.89 1.9 20.25 3.63 26.63 1.02 3.78 2.61 4.76 3.62 8.72 1.92 7.53 2 33.89 3.63 34.02 1.04.08 2.58-7.9 3.63-13.33 1.58-8.2 2.37-31.34 3.63-31.35 1.16-.01 1.75 20.75 3.62 26.69 1.01 3.22 2.56 4.19 3.63 7.06 1.49 4.02 2.37 10.32 3.63 15.12 1.16 4.42 2.52 7.99 3.63 12.67 1.35 5.67 2.37 18.99 3.62 19.01 1.17.02 2.49-10.62 3.63-16.55 1.31-6.83 2.28-22.11 3.63-22.16 1.11-.04 2.39 10.06 3.63 14.9 1.18 4.62 2.29 9.46 3.62 13.52 1.12 3.43 2.51 5.88 3.63 9.33 1.34 4.13 2.34 9.55 3.63 13.85 1.15 3.81 2.5 10.73 3.63 10.68 1.32-.06 2.55-9.23 3.63-14.96 1.43-7.57 2.15-26.51 3.62-26.6 1.07-.06 2.06 10.42 3.63 13.85 1.05 2.3 2.55 3.15 3.63 5.3 1.43 2.83 2.29 7.42 3.63 10.49 1.12 2.55 2.51 4.2 3.62 6.76 1.35 3.11 2.47 10.73 3.63 10.7 1.27-.04 2.55-8.07 3.63-13.1 1.43-6.64 2.02-23.2 3.63-23.38 1.04-.11 2.3 6.52 3.62 9.25 1.13 2.32 2.43 4.12 3.63 6.21 1.22 2.12 2.38 4.39 3.63 6.43 1.18 1.93 2.5 3.45 3.63 5.52 1.32 2.4 2.49 8.2 3.63 8.14 1.3-.07 2.57-6.63 3.62-11.18 1.56-6.79 1.22-24.86 3.63-25.88 1-.42 2.52 1.47 3.63 2.67 1.37 1.48 2.44 3.84 3.63 5.85 1.23 2.09 2.5 4.03 3.62 6.49 1.34 2.95 2.39 6.84 3.63 10.13 1.19 3.16 2.59 9.36 3.63 9.24 1.61-.18 2.49-15.13 3.63-23.43 1.29-9.35 1.68-29.58 3.62-29.91 1.01-.17 2.49 4.65 3.63 7.31 1.3 3.04 2.44 6.6 3.63 10.02 1.23 3.55 1.89 10.14 3.63 10.9 1.02.45 2.62-2.17 3.62-1.63 2.36 1.26 2.46 21.84 3.63 21.83 1.26-.02 2.53-16.12 3.63-25.61 1.37-11.8.58-38.38 3.63-39.82 1.01-.48 2.46 1.52 3.63 2.46 1.25 1.01 2.6 1.68 3.62 3.45 1.79 3.11 2.16 11.01 3.63 15.09 1.07 2.98 2.56 4.45 3.63 7.42 1.46 4.04 2.54 14.93 3.63 14.88 1.42-.07 2.57-15.55 3.62-25.97 1.57-15.61.2-51.06 3.63-58.69 1.02-2.26 2.6-3.92 3.63-3.64 1.74.48 2.35 9.89 3.63 14.4 1.15 4.06 1.79 9.78 3.62 11.48 1.02.94 2.62-.29 3.63.85 3.08 3.49 2.32 34.5 3.63 34.52 1.13.02 2.61-14.69 3.63-25.74 1.82-19.74.98-82.52 3.62-82.87 1-.13 2.55 6.95 3.63 11.37 1.45 5.94 2.43 14.13 3.63 21.25 1.22 7.18 2.49 13.97 3.63 21.66 1.29 8.7 2.51 17.76 3.63 27.9 1.34 12.09 1.73 30.8 3.62 39.85 1.01 4.85 2.6 11.01 3.63 10.9 1.69-.17 2.5-19.57 3.63-30.5 1.31-12.66 2.45-27.04 3.63-41.03 1.24-14.65 2-44.89 3.62-44.98 1.04-.06 2.57 10.97 3.63 18.24 1.54 10.59 2.46 25.79 3.63 39.35 1.25 14.5 1.89 34.01 3.63 45.01 1.02 6.49 2.58 15.36 3.62 15.29 1.58-.1 2.37-24.36 3.63-35.82 1.17-10.59 2.27-30.51 3.63-30.55 1.11-.03 2.46 13.17 3.63 20.17 1.26 7.56 2.38 16.03 3.63 23.65 1.17 7.16 2.48 13.36 3.62 20.78 1.3 8.5 1.04 26.16 3.63 27.46 1 .5 2.63-.63 3.63-2.02 2.17-2.99 2.19-18.85 3.63-18.96 1.08-.08 2.44 6.71 3.62 10.24 1.24 3.74 2.15 8.59 3.63 11.62 1.07 2.19 2.51 3.24 3.63 5.24 1.33 2.37 2.55 4.94 3.63 8.17 1.45 4.36 2.25 15.78 3.62 15.87 1.1.07 2.54-6.07 3.63-9.88 1.42-4.95 2.17-17.34 3.63-17.47 1.07-.1 2.07 7.02 3.63 8.91 1.05 1.27 2.41 1.56 3.62 2.35s2.44 1.5 3.63 2.37c1.23.9 2.56 1.55 3.63 2.95 1.49 1.95 2.45 8.34 3.63 8.31 1.25-.03 2.55-5.84 3.63-9.55 1.43-4.9 1.82-13.67 3.62-17.44 1.02-2.14 2.4-4.41 3.63-4.44 1.19-.03 2.35 2.86 3.63 3.97 1.15 1 2.37 1.86 3.63 2.46 1.17.56 2.61.09 3.62 1.13 1.91 1.97 2.41 13.02 3.63 13.03 1.2.01 2.58-7.53 3.63-12.61 1.55-7.47.82-25.58 3.63-28.1 1-.9 2.45-.37 3.62-.08 1.25.31 2.56.9 3.63 1.99 1.47 1.5 2.38 4.72 3.63 6.9 1.17 2.05 2.58 3.37 3.63 5.85 1.54 3.63 2.32 14.24 3.62 14.29 1.14.04 2.59-6.24 3.63-10.71 1.63-7.02 1.68-27.36 3.63-27.73 1.01-.19 2.18 5.12 3.63 6.57 1.08 1.08 2.58.86 3.63 2.01 1.54 1.67 2 7.05 3.62 8.06 1.04.65 2.63-.9 3.63-.11 2.23 1.76 2.36 17.56 3.63 17.58 1.16.02 2.61-8.45 3.63-14.74 1.76-10.79 1.05-43.88 3.62-44.51 1-.25 2.56 3.38 3.63 5.74 1.47 3.23 1.92 11.66 3.63 12.2 1.03.33 2.53-3.09 3.63-2.87 1.39.28 2.6 3.56 3.62 6.54 1.82 5.33 2.24 23.59 3.63 23.65 1.1.05 2.57-8.84 3.63-14.63 1.51-8.23 1.59-29.81 3.63-30.21 1.01-.2 2.55 3.91 3.63 6.51 1.44 3.46 2.34 8.72 3.62 12.69 1.15 3.59 2.42 6.74 3.63 10.13 1.21 3.41 2.52 6.42 3.63 10.27 1.37 4.74 2.27 16.06 3.63 16.14 1.11.07 2.61-5.65 3.62-10.24 1.91-8.67 1.06-37.84 3.63-38.6 1-.29 2.44 3.02 3.63 4.63q1.24 1.68 3.63 5.24" class="js-line" style="vector-effect:none;fill:none;stroke:#383f43;stroke-opacity:1;stroke-width:2px;opacity:1"/></g></g><g class="trace scatter trace7412b1" style="stroke-miterlimit:2"><g class="fills"><path d="M682 316h-25.39V208.46q2.15 8.58 3.62 11.62c1.07 2.21 2.62 2.75 3.63 5.3 1.93 4.87 2.28 23.16 3.63 23.21 1.11.04 2.57-9.41 3.63-15.51 1.49-8.55 2.08-31.03 3.62-31.13 1.05-.07 2.59 8.33 3.63 14.13q1.61 8.96 3.63 34.69" class="js-fill" style="fill:#cce2d8;fill-opacity:1;stroke-width:0"/></g><g class="lines"><path d="M656.61 208.46q2.15 8.58 3.62 11.62c1.07 2.21 2.62 2.75 3.63 5.3 1.93 4.87 2.28 23.16 3.63 23.21 1.11.04 2.57-9.41 3.63-15.51 1.49-8.55 2.08-31.03 3.62-31.13 1.05-.07 2.59 8.33 3.63 14.13q1.61 8.96 3.63 34.69" class="js-line" style="vector-effect:none;fill:none;stroke:#005a30;stroke-opacity:1;stroke-width:2px;opacity:1"/></g></g></g></g><g class="xaxislayer-above"><path d="M0 317v5" class="xtick ticks crisp" style="stroke:#444;stroke-opacity:1;stroke-width:1px" transform="translate(18)"/><path d="M0 317v5" class="xtick ticks crisp" style="stroke:#444;stroke-opacity:1;stroke-width:1px" transform="translate(126.83)"/><path d="M0 317v5" class="xtick ticks crisp" style="stroke:#444;stroke-opacity:1;stroke-width:1px" transform="translate(239.29)"/><path d="M0 317v5" class="xtick ticks crisp" style="stroke:#444;stroke-opacity:1;stroke-width:1px" transform="translate(348.12)"/><path d="M0 317v5" class="xtick ticks crisp" style="stroke:#444;stroke-opacity:1;stroke-width:1px" transform="translate(460.57)"/><path d="M0 317v5" class="xtick ticks crisp" style="stroke:#444;stroke-opacity:1;stroke-width:1px" transform="translate(573.03)"/><path d="M0 317v5" class="xtick ticks crisp" style="stroke:#444;stroke-opacity:1;stroke-width:1px" transform="translate(674.61)"/><text y="346" class="xtick" style="font-family:&quot;GDS Transport&quot;,Arial,sans-serif;font-size:20px;fill:#6b7276;fill-opacity:1;white-space:pre;opacity:1" text-anchor="middle" transform="translate(18)">Sep</text><text y="346" class="xtick" style="font-family:&quot;GDS Transport&quot;,Arial,sans-serif;font-size:20px;fill:#6b7276;fill-opacity:1;white-space:pre;opacity:1" text-anchor="middle" transform="translate(126.83)">Oct</text><text y="346" class="xtick" style="font-family:&quot;GDS Transport&quot;,Arial,sans-serif;font-size:20px;fill:#6b7276;fill-opacity:1;white-space:pre;opacity:1" text-anchor="middle" transform="translate(239.29)">Nov</text><text y="346" class="xtick" style="font-family:&quot;GDS Transport&quot;,Arial,sans-serif;font-size:20px;fill:#6b7276;fill-opacity:1;white-space:pre;opacity:1" text-anchor="middle" transform="translate(348.12)">Dec</text><text y="346" class="xtick" style="font-family:&quot;GDS Transport&quot;,Arial,sans-serif;font-size:20px;fill:#6b7276;fill-opacity:1;white-space:pre;opacity:1" text-anchor="middle" transform="translate(460.57)">Jan</text><text y="346" class="xtick" style="font-family:&quot;GDS Transport&quot;,Arial,sans-serif;font-size:20px;fill:#6b7276;fill-opacity:1;white-space:pre;opacity:1" text-anchor="middle" transform="translate(573.03)">Feb</text><text y="346" class="xtick" style="font-family:&quot;GDS Transport&quot;,Arial,sans-serif;font-size:20px;fill:#6b7276;fill-opacity:1;white-space:pre;opacity:1" text-anchor="middle" transform="translate(674.61)">Mar</text></g></g></g></svg>'

const meta = {
  title: 'CMS Components/Chart',
  component: ChartColumn,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 465 }}>
        <GridRow>
          <GridCol>
            <Story />
          </GridCol>
        </GridRow>
      </div>
    ),
  ],
} satisfies Meta<typeof ChartColumn>

export default meta

type Story = StoryObj<typeof ChartColumn>

export const Primary: Story = {
  args: {
    heading: 'Cases',
    description: 'Positive tests reported in England',
    chart: <Chart src={`data:image/svg+xml;utf8,${encodeURIComponent(mockedChartSvg)}`} />,
    children: (
      <GridRow>
        <GridCol setDesktopWidth="one-third">
          <Metric>
            <HeadlineValue heading="Last 7 days" value={24298} />
          </Metric>
        </GridCol>
        <GridCol setDesktopWidth="one-third">
          <Metric>
            <HeadlineTrend heading="" direction="down" colour="green" change={-592} percentage={-3} />
          </Metric>
        </GridCol>
      </GridRow>
    ),
  },
}
