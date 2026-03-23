import { waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import fetch from 'cross-fetch'

import { SubplotDownloadForm } from '@/app/components/ui/ukhsa/Download/SubplotDownloadForm'
import { mockRouter } from '@/app/utils/__mocks__/next-router'
import { downloadFile } from '@/app/utils/download.utils'
import { subplotChartExportApiRoutePath } from '@/config/constants'
import { render, screen } from '@/config/test-utils'

jest.mock('@/app/utils/download.utils')
jest.mock('cross-fetch')

const mockReplace = jest.fn()
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: jest.fn(() => ({
    ...mockRouter,
    replace: mockReplace,
  })),
}))

const mockXaxis = 'geography'
const mockTagManagerId = null
const mockedChart = {
  chart_parameters: {},
  subplots: [
    {
      subplot_title: '',
      subplot_parameters: {},
      plots: [],
    },
  ],
}

describe('SubplotDownloadForm', () => {
  beforeEach(() => {
    mockRouter.push('/topics/mock-topic')
    console.error = jest.fn()
    jest.clearAllMocks()
  })

  const renderComponent = (isPublic?: boolean) =>
    render(
      <SubplotDownloadForm
        chart={mockedChart}
        xAxis={mockXaxis}
        tagManagerEventId={mockTagManagerId}
        isPublic={isPublic}
      />
    )

  test('renders the form with expected attributes', async () => {
    renderComponent()

    await waitFor(() => {
      const form = screen.getByRole('form', { name: 'Download' })
      expect(form).toHaveAttribute('method', 'POST')
      expect(form).toHaveAttribute('action', subplotChartExportApiRoutePath)
      expect(screen.getByLabelText('CSV')).toBeChecked()
      expect(screen.getByRole('button', { name: 'Download' })).toHaveAttribute('type', 'submit')
    })
  })

  test('renders a chart with a hidden x-axis field', async () => {
    renderComponent()

    await waitFor(() => {
      expect(screen.getByTestId('download-x-axis')).toBeInTheDocument()
    })
  })

  test('renders a chart with a hidden `chart_parameters` field', async () => {
    renderComponent()

    await waitFor(() => {
      expect(screen.getByTestId('download-form-chart_parameters')).toBeInTheDocument()
    })
  })

  test('renders a chart with a hidden `subplots` field', async () => {
    renderComponent()

    await waitFor(() => {
      expect(screen.getByTestId('download-form-subplots')).toBeInTheDocument()
    })
  })

  test('user can switch to JSON in download options', async () => {
    renderComponent()

    await userEvent.click(screen.getByLabelText('JSON'))

    expect(screen.getByLabelText('CSV')).not.toBeChecked()
    expect(screen.getByLabelText('JSON')).toBeChecked()
  })

  test('user can download as a CSV file', async () => {
    jest.mocked(fetch).mockReturnValueOnce(
      Promise.resolve({
        redirected: false,
        text: async () => Promise.resolve('mock-download'),
      } as any)
    )

    renderComponent()

    await userEvent.click(screen.getByRole('button', { name: 'Download' }))

    await waitFor(() => {
      expect(downloadFile).toHaveBeenCalledWith('ukhsa-chart-download.csv', new Blob(['mock-download']))
    })
  })

  test('user can download as a JSON file', async () => {
    jest.mocked(fetch).mockReturnValueOnce(
      Promise.resolve({
        redirected: false,
        text: async () => Promise.resolve('mock-download'),
      } as any)
    )

    renderComponent()

    await userEvent.click(screen.getByLabelText('JSON'))
    await userEvent.click(screen.getByRole('button', { name: 'Download' }))

    await waitFor(() => {
      expect(downloadFile).toHaveBeenCalledWith('ukhsa-chart-download.json', new Blob(['mock-download']))
    })
  })

  test('handles download error and redirects to error page', async () => {
    jest.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

    renderComponent()

    await userEvent.click(screen.getByRole('button', { name: 'Download' }))

    await waitFor(
      () => {
        expect(mockReplace).toHaveBeenCalledWith('/error')
      },
      { timeout: 3000 }
    )
  })

  describe('official sensitive download banner', () => {
    test('shows acknowledgement banner on first submit when isPublic is false', async () => {
      renderComponent(false)

      expect(screen.queryByRole('region', { name: 'Download official sensitive data warning' })).not.toBeInTheDocument()

      await userEvent.click(screen.getByRole('button', { name: 'Download' }))

      expect(screen.getByRole('region', { name: 'Download official sensitive data warning' })).toBeInTheDocument()
      expect(screen.getByText(/official sensitive data/i)).toBeInTheDocument()
      expect(fetch).not.toHaveBeenCalled()
    })

    test('proceeds with download on second submit after banner is shown', async () => {
      jest.mocked(fetch).mockReturnValueOnce(
        Promise.resolve({
          redirected: false,
          text: async () => Promise.resolve('mock-download'),
        } as any)
      )

      renderComponent(false)

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
      renderComponent(false)

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
          redirected: false,
          text: async () => Promise.resolve('mock-download'),
        } as any)
      )

      renderComponent(true)

      await userEvent.click(screen.getByRole('button', { name: 'Download' }))

      expect(screen.queryByRole('region', { name: 'Download official sensitive data warning' })).not.toBeInTheDocument()

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1)
      })
    })
  })
})
