import { renderHook } from '@testing-library/react'

import { chartTableMaxColumns } from '@/config/constants'

import { parseChartTableData } from './chart-table.utils'

beforeEach(() => {
  console.error = jest.fn()
})

test('transforms the tabular api response to be usable within the ui', () => {
  const { result } = renderHook(() =>
    parseChartTableData([
      {
        date: '2022-10-31',
        values: [
          {
            label: 'Plot1',
            value: 3897.0,
          },
          {
            label: 'Plot2',
            value: 3471.1,
          },
        ],
      },
      {
        date: '2022-11-31',
        values: [
          {
            label: 'Plot1',
            value: 3897.0,
          },
          {
            label: 'Plot2',
            value: 3471.1,
          },
        ],
      },
    ])
  )

  expect(result.current).toEqual([
    {
      columns: [
        {
          accessorKey: 'col-0',
          header: 'Date',
        },
        {
          accessorKey: 'col-1',
          header: 'Plot1',
        },
        {
          accessorKey: 'col-2',
          header: 'Plot2',
        },
      ],
      data: [
        {
          'col-0': '2022-10-31',
          'col-1': 3897.0,
          'col-2': 3471.1,
        },
        {
          'col-0': '2022-11-31',
          'col-1': 3897.0,
          'col-2': 3471.1,
        },
      ],
    },
  ])
})

test('divides into multiple tables when the number of plots exceeds the threshold for narrow-width containers', () => {
  const { result } = renderHook(() =>
    parseChartTableData(
      [
        {
          date: '2022-10-31',
          values: [
            {
              label: 'Plot1',
              value: 3897.0,
            },
            {
              label: 'Plot2',
              value: 3471.1,
            },
            {
              label: 'Plot3',
              value: 3471.1,
            },
          ],
        },
        {
          date: '2022-11-31',
          values: [
            {
              label: 'Plot1',
              value: 3897.0,
            },
            {
              label: 'Plot2',
              value: 3471.1,
            },
            {
              label: 'Plot3',
              value: 3471.1,
            },
          ],
        },
      ],
      { maxColumns: chartTableMaxColumns.narrow }
    )
  )

  expect(result.current).toEqual([
    {
      columns: [
        {
          accessorKey: 'col-0',
          header: 'Date',
        },
        {
          accessorKey: 'col-1',
          header: 'Plot1',
        },
      ],
      data: [
        {
          'col-0': '2022-10-31',
          'col-1': 3897.0,
        },
        {
          'col-0': '2022-11-31',
          'col-1': 3897.0,
        },
      ],
    },
    {
      columns: [
        {
          accessorKey: 'col-0',
          header: 'Date',
        },
        {
          accessorKey: 'col-1',
          header: 'Plot2',
        },
      ],
      data: [
        {
          'col-0': '2022-10-31',
          'col-1': 3471.1,
        },
        {
          'col-0': '2022-11-31',
          'col-1': 3471.1,
        },
      ],
    },
    {
      columns: [
        {
          accessorKey: 'col-0',
          header: 'Date',
        },
        {
          accessorKey: 'col-1',
          header: 'Plot3',
        },
      ],
      data: [
        {
          'col-0': '2022-10-31',
          'col-1': 3471.1,
        },
        {
          'col-0': '2022-11-31',
          'col-1': 3471.1,
        },
      ],
    },
  ])
})

test('divides into multiple tables when the number of plots exceeds the threshold for full-width containers', () => {
  const { result } = renderHook(() =>
    parseChartTableData(
      [
        {
          date: '2022-10-31',
          values: [
            {
              label: 'Plot1',
              value: 3897.0,
            },
            {
              label: 'Plot2',
              value: 3471.1,
            },
            {
              label: 'Plot3',
              value: 3471.1,
            },
            {
              label: 'Plot4',
              value: 3471.1,
            },
            {
              label: 'Plot5',
              value: 3471.1,
            },
            {
              label: 'Plot6',
              value: 3471.1,
            },
            {
              label: 'Plot7',
              value: 3471.1,
            },
            {
              label: 'Plot8',
              value: 3471.1,
            },
          ],
        },
        {
          date: '2022-11-31',
          values: [
            {
              label: 'Plot1',
              value: 3897.0,
            },
            {
              label: 'Plot2',
              value: 3471.1,
            },
            {
              label: 'Plot3',
              value: 3471.1,
            },
            {
              label: 'Plot4',
              value: 3471.1,
            },
            {
              label: 'Plot5',
              value: 3471.1,
            },
            {
              label: 'Plot6',
              value: 3471.1,
            },
            {
              label: 'Plot7',
              value: 3471.1,
            },
            {
              label: 'Plot8',
              value: 3471.1,
            },
          ],
        },
      ],
      { maxColumns: chartTableMaxColumns.wide }
    )
  )

  expect(result.current).toEqual([
    {
      columns: [
        {
          accessorKey: 'col-0',
          header: 'Date',
        },
        {
          accessorKey: 'col-1',
          header: 'Plot1',
        },
        {
          accessorKey: 'col-2',
          header: 'Plot2',
        },
      ],
      data: [
        {
          'col-0': '2022-10-31',
          'col-1': 3897.0,
          'col-2': 3471.1,
        },
        {
          'col-0': '2022-11-31',
          'col-1': 3897.0,
          'col-2': 3471.1,
        },
      ],
    },
    {
      columns: [
        {
          accessorKey: 'col-0',
          header: 'Date',
        },
        {
          accessorKey: 'col-1',
          header: 'Plot3',
        },
        {
          accessorKey: 'col-2',
          header: 'Plot4',
        },
      ],
      data: [
        {
          'col-0': '2022-10-31',
          'col-1': 3471.1,
          'col-2': 3471.1,
        },
        {
          'col-0': '2022-11-31',
          'col-1': 3471.1,
          'col-2': 3471.1,
        },
      ],
    },
    {
      columns: [
        {
          accessorKey: 'col-0',
          header: 'Date',
        },
        {
          accessorKey: 'col-1',
          header: 'Plot5',
        },
        {
          accessorKey: 'col-2',
          header: 'Plot6',
        },
      ],
      data: [
        {
          'col-0': '2022-10-31',
          'col-1': 3471.1,
          'col-2': 3471.1,
        },
        {
          'col-0': '2022-11-31',
          'col-1': 3471.1,
          'col-2': 3471.1,
        },
      ],
    },
    {
      columns: [
        {
          accessorKey: 'col-0',
          header: 'Date',
        },
        {
          accessorKey: 'col-1',
          header: 'Plot7',
        },
        {
          accessorKey: 'col-2',
          header: 'Plot8',
        },
      ],
      data: [
        {
          'col-0': '2022-10-31',
          'col-1': 3471.1,
          'col-2': 3471.1,
        },
        {
          'col-0': '2022-11-31',
          'col-1': 3471.1,
          'col-2': 3471.1,
        },
      ],
    },
  ])
})

test('gracefully handles an unexpected response', () => {
  const { result } = renderHook(() => parseChartTableData(null))
  expect(result.current).toEqual([])
})
