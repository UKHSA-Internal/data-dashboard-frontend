import { waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import fetch from 'cross-fetch'

import { SubplotDownloadForm } from '@/app/components/cms/Download/SubplotDownloadForm'
import { mockRouter } from '@/app/utils/__mocks__/next-router'
import { downloadFile } from '@/app/utils/download.utils'
import { subplotChartExportApiRoutePath } from '@/config/constants'
import { render } from '@/config/test-utils'

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

  const renderComponent = () =>
    render(<SubplotDownloadForm chart={mockedChart} xAxis={mockXaxis} tagManagerEventId={mockTagManagerId} />)

  test('renders the form with expected attributes', async () => {
    const { getByRole, getByLabelText } = renderComponent()

    await waitFor(() => {
      const form = getByRole('form', { name: 'Download' })
      expect(form).toHaveAttribute('method', 'POST')
      expect(form).toHaveAttribute('action', subplotChartExportApiRoutePath)

      expect(getByLabelText('CSV')).toBeChecked()
      expect(getByRole('button', { name: 'Download' })).toHaveAttribute('type', 'submit')
    })
  })

  test('renders a chart with a hidden x-axis field', async () => {
    const { getByTestId } = renderComponent()

    await waitFor(() => {
      expect(getByTestId('download-x-axis')).toBeInTheDocument()
    })
  })

  test('renders a chart with a hidden `chart_parameters` field', async () => {
    const { getByTestId } = renderComponent()

    await waitFor(() => {
      expect(getByTestId('download-form-chart_parameters')).toBeInTheDocument()
    })
  })

  test('renders a chart with a hidden `subplots` field', async () => {
    const { getByTestId } = renderComponent()

    await waitFor(() => {
      expect(getByTestId('download-form-subplots')).toBeInTheDocument()
    })
  })

  test('user can switch to JSON in download options', async () => {
    const { getByLabelText } = renderComponent()

    await waitFor(() => {
      userEvent.click(getByLabelText('JSON'))

      expect(getByLabelText('CSV')).not.toBeChecked()
      expect(getByLabelText('JSON')).toBeChecked()
    })
  })

  test('user can download as a CSV file', async () => {
    jest.mocked(fetch).mockReturnValueOnce(
      Promise.resolve({
        redirected: false,
        success: true,
        text: async () => Promise.resolve('mock-download'),
      } as any)
    )

    mockRouter.push('/topics/mock-topic')

    const { getByRole, getByLabelText } = renderComponent()

    await waitFor(() => {
      const button = getByRole('button', { name: 'Download' })
      expect(button).toHaveAttribute('type', 'submit')

      expect(getByLabelText('CSV')).toBeChecked()
      expect(getByLabelText('JSON')).not.toBeChecked()

      userEvent.click(button)

      expect(downloadFile).toHaveBeenCalledWith('ukhsa-chart-download.csv', new Blob(['mock-download']))
    })
  })

  test('user can download as a JSON file', async () => {
    jest.mocked(fetch).mockReturnValueOnce(
      Promise.resolve({
        redirected: false,
        success: true,
        text: async () => Promise.resolve('mock-download'),
      } as any)
    )

    mockRouter.push('/topics/mock-topic')

    const { getByRole, getByLabelText } = renderComponent()

    await waitFor(() => {
      const button = getByRole('button', { name: 'Download' })
      expect(button).toHaveAttribute('type', 'submit')

      userEvent.click(getByLabelText('JSON'))

      expect(getByLabelText('CSV')).not.toBeChecked()
      expect(getByLabelText('JSON')).toBeChecked()

      userEvent.click(button)

      expect(downloadFile).toHaveBeenCalledWith('ukhsa-chart-download.json', new Blob(['mock-download']))
    })
  })

  test('handles download error and redirects to error page', async () => {
    jest.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))
    mockReplace.mockClear()

    mockRouter.push('/topics/mock-topic')

    const { getByRole } = renderComponent()

    // Wait for component to render, then click button
    const button = await waitFor(() => {
      return getByRole('button', { name: 'Download' })
    })

    await userEvent.click(button)

    await waitFor(
      () => {
        expect(mockReplace).toHaveBeenCalledWith('/error')
      },
      { timeout: 3000 }
    )
  })
})
