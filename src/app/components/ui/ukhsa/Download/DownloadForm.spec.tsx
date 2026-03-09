import { userEvent } from '@testing-library/user-event'
import fetch from 'cross-fetch'
import React, { ComponentProps } from 'react'

import { mockRouter } from '@/app/utils/__mocks__/next-router'
import { downloadFile } from '@/app/utils/download.utils'
import { chartExportApiRoutePath } from '@/config/constants'
import { render, screen, waitFor } from '@/config/test-utils'

import { DownloadForm } from './DownloadForm'

jest.mock('@/app/utils/download.utils')
jest.mock('cross-fetch')

const { useSearchParams, useRouter } = require('next/navigation')

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
    console.error = jest.fn()
    jest.clearAllMocks()
    // Default: no search params, standard router
    useSearchParams.mockReturnValue(new URLSearchParams())
    useRouter.mockReturnValue(mockRouter)
  })

  describe('Initial render', () => {
    test('renders a progressively enhanced form with hidden inputs and submit button', () => {
      render(<DownloadForm {...props} />)

      const form = screen.getByRole('form', { name: 'Download' })
      expect(form).toHaveAttribute('method', 'POST')
      expect(form).toHaveAttribute('action', chartExportApiRoutePath)
      expect(form).toHaveAttribute('data-tag-manager-event-id', 'new_cases_daily_test_tag')

      expect(screen.getByLabelText('CSV')).toBeChecked()

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

      expect(screen.getByRole('button', { name: /download/i })).toHaveAttribute('type', 'submit')
    })

    test('does not show the warning banner on initial render', () => {
      render(<DownloadForm {...props} />)

      expect(screen.queryByRole('region', { name: 'Download official sensitive data warning' })).not.toBeInTheDocument()
    })

    test('does not show the back button on initial render', () => {
      render(<DownloadForm {...props} />)

      expect(screen.queryByRole('button', { name: 'Back' })).not.toBeInTheDocument()
    })
  })

  describe('Warning banner (isPublic = false)', () => {
    test('shows the warning banner and back button on first submit', async () => {
      render(<DownloadForm {...props} />)

      await userEvent.click(screen.getByRole('button', { name: /download/i }))

      expect(screen.getByRole('region', { name: 'Download official sensitive data warning' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument()
    })

    test('does not trigger a fetch on first submit', async () => {
      render(<DownloadForm {...props} />)

      await userEvent.click(screen.getByRole('button', { name: /download/i }))

      expect(fetch).not.toHaveBeenCalled()
    })

    test('hides the radio inputs and labels when the warning banner is shown', async () => {
      render(<DownloadForm {...props} />)

      await userEvent.click(screen.getByRole('button', { name: /download/i }))

      expect(screen.getByLabelText('CSV')).toHaveClass('hidden')
      expect(screen.getByLabelText('JSON')).toHaveClass('hidden')
    })

    test('shows "Continue and download" button text when the warning banner is shown', async () => {
      render(<DownloadForm {...props} />)

      await userEvent.click(screen.getByRole('button', { name: /download/i }))

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /continue and download/i })).toBeInTheDocument()
      })
    })

    test('proceeds with download on second submit after confirming the warning', async () => {
      jest.mocked(fetch).mockReturnValueOnce(
        Promise.resolve({
          text: async () => Promise.resolve('mock-download'),
        } as Response)
      )

      render(<DownloadForm {...props} />)

      await userEvent.click(screen.getByRole('button', { name: /download/i }))
      await userEvent.click(screen.getByRole('button', { name: /continue and download/i }))

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(downloadFile).toHaveBeenCalledWith('ukhsa-chart-download.csv', new Blob(['mock-download']))
      })
    })

    test('hides the warning banner and back button when back is clicked', async () => {
      render(<DownloadForm {...props} />)

      await userEvent.click(screen.getByRole('button', { name: /download/i }))
      expect(screen.getByRole('region', { name: 'Download official sensitive data warning' })).toBeInTheDocument()

      await userEvent.click(screen.getByRole('button', { name: 'Back' }))

      expect(screen.queryByRole('region', { name: 'Download official sensitive data warning' })).not.toBeInTheDocument()
      expect(screen.queryByRole('button', { name: 'Back' })).not.toBeInTheDocument()
    })

    test('restores the radio inputs after clicking back', async () => {
      render(<DownloadForm {...props} />)

      await userEvent.click(screen.getByRole('button', { name: /download/i }))
      await userEvent.click(screen.getByRole('button', { name: 'Back' }))

      expect(screen.getByLabelText('CSV')).not.toHaveClass('hidden')
      expect(screen.getByLabelText('JSON')).not.toHaveClass('hidden')
    })

    test('does not trigger a fetch when back button is clicked', async () => {
      render(<DownloadForm {...props} />)

      await userEvent.click(screen.getByRole('button', { name: /download/i }))
      await userEvent.click(screen.getByRole('button', { name: 'Back' }))

      expect(fetch).not.toHaveBeenCalled()
    })
  })

  describe('Downloading', () => {
    test('prevents multiple clicks when downloading', async () => {
      jest.mocked(fetch).mockImplementationOnce(
        () =>
          new Promise<Response>(() => {
            // Never resolves to simulate an ongoing download
          })
      )

      render(<DownloadForm {...props} />)

      // Two-step: show banner then confirm to start downloading
      await userEvent.click(screen.getByRole('button', { name: /download/i }))
      await userEvent.click(screen.getByRole('button', { name: /continue and download/i }))

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /downloading/i })).toBeInTheDocument()
      })

      // Try clicking again whilst downloading — should not trigger another fetch
      await userEvent.click(screen.getByRole('button', { name: /downloading/i }))

      expect(fetch).toHaveBeenCalledTimes(1)
    })

    test('downloads a csv file', async () => {
      jest.mocked(fetch).mockReturnValueOnce(
        Promise.resolve({
          text: async () => Promise.resolve('mock-download'),
        } as Response)
      )

      render(<DownloadForm {...props} />)

      await userEvent.click(screen.getByRole('button', { name: /download/i }))
      await userEvent.click(screen.getByRole('button', { name: /continue and download/i }))

      await waitFor(() => {
        expect(downloadFile).toHaveBeenNthCalledWith(1, 'ukhsa-chart-download.csv', new Blob(['mock-download']))
      })
    })

    test('downloads a json file', async () => {
      jest.mocked(fetch).mockReturnValueOnce(
        Promise.resolve({
          text: async () => Promise.resolve('mock-download'),
        } as Response)
      )

      render(<DownloadForm {...props} />)

      await userEvent.click(screen.getByLabelText('JSON'))
      expect(screen.getByLabelText('JSON')).toBeChecked()

      await userEvent.click(screen.getByRole('button', { name: /download/i }))
      await userEvent.click(screen.getByRole('button', { name: /continue and download/i }))

      await waitFor(() => {
        expect(downloadFile).toHaveBeenNthCalledWith(1, 'ukhsa-chart-download.json', new Blob(['mock-download']))
      })
    })

    test('handles a download error and redirects to the error page', async () => {
      jest.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

      const mockReplace = jest.fn()
      useRouter.mockReturnValue({
        ...mockRouter,
        replace: mockReplace,
        refresh: jest.fn(),
      })

      render(<DownloadForm {...props} />)

      await userEvent.click(screen.getByRole('button', { name: /download/i }))
      await userEvent.click(screen.getByRole('button', { name: /continue and download/i }))

      await waitFor(
        () => {
          expect(mockReplace).toHaveBeenCalledWith('/error')
        },
        { timeout: 3000 }
      )
    })
  })

  describe('Geography parameters', () => {
    test('uses area type and name from search params when a location is selected', () => {
      useSearchParams.mockReturnValue(new URLSearchParams('areaType=Nation&areaName=England'))

      render(<DownloadForm {...props} />)

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
    })

    test('falls back to chart geography values when no location is selected', () => {
      useSearchParams.mockReturnValue(new URLSearchParams())

      render(<DownloadForm {...props} />)

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
    })
  })

  describe('Hidden fields', () => {
    test('renders the x-axis hidden field when an x-axis is provided', () => {
      render(<DownloadForm {...props} xAxis="geography" />)

      expect(screen.getByTestId('download-x-axis')).toHaveValue('geography')
    })

    test('does not render the x-axis hidden field when no x-axis is provided', () => {
      render(<DownloadForm {...props} />)

      expect(screen.queryByTestId('download-x-axis')).toBeNull()
    })

    test('renders confidence_intervals as false by default', () => {
      render(<DownloadForm {...props} />)

      const input = screen.getByTestId('download-confidence-intervals')
      expect(input).toHaveAttribute('type', 'hidden')
      expect(input).toHaveAttribute('name', 'confidence_intervals')
      expect(input).toHaveValue('false')
    })

    test('renders confidence_intervals as true when prop is true', () => {
      render(<DownloadForm {...props} confidenceIntervals={true} />)

      expect(screen.getByTestId('download-confidence-intervals')).toHaveValue('true')
    })

    test('renders confidence_intervals as false when prop is false', () => {
      render(<DownloadForm {...props} confidenceIntervals={false} />)

      expect(screen.getByTestId('download-confidence-intervals')).toHaveValue('false')
    })
  })
})
