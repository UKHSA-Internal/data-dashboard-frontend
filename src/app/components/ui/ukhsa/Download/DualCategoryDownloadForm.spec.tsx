import { userEvent } from '@testing-library/user-event'
import fetch from 'cross-fetch'
import { ComponentProps } from 'react'

import { DualCategoryChartCardValue } from '@/api/models/cms/Page'
import { mockRouter } from '@/app/utils/__mocks__/next-router'
import { downloadFile } from '@/app/utils/download.utils'
import { dualCategoryChartExportApiRoutePath } from '@/config/constants'
import { render, screen, waitFor } from '@/config/test-utils'

import { DualCategoryDownloadForm } from './DualCategoryDownloadForm'

jest.mock('@/app/utils/download.utils')
jest.mock('cross-fetch')

const mockChartData: DualCategoryChartCardValue = {
  title: 'Test Chart',
  body: 'test body',
  about: '',
  tag_manager_event_id: null,
  x_axis: 'date',
  x_axis_title: 'Date',
  y_axis: 'metric',
  y_axis_title: 'Value',
  chart_type: 'stacked_bar',
  static_fields: {
    topic: 'COVID-19',
    metric: 'COVID-19_cases_casesByDay',
    geography_type: 'Nation',
    geography: 'England',
  },
  primary_field_values: ['2024-01-01'],
  secondary_category: 'age',
  segments: [{ type: 'segment', id: 'seg-1', value: { secondary_field_value: '0-4', colour: 'COLOUR_1_DARK_BLUE' } }],
}

const props: ComponentProps<typeof DualCategoryDownloadForm> = {
  chartData: mockChartData,
  tagManagerEventId: 'test-event-id',
  isPublic: true,
  authEnabled: false,
}

describe('DualCategoryDownloadForm', () => {
  beforeEach(() => {
    mockRouter.push('/topics/mock-topic')
    console.error = jest.fn()
    jest.clearAllMocks()
  })

  test('renders a form with download heading and format options', () => {
    render(<DualCategoryDownloadForm {...props} />)

    expect(screen.getByRole('form', { name: 'Download' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Download data', level: 3 })).toBeInTheDocument()
    expect(screen.getByLabelText('CSV')).toBeInTheDocument()
    expect(screen.getByLabelText('JSON')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /download/i })).toBeInTheDocument()
  })

  test('has CSV selected by default', () => {
    render(<DualCategoryDownloadForm {...props} />)

    expect(screen.getByLabelText('CSV')).toBeChecked()
    expect(screen.getByLabelText('JSON')).not.toBeChecked()
  })

  test('includes serialized chart data in a hidden input', () => {
    render(<DualCategoryDownloadForm {...props} />)

    const hiddenInput = screen.getByTestId('download-form-dual-category-data')
    const parsed = JSON.parse((hiddenInput as HTMLInputElement).value)

    expect(parsed.chart_type).toBe('stacked_bar')
    expect(parsed.x_axis).toBe('date')
    expect(parsed.static_fields.topic).toBe('COVID-19')
    expect(parsed.segments).toHaveLength(1)
    expect(parsed.segments[0].secondary_field_value).toBe('0-4')
  })

  test('form has correct action and method attributes', () => {
    render(<DualCategoryDownloadForm {...props} />)

    const form = screen.getByRole('form', { name: 'Download' })
    expect(form).toHaveAttribute('action', dualCategoryChartExportApiRoutePath)
    expect(form).toHaveAttribute('method', 'POST')
  })

  test('shows downloading state while request is in progress', async () => {
    let resolveDownload: () => void
    const pendingPromise = new Promise<void>((resolve) => {
      resolveDownload = resolve
    })

    jest.mocked(fetch).mockReturnValueOnce(pendingPromise.then(() => ({ text: async () => 'csv-data' }) as Response))

    render(<DualCategoryDownloadForm {...props} />)

    await userEvent.click(screen.getByRole('button', { name: /download/i }))

    expect(screen.getByRole('button', { name: /downloading/i })).toBeInTheDocument()

    resolveDownload!()
  })

  test('triggers file download on successful submit', async () => {
    jest.mocked(fetch).mockResolvedValueOnce({ text: async () => 'csv-data' } as Response)

    render(<DualCategoryDownloadForm {...props} />)

    await userEvent.click(screen.getByRole('button', { name: /download/i }))

    await waitFor(() => {
      expect(downloadFile).toHaveBeenCalledWith('ukhsa-chart-download.csv', expect.any(Blob))
    })
  })

  test('redirects to error page when fetch throws', async () => {
    jest.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

    render(<DualCategoryDownloadForm {...props} />)

    await userEvent.click(screen.getByRole('button', { name: /download/i }))

    await waitFor(() => {
      expect(mockRouter.pathname).toBe('/error')
    })
  })

  test('shows acknowledgement banner when authEnabled and isPublic is false', async () => {
    render(<DualCategoryDownloadForm {...props} authEnabled isPublic={false} />)

    await userEvent.click(screen.getByRole('button', { name: /download/i }))

    expect(screen.getByRole('region', { name: 'Download official sensitive data warning' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument()
  })

  test('hides acknowledgement banner when Back is clicked', async () => {
    render(<DualCategoryDownloadForm {...props} authEnabled isPublic={false} />)

    await userEvent.click(screen.getByRole('button', { name: /download/i }))

    expect(screen.getByRole('region', { name: 'Download official sensitive data warning' })).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Back' }))

    expect(screen.queryByRole('region', { name: 'Download official sensitive data warning' })).not.toBeInTheDocument()
  })
})
