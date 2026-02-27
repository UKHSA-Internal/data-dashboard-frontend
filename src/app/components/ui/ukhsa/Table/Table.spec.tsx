import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'
import { ComponentProps, ReactElement } from 'react'

import { getCharts } from '@/api/requests/charts/getCharts'
import { getTables } from '@/api/requests/tables/getTables'
import { getSearchParams } from '@/app/hooks/getSearchParams'
import { render } from '@/config/test-utils'

import { Table } from './Table'

// Mock charts api
jest.mock('@/api/requests/charts/getCharts')
const getChartsMock = jest.mocked(getCharts)

getChartsMock.mockResolvedValue({
  success: true,
  data: {
    chart: 'mock-chart',
    alt_text: '',
    last_updated: '2023-05-10T15:18:06.939535+01:00',
    figure: { data: [], layout: {} },
  },
})

// Mock table api
jest.mock('@/api/requests/tables/getTables')
const getTableMock = jest.mocked(getTables)

// Mock the url utils
const defaultUrl = new URL('http://localhost')
jest.mock('@/app/hooks/getPathname', () => ({ getPathname: jest.fn(() => defaultUrl.pathname) }))

// Mock our custom server component util
jest.mock('@/app/hooks/getSearchParams', () => ({
  getSearchParams: jest.fn(() => defaultUrl.searchParams),
}))

// Mock the default NextJs util (for client components)
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useSearchParams: jest.fn(() => defaultUrl.searchParams),
}))

getTableMock.mockResolvedValue({
  success: true,
  data: [
    {
      reference: '2022-10-31',
      values: [
        {
          label: 'Plot1',
          value: 12630.0,
          in_reporting_delay_period: false,
        },
      ],
    },
    {
      reference: '2022-11-30',
      values: [
        {
          label: 'Plot1',
          value: 9360.0,
          in_reporting_delay_period: false,
        },
      ],
    },
    {
      reference: '2023-01-31',
      values: [
        {
          label: 'Plot1',
          value: 12345.6666,
          in_reporting_delay_period: false,
        },
      ],
    },
    {
      reference: '2022-02-28',
      values: [
        {
          label: 'Plot1',
          value: 600.049,
          in_reporting_delay_period: false,
        },
      ],
    },
    {
      reference: '2022-02-28',
      values: [
        {
          label: 'Plot1',
          value: 8392.6,
          in_reporting_delay_period: false,
        },
      ],
    },
  ],
})

const mockData: ComponentProps<typeof Table>['data'] = {
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
      id: '123',
    },
  ],
  y_axis: 'y-axis',
  x_axis: 'x-axis',
  tag_manager_event_id: '',
  date_prefix: 'Up to and including',
  headline_number_columns: [],
  title: 'Table Title ABC/XYZ',
  body: 'Table Body',
  about: '',
}

const mockSize = 'narrow'

test('table with caption and headers', async () => {
  const { getByRole, getAllByRole } = render((await Table({ data: mockData, size: mockSize })) as ReactElement)

  expect(
    getByRole('table', { name: 'Table Title ABC/XYZ data for table Body Up to and including 10 May 2023' })
  ).toBeInTheDocument()

  const headers = getAllByRole('columnheader')
  expect(headers[0]).toHaveTextContent('Date')
  expect(headers[1]).toHaveTextContent('Amount')
})

test('table with row data', async () => {
  const { getByRole, getAllByRole } = render((await Table({ data: mockData, size: mockSize })) as ReactElement)

  expect(
    getByRole('table', { name: 'Table Title ABC/XYZ data for table Body Up to and including 10 May 2023' })
  ).toBeInTheDocument()

  const cells = getAllByRole('cell')

  expect(cells).toHaveLength(5)
  expect(cells[0]).toHaveTextContent('12,630')
  expect(cells[1]).toHaveTextContent('9,360')
  expect(cells[2]).toHaveTextContent('12,345.67')
  expect(cells[3]).toHaveTextContent('600.05')
  expect(cells[4]).toHaveTextContent('8,392.6')
})

test('table api request fails displays a fallback message', async () => {
  const url = 'http://localhost?areaType=UKHSA+Region&areaName=North+East'
  jest.mocked(useSearchParams).mockReturnValueOnce(new ReadonlyURLSearchParams(new URL(url).searchParams))
  jest.mocked(getSearchParams).mockResolvedValueOnce(new URL(url).searchParams)

  getTableMock.mockResolvedValueOnce({ success: false, error: expect.any(Object) })

  const { queryByRole, getByText, getByRole } = render(
    (await Table({ data: mockData, size: mockSize })) as ReactElement
  )

  expect(
    queryByRole('table', { name: 'Table Title ABC/XYZ data for table Body Up to and including 10 May 2023' })
  ).not.toBeInTheDocument()

  expect(getByText('No data available in North East')).toBeInTheDocument()
  expect(getByRole('link', { name: 'Reset' })).toHaveAttribute('href', '/')
})

test('Fallback message with escaped characters', async () => {
  const url = 'http://localhost?areaType=NHS+Trust&areaName=Birmingham+Women%27s+and+Children%27s+NHS+Foundation+Trust'
  jest.mocked(useSearchParams).mockReturnValueOnce(new ReadonlyURLSearchParams(new URL(url).searchParams))
  jest.mocked(getSearchParams).mockResolvedValueOnce(new URL(url).searchParams)

  getTableMock.mockResolvedValueOnce({ success: false, error: expect.any(Object) })

  const { getByText } = render((await Table({ data: mockData, size: mockSize })) as ReactElement)

  expect(getByText("No data available in Birmingham Women's and Children's NHS Foundation Trust")).toBeInTheDocument()
})

test('table data containing null plot points', async () => {
  getTableMock.mockResolvedValueOnce({
    success: true,
    data: [
      {
        reference: '2022-10-31',
        values: [
          {
            label: 'Plot1',
            value: null,
            in_reporting_delay_period: false,
          },
        ],
      },
    ],
  })

  const { getAllByRole } = render((await Table({ data: mockData, size: mockSize })) as ReactElement)

  const cells = getAllByRole('cell')

  expect(cells).toHaveLength(1)
  expect(cells[0]).toHaveTextContent('-')
})

test('table by geography and geography type when both are present in the url search params', async () => {
  jest
    .mocked(getSearchParams)
    .mockResolvedValueOnce(new URL('http://localhost?areaType=UKHSA+Region&areaName=North+East').searchParams)

  const { getByRole, getAllByRole } = render((await Table({ data: mockData, size: mockSize })) as ReactElement)

  expect(getTableMock).toHaveBeenCalledWith({
    plots: [
      {
        topic: 'COVID-19',
        metric: 'new_cases_daily',
        chart_type: 'line_with_shaded_section',
        date_from: null,
        date_to: null,
        geography: 'North East',
        geography_type: 'UKHSA Region',
        stratum: '',
      },
    ],
    x_axis: 'x-axis',
    y_axis: 'y-axis',
  })

  expect(
    getByRole('table', { name: 'Table Title ABC/XYZ data for table Body Up to and including 10 May 2023' })
  ).toBeInTheDocument()

  const cells = getAllByRole('cell')

  expect(cells).toHaveLength(5)
  expect(cells[0]).toHaveTextContent('12,630')
  expect(cells[1]).toHaveTextContent('9,360')
  expect(cells[2]).toHaveTextContent('12,345.67')
  expect(cells[3]).toHaveTextContent('600.05')
  expect(cells[4]).toHaveTextContent('8,392.6')
})

test('table data containing reporting lag peroid', async () => {
  getTableMock.mockResolvedValueOnce({
    success: true,
    data: [
      {
        reference: '2022-10-31',
        values: [
          {
            label: 'Plot1',
            value: 12630.0,
            in_reporting_delay_period: false,
          },
        ],
      },
      {
        reference: '2022-02-28',
        values: [
          {
            label: 'Plot1',
            value: 8392.6,
            in_reporting_delay_period: true,
          },
        ],
      },
    ],
  })

  const { getAllByRole, getByText } = render((await Table({ data: mockData, size: mockSize })) as ReactElement)

  expect(getByText('Reporting delay period')).toBeInTheDocument()

  const cells = getAllByRole('cell')

  expect(cells).toHaveLength(2)

  expect(cells[0].getAttribute('class')).not.toContain(
    'bg-delay-blue-opaque border-t-2 border-t-delay-blue border-b-2 border-b-delay-blue'
  )
  expect(cells[1].getAttribute('class')).toContain(
    'bg-delay-blue-opaque border-t-2 border-t-delay-blue border-b-2 border-b-delay-blue'
  )

  const rows = getAllByRole('row')
  expect(rows[1].getAttribute('aria-label')).toBeNull()
  expect(rows[2].getAttribute('aria-label')).toContain('Reporting delay period')
})

describe('Table headings display as expected', () => {
  test('fallback headings', async () => {
    const { getAllByRole } = render((await Table({ data: mockData, size: mockSize })) as ReactElement)

    const headers = getAllByRole('columnheader')
    expect(headers[0]).toHaveTextContent('Date')
    expect(headers[1]).toHaveTextContent('Amount')
  })

  test('x & y axis titles', async () => {
    const xyMockData = { ...mockData, x_axis_title: 'Test x axis title', y_axis_title: 'Puppies' }
    const { getAllByRole } = render((await Table({ data: xyMockData, size: mockSize })) as ReactElement)

    const headers = getAllByRole('columnheader')
    expect(headers[0]).toHaveTextContent('Test x axis title')
    expect(headers[1]).toHaveTextContent('Puppies')
  })

  test('label override axis titles', async () => {
    const labelMockData: ComponentProps<typeof Table>['data'] = {
      ...mockData,
      chart: [
        {
          ...mockData.chart[0],
          value: {
            ...mockData.chart[0].value,
            label: 'Label override',
          },
        },
      ],
      x_axis_title: 'Test x axis title',
      y_axis_title: 'Puppies',
    }
    const { getAllByRole } = render((await Table({ data: labelMockData, size: mockSize })) as ReactElement)

    const headers = getAllByRole('columnheader')
    expect(headers[0]).toHaveTextContent('Test x axis title')
    expect(headers[1]).toHaveTextContent('Label override')
  })

  test('Table headers for multi-column tables', async () => {
    getTableMock.mockResolvedValueOnce({
      success: true,
      data: [
        {
          reference: '2022-10-31',
          values: [
            {
              label: 'Plot1',
              value: 12630.0,
              in_reporting_delay_period: false,
            },
          ],
        },
        {
          reference: '2022-11-30',
          values: [
            {
              label: 'Plot1',
              value: 9360.0,
              in_reporting_delay_period: false,
            },
          ],
        },
        {
          reference: '2023-01-31',
          values: [
            {
              label: 'Plot2',
              value: 12345.6666,
              in_reporting_delay_period: false,
            },
          ],
        },
        {
          reference: '2022-02-28',
          values: [
            {
              label: 'Plot2',
              value: 600.049,
              in_reporting_delay_period: false,
            },
          ],
        },
        {
          reference: '2022-02-28',
          values: [
            {
              label: 'Plot2',
              value: 8392.6,
              in_reporting_delay_period: false,
            },
          ],
        },
      ],
    })

    const multiColMockData: ComponentProps<typeof Table>['data'] = {
      ...mockData,
      chart: [
        {
          ...mockData.chart[0],
          value: {
            ...mockData.chart[0]?.value,
            label: 'First label override',
          },
        },
        {
          ...mockData.chart[1],
          value: {
            ...mockData.chart[1]?.value,
            label: 'Second label override',
          },
        },
      ],
      x_axis_title: 'Test x axis title',
      y_axis_title: 'Puppies',
    }

    const { getAllByRole } = render((await Table({ data: multiColMockData, size: mockSize })) as ReactElement)

    const headers = getAllByRole('columnheader')
    expect(headers[0]).toHaveTextContent('Test x axis title')
    expect(headers[1]).toHaveTextContent('First label override')
    expect(headers[2]).toHaveTextContent('Second label override')
  })
})

describe('Confidence intervals', () => {
  test('displays confidence intervals description in caption when confidence_intervals is true', async () => {
    const mockDataWithConfidence: ComponentProps<typeof Table>['data'] = {
      ...mockData,
      confidence_intervals: true,
      confidence_intervals_description: 'Metric column includes 95% lower and upper confidence intervals, in brackets.',
    }

    getTableMock.mockResolvedValueOnce({
      success: true,
      data: [
        {
          reference: '2022-10-31',
          values: [
            {
              label: 'Plot1',
              value: 12630.0,
              in_reporting_delay_period: false,
            },
          ],
        },
      ],
    })

    const { getByText } = render((await Table({ data: mockDataWithConfidence, size: mockSize })) as ReactElement)

    expect(
      getByText('Metric column includes 95% lower and upper confidence intervals, in brackets.')
    ).toBeInTheDocument()
  })

  test('does not display confidence intervals description when confidence_intervals is false', async () => {
    const mockDataWithoutConfidence: ComponentProps<typeof Table>['data'] = {
      ...mockData,
      confidence_intervals: false,
      confidence_intervals_description: 'Metric column includes 95% lower and upper confidence intervals, in brackets.',
    }

    getTableMock.mockResolvedValueOnce({
      success: true,
      data: [
        {
          reference: '2022-10-31',
          values: [
            {
              label: 'Plot1',
              value: 12630.0,
              in_reporting_delay_period: false,
            },
          ],
        },
      ],
    })

    const { queryByText } = render((await Table({ data: mockDataWithoutConfidence, size: mockSize })) as ReactElement)

    expect(
      queryByText('Metric column includes 95% lower and upper confidence intervals, in brackets.')
    ).not.toBeInTheDocument()
  })

  test('displays confidence intervals in table cells with bold value', async () => {
    const mockDataWithConfidence: ComponentProps<typeof Table>['data'] = {
      ...mockData,
      confidence_intervals: true,
      confidence_intervals_description: 'Metric column includes 95% lower and upper confidence intervals, in brackets.',
    }

    getTableMock.mockResolvedValueOnce({
      success: true,
      data: [
        {
          reference: '2022-10-31',
          values: [
            {
              label: 'Plot1',
              value: 12630.0,
              lower_confidence: 93.0,
              upper_confidence: 97.0,
              in_reporting_delay_period: false,
            },
          ],
        },
        {
          reference: '2022-11-30',
          values: [
            {
              label: 'Plot1',
              value: 9360.0,
              lower_confidence: 92.5,
              upper_confidence: 97.5,
              in_reporting_delay_period: false,
            },
          ],
        },
      ],
    })

    const { getAllByRole } = render((await Table({ data: mockDataWithConfidence, size: mockSize })) as ReactElement)

    const cells = getAllByRole('cell')
    expect(cells).toHaveLength(2)

    // Check that the value is bold and confidence intervals are displayed
    const firstCell = cells[0]
    expect(firstCell.innerHTML).toContain('<strong>12,630.00</strong>')
    expect(firstCell.textContent).toContain('12,630.00')
    expect(firstCell.textContent).toContain('(93.00 to 97.00)')

    const secondCell = cells[1]
    expect(secondCell.innerHTML).toContain('<strong>9,360.00</strong>')
    expect(secondCell.textContent).toContain('9,360.00')
    expect(secondCell.textContent).toContain('(92.50 to 97.50)')
  })

  test('does not display confidence intervals when confidence_intervals is false even if data includes them', async () => {
    const mockDataWithoutConfidence: ComponentProps<typeof Table>['data'] = {
      ...mockData,
      confidence_intervals: false,
    }

    getTableMock.mockResolvedValueOnce({
      success: true,
      data: [
        {
          reference: '2022-10-31',
          values: [
            {
              label: 'Plot1',
              value: 12630.0,
              lower_confidence: 93.0,
              upper_confidence: 97.0,
              in_reporting_delay_period: false,
            },
          ],
        },
      ],
    })

    const { getAllByRole } = render((await Table({ data: mockDataWithoutConfidence, size: mockSize })) as ReactElement)

    const cells = getAllByRole('cell')
    expect(cells).toHaveLength(1)

    // Should display value without confidence intervals and without bold
    expect(cells[0].textContent).toBe('12,630.00')
    expect(cells[0].textContent).not.toContain('(93.00 to 97.00)')
    expect(cells[0].innerHTML).not.toContain('<strong>')
  })

  test('displays value in bold even without confidence intervals when confidence_intervals is true', async () => {
    const mockDataWithConfidence: ComponentProps<typeof Table>['data'] = {
      ...mockData,
      confidence_intervals: true,
      confidence_intervals_description: 'Metric column includes 95% lower and upper confidence intervals, in brackets.',
    }

    getTableMock.mockResolvedValueOnce({
      success: true,
      data: [
        {
          reference: '2022-10-31',
          values: [
            {
              label: 'Plot1',
              value: 12630.0,
              in_reporting_delay_period: false,
            },
          ],
        },
      ],
    })

    const { getAllByRole } = render((await Table({ data: mockDataWithConfidence, size: mockSize })) as ReactElement)

    const cells = getAllByRole('cell')
    expect(cells).toHaveLength(1)

    // Value should be bold even without confidence intervals
    expect(cells[0].innerHTML).toContain('<strong>12,630.00</strong>')
    expect(cells[0].textContent).toBe('12,630.00')
  })

  test('handles null confidence interval values gracefully', async () => {
    const mockDataWithConfidence: ComponentProps<typeof Table>['data'] = {
      ...mockData,
      confidence_intervals: true,
      confidence_intervals_description: 'Metric column includes 95% lower and upper confidence intervals, in brackets.',
    }

    getTableMock.mockResolvedValueOnce({
      success: true,
      data: [
        {
          reference: '2022-10-31',
          values: [
            {
              label: 'Plot1',
              value: 12630.0,
              lower_confidence: null,
              upper_confidence: null,
              in_reporting_delay_period: false,
            },
          ],
        },
      ],
    })

    const { getAllByRole } = render((await Table({ data: mockDataWithConfidence, size: mockSize })) as ReactElement)

    const cells = getAllByRole('cell')
    expect(cells).toHaveLength(1)

    // Should display value in bold without confidence intervals when values are null
    expect(cells[0].innerHTML).toContain('<strong>12,630.00</strong>')
    expect(cells[0].textContent).toBe('12,630.00')
    expect(cells[0].textContent).not.toContain('(')
  })

  test('handles partial confidence interval values (only lower or only upper)', async () => {
    const mockDataWithConfidence: ComponentProps<typeof Table>['data'] = {
      ...mockData,
      confidence_intervals: true,
      confidence_intervals_description: 'Metric column includes 95% lower and upper confidence intervals, in brackets.',
    }

    getTableMock.mockResolvedValueOnce({
      success: true,
      data: [
        {
          reference: '2022-10-31',
          values: [
            {
              label: 'Plot1',
              value: 12630.0,
              lower_confidence: 93.0,
              upper_confidence: null,
              in_reporting_delay_period: false,
            },
          ],
        },
      ],
    })

    const { getAllByRole } = render((await Table({ data: mockDataWithConfidence, size: mockSize })) as ReactElement)

    const cells = getAllByRole('cell')
    expect(cells).toHaveLength(1)

    // Should display value in bold without confidence intervals when only one value is present
    expect(cells[0].innerHTML).toContain('<strong>12,630.00</strong>')
    expect(cells[0].textContent).toBe('12,630.00')
    expect(cells[0].textContent).not.toContain('(')
  })

  test('confidence intervals break to new line on small screens', async () => {
    const mockDataWithConfidence: ComponentProps<typeof Table>['data'] = {
      ...mockData,
      confidence_intervals: true,
      confidence_intervals_description: 'Metric column includes 95% lower and upper confidence intervals, in brackets.',
    }

    getTableMock.mockResolvedValueOnce({
      success: true,
      data: [
        {
          reference: '2022-10-31',
          values: [
            {
              label: 'Plot1',
              value: 12630.0,
              lower_confidence: 93.0,
              upper_confidence: 97.0,
              in_reporting_delay_period: false,
            },
          ],
        },
      ],
    })

    const { getAllByRole } = render((await Table({ data: mockDataWithConfidence, size: mockSize })) as ReactElement)

    const cells = getAllByRole('cell')
    expect(cells).toHaveLength(1)

    // Check that the span has the responsive classes for line breaking
    const cellHTML = cells[0].innerHTML
    expect(cellHTML).toContain('block sm:inline')
  })

  test('handles null cell values with confidence intervals', async () => {
    const mockDataWithConfidence: ComponentProps<typeof Table>['data'] = {
      ...mockData,
      confidence_intervals: true,
      confidence_intervals_description: 'Metric column includes 95% lower and upper confidence intervals, in brackets.',
    }

    getTableMock.mockResolvedValueOnce({
      success: true,
      data: [
        {
          reference: '2022-10-31',
          values: [
            {
              label: 'Plot1',
              value: null,
              lower_confidence: 93.0,
              upper_confidence: 97.0,
              in_reporting_delay_period: false,
            },
          ],
        },
      ],
    })

    const { getAllByRole } = render((await Table({ data: mockDataWithConfidence, size: mockSize })) as ReactElement)

    const cells = getAllByRole('cell')
    expect(cells).toHaveLength(1)

    // Should display "-" in bold without confidence intervals when value is null
    expect(cells[0].innerHTML).toContain('<strong>-</strong>')
    expect(cells[0].textContent).toBe('-')
    expect(cells[0].textContent).not.toContain('(')
  })
})
