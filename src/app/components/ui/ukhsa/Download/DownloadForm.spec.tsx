import { userEvent } from '@testing-library/user-event'
import fetch from 'cross-fetch'
import React, { ComponentProps } from 'react'

import { DualCategoryChartCardValue } from '@/api/models/cms/Page'
import { mockRouter } from '@/app/utils/__mocks__/next-router'
import { downloadFile } from '@/app/utils/download.utils'
import { chartExportApiRoutePath, dualCategoryChartExportApiRoutePath } from '@/config/constants'
import { render, screen, waitFor } from '@/config/test-utils'

import { DownloadForm } from './DownloadForm'

jest.mock('@/app/utils/download.utils')
jest.mock('cross-fetch')

const props: ComponentProps<typeof DownloadForm> = {
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
        age: '',
        sex: '',
      },
      id: '123',
    },
  ],
  tagManagerEventId: 'new_cases_daily_test_tag',
}

describe('DownloadForm', () => {
  beforeEach(() => {
    mockRouter.push('/topics/mock-topic')
    console.error = jest.fn()
    jest.clearAllMocks()
  })

  test('renders a progressively enhanced form with hidden inputs and submit button', () => {
    render(<DownloadForm {...props} />)

    // Form
    const form = screen.getByRole('form', { name: 'Download' })
    expect(form).toHaveAttribute('method', 'POST')
    expect(form).toHaveAttribute('action', chartExportApiRoutePath)

    expect(screen.getByLabelText('CSV')).toBeChecked()

    // Hidden inputs
    expect(screen.getByTestId('download-form-plots')).toHaveValue(
      JSON.stringify({
        topic: 'COVID-19',
        metric: 'new_cases_daily',
        stratum: '',
        geography_type: '',
        geography: '',
        date_from: null,
        date_to: null,
        age: '',
        sex: '',
      })
    )

    // CTA
    expect(screen.getByRole('button', { name: 'Download' })).toHaveAttribute('type', 'submit')
  })

  test('prevents multiple clicks when downloading', async () => {
    jest.mocked(fetch).mockImplementationOnce(
      () =>
        new Promise(() => {
          // Never resolves to simulate ongoing download
        })
    )

    render(<DownloadForm {...props} />)

    const button = screen.getByRole('button', { name: 'Download' })

    // Click first time
    await userEvent.click(button)

    // Wait for downloading state
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Downloading' })).toBeInTheDocument()
    })

    // Try to click again - should not trigger another fetch
    const downloadingButton = screen.getByRole('button', { name: 'Downloading' })
    await userEvent.click(downloadingButton)

    // Should only have been called once
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  test('renders the form with geography parameters when a location is selected', () => {
    mockRouter.push('/topics/mock-topic?areaType=Nation&areaName=England')

    render(<DownloadForm {...props} />)

    // Form
    const form = screen.getByRole('form', { name: 'Download' })
    expect(form).toHaveAttribute('method', 'POST')
    expect(form).toHaveAttribute('action', chartExportApiRoutePath)
    expect(form).toHaveAttribute('data-tag-manager-event-id', 'new_cases_daily_test_tag')

    expect(screen.getByLabelText('CSV')).toBeChecked()

    // Hidden inputs
    expect(screen.getByTestId('download-form-plots')).toHaveValue(
      JSON.stringify({
        topic: 'COVID-19',
        metric: 'new_cases_daily',
        stratum: '',
        geography_type: 'Nation',
        geography: 'England',
        date_from: null,
        date_to: null,
        age: '',
        sex: '',
      })
    )

    // CTA
    expect(screen.getByRole('button', { name: 'Download' })).toHaveAttribute('type', 'submit')
  })

  test('renders a hidden field for a chart x-axis if one is selected', () => {
    render(<DownloadForm {...props} xAxis="geography" />)

    expect(screen.getByTestId('download-x-axis')).toHaveValue('geography')
  })

  test('does not render hidden field for a chart x-axis if one is not provided', () => {
    render(<DownloadForm {...props} />)

    expect(screen.queryByTestId('download-x-axis')).toBeNull()
  })

  test('renders confidence_intervals hidden field with value false by default', () => {
    render(<DownloadForm {...props} />)

    const confidenceIntervalsInput = screen.getByTestId('download-confidence-intervals')
    expect(confidenceIntervalsInput).toHaveAttribute('type', 'hidden')
    expect(confidenceIntervalsInput).toHaveAttribute('name', 'confidence_intervals')
    expect(confidenceIntervalsInput).toHaveValue('false')
  })

  test('renders confidence_intervals hidden field with value true when confidenceIntervals prop is true', () => {
    render(<DownloadForm {...props} confidenceIntervals={true} />)

    const confidenceIntervalsInput = screen.getByTestId('download-confidence-intervals')
    expect(confidenceIntervalsInput).toHaveValue('true')
  })

  test('renders confidence_intervals hidden field with value false when confidenceIntervals prop is false', () => {
    render(<DownloadForm {...props} confidenceIntervals={false} />)

    const confidenceIntervalsInput = screen.getByTestId('download-confidence-intervals')
    expect(confidenceIntervalsInput).toHaveValue('false')
  })

  describe('official sensitive download banner', () => {
    test('shows acknowledgement banner on first submit when isPublic is false', async () => {
      render(<DownloadForm {...props} isPublic={false} authEnabled={true} />)

      expect(screen.queryByRole('region', { name: 'Download official sensitive data warning' })).not.toBeInTheDocument()

      await userEvent.click(screen.getByRole('button', { name: 'Download' }))

      expect(screen.getByRole('region', { name: 'Download official sensitive data warning' })).toBeInTheDocument()
      expect(screen.getByText(/official sensitive data/i)).toBeInTheDocument()
      expect(fetch).not.toHaveBeenCalled()
    })

    test('proceeds with download on second submit after banner is shown', async () => {
      jest.mocked(fetch).mockReturnValueOnce(
        Promise.resolve({
          text: async () => Promise.resolve('mock-download'),
        } as Response)
      )

      render(<DownloadForm {...props} isPublic={false} authEnabled={true} />)

      await userEvent.click(screen.getByRole('button', { name: 'Download' }))

      await waitFor(() => {
        expect(screen.getByRole('region', { name: 'Download official sensitive data warning' })).toBeInTheDocument()
      })

      await userEvent.click(screen.getByRole('button', { name: /continue and download/i }))

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1)
      })
    })

    test('dismisses banner when back button is clicked', async () => {
      render(<DownloadForm {...props} isPublic={false} authEnabled={true} />)

      await userEvent.click(screen.getByRole('button', { name: 'Download' }))

      await waitFor(() => {
        expect(screen.getByRole('region', { name: 'Download official sensitive data warning' })).toBeInTheDocument()
      })

      await userEvent.click(screen.getByRole('button', { name: 'Back' }))

      expect(screen.queryByRole('region', { name: 'Download official sensitive data warning' })).not.toBeInTheDocument()
    })

    test('does not show acknowledgement banner when isPublic is true', async () => {
      jest.mocked(fetch).mockReturnValueOnce(
        Promise.resolve({
          text: async () => Promise.resolve('mock-download'),
        } as Response)
      )

      render(<DownloadForm {...props} isPublic={true} authEnabled={true} />)

      await userEvent.click(screen.getByRole('button', { name: 'Download' }))

      expect(screen.queryByRole('region', { name: 'Download official sensitive data warning' })).not.toBeInTheDocument()

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1)
      })
    })

    test('does not show acknowledgement banner when authEnabled is false', async () => {
      jest.mocked(fetch).mockReturnValueOnce(
        Promise.resolve({
          text: async () => Promise.resolve('mock-download'),
        } as Response)
      )

      render(<DownloadForm {...props} isPublic={false} authEnabled={false} />)

      await userEvent.click(screen.getByRole('button', { name: 'Download' }))

      expect(screen.queryByRole('region', { name: 'Download official sensitive data warning' })).not.toBeInTheDocument()

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1)
      })
    })
  })

  test('Downloading a csv file for users with JavaScript', async () => {
    jest.mocked(fetch).mockReturnValueOnce(
      Promise.resolve({
        text: async () => Promise.resolve('mock-download'),
      } as Response)
    )

    mockRouter.push('/topics/mock-topic?areaType=Nation&areaName=England')

    render(<DownloadForm {...props} />)

    const button = screen.getByRole('button', { name: 'Download' })
    await userEvent.click(button)

    await waitFor(() => {
      expect(downloadFile).toHaveBeenNthCalledWith(1, 'ukhsa-chart-download.csv', new Blob(['mock-download']))
    })
  })

  test('Downloading a json file for users with JavaScript', async () => {
    jest.mocked(fetch).mockReturnValueOnce(
      Promise.resolve({
        text: async () => Promise.resolve('mock-download'),
      } as Response)
    )

    mockRouter.push('/topics/mock-topic?areaType=Nation&areaName=England')

    render(<DownloadForm {...props} />)

    await userEvent.click(screen.getByLabelText('JSON'))

    expect(screen.getByLabelText('CSV')).not.toBeChecked()
    expect(screen.getByLabelText('JSON')).toBeChecked()

    await userEvent.click(screen.getByRole('button', { name: 'Download' }))

    await waitFor(() => {
      expect(downloadFile).toHaveBeenNthCalledWith(1, 'ukhsa-chart-download.json', new Blob(['mock-download']))
    })
  })

  test('handles download error and redirects to error page', async () => {
    jest.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

    const mockReplace = jest.fn()
    const navigation = require('next/navigation')
    const originalUseRouter = navigation.useRouter
    navigation.useRouter = jest.fn().mockReturnValue({
      ...mockRouter,
      replace: mockReplace,
      push: mockRouter.push,
      refresh: jest.fn(),
    })

    try {
      render(<DownloadForm {...props} />)

      await userEvent.click(screen.getByRole('button', { name: 'Download' }))

      await waitFor(
        () => {
          expect(mockReplace).toHaveBeenCalledWith('/error')
        },
        { timeout: 3000 }
      )
    } finally {
      navigation.useRouter = originalUseRouter
    }
  })
})

describe('DownloadForm (dual category)', () => {
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

  const dualCategoryProps: ComponentProps<typeof DownloadForm> = {
    dualCategoryData: mockChartData,
    tagManagerEventId: 'test-event-id',
    isPublic: true,
    authEnabled: false,
  }

  beforeEach(() => {
    mockRouter.push('/topics/mock-topic')
    console.error = jest.fn()
    jest.clearAllMocks()
  })

  test('renders a form with download heading and format options', () => {
    render(<DownloadForm {...dualCategoryProps} />)

    expect(screen.getByRole('form', { name: 'Download' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Download data', level: 3 })).toBeInTheDocument()
    expect(screen.getByLabelText('CSV')).toBeInTheDocument()
    expect(screen.getByLabelText('JSON')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /download/i })).toBeInTheDocument()
  })

  test('has CSV selected by default', () => {
    render(<DownloadForm {...dualCategoryProps} />)

    expect(screen.getByLabelText('CSV')).toBeChecked()
    expect(screen.getByLabelText('JSON')).not.toBeChecked()
  })

  test('includes serialized chart data in a hidden input', () => {
    render(<DownloadForm {...dualCategoryProps} />)

    const hiddenInput = screen.getByTestId('download-form-dual-category-data')
    const parsed = JSON.parse((hiddenInput as HTMLInputElement).value)

    expect(parsed.chart_type).toBe('stacked_bar')
    expect(parsed.x_axis).toBe('date')
    expect(parsed.static_fields.topic).toBe('COVID-19')
    expect(parsed.segments).toHaveLength(1)
    expect(parsed.segments[0].secondary_field_value).toBe('0-4')
  })

  test('form has correct action and method attributes', () => {
    render(<DownloadForm {...dualCategoryProps} />)

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

    render(<DownloadForm {...dualCategoryProps} />)

    await userEvent.click(screen.getByRole('button', { name: /download/i }))

    expect(screen.getByRole('button', { name: /downloading/i })).toBeInTheDocument()

    resolveDownload!()
  })

  test('triggers file download on successful submit', async () => {
    jest.mocked(fetch).mockResolvedValueOnce({ text: async () => 'csv-data' } as Response)

    render(<DownloadForm {...dualCategoryProps} />)

    await userEvent.click(screen.getByRole('button', { name: /download/i }))

    await waitFor(() => {
      expect(downloadFile).toHaveBeenCalledWith('ukhsa-chart-download.csv', expect.any(Blob))
    })
  })

  test('redirects to error page when fetch throws', async () => {
    jest.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

    render(<DownloadForm {...dualCategoryProps} />)

    await userEvent.click(screen.getByRole('button', { name: /download/i }))

    await waitFor(() => {
      expect(mockRouter.pathname).toBe('/error')
    })
  })

  test('shows acknowledgement banner when authEnabled and isPublic is false', async () => {
    render(<DownloadForm {...dualCategoryProps} authEnabled isPublic={false} />)

    await userEvent.click(screen.getByRole('button', { name: /download/i }))

    expect(screen.getByRole('region', { name: 'Download official sensitive data warning' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument()
  })

  test('hides acknowledgement banner when Back is clicked', async () => {
    render(<DownloadForm {...dualCategoryProps} authEnabled isPublic={false} />)

    await userEvent.click(screen.getByRole('button', { name: /download/i }))

    expect(screen.getByRole('region', { name: 'Download official sensitive data warning' })).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Back' }))

    expect(screen.queryByRole('region', { name: 'Download official sensitive data warning' })).not.toBeInTheDocument()
  })
})
